const adminNumber = "5585985691148";

const equipments = [
  { id:1, name:"ABB EKIP T&P", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:2, name:"Analisador de Energia Fluke 437-II", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:3, name:"Calibrador RTD Fluke 712B", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:4, name:"Câmera Termográfica Flir", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:5, name:"Certificador de Cabos Fluke", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:6, name:"Conprove CE-7012", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:7, name:"Detector de Alta Tensão 1Kv-800Kv", quantity:4, available:4, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:8, name:"Detector de Cabos Amprobe AT-8000", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:9, name:"Detector de Fase Fluke", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:10, name:"Detector Tensão de Contato 70Va-1Kv", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:11, name:"Luximetro Fluke 941", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:12, name:"Mala de Ensaios Omicron", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:13, name:"Megger Fluke 5Kv", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:14, name:"Megger Fluke 10Kv", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:15, name:"Microhmimetro Instrutemp Microhm 200", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:16, name:"Miliohmimetro Kocos Promet L100", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:17, name:"Osciloscopio Fluke 190-502 scopmetter", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:18, name:"Tacometro Monarch PLT200", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:19, name:"Terrometro Fluke 1625", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:20, name:"Alta Temperatura infravermelho Fluke 572", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:21, name:"Analizador de Bateria BT 521 Fluke", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:22, name:"Detector de Tensão de Contato 3,8Kv-36Kv", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:23, name:"Digital Ratiometer for Transformers DTR 8510 Fluke", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:24, name:"Interruptor a Vácuo Viddar Megger", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:25, name:"Medidor de irradiância Solar Fluke IRR2-BT", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:26, name:"Miliamperimetro", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:27, name:"Osciloscopio Fluke 125B", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:28, name:"Trena a Laser Fluke", quantity:1, available:1, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:29, name:"Detector de Tensão de Contato 180Kv-540Kv", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:30, name:"Termômetro Infravermelho Fluke 62 MAX IR", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" },
  { id:31, name:"Detector de Tensão de Contato 1Kv-800KV", quantity:2, available:2, status:"available", responsible:"", borrowDate:"", deadline:"" }
];

let currentUser = "";
let isAdmin = false;

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("adminPassword").value.trim();
  if(username === "") { alert("Digite seu nome!"); return; }

  if(password === "admin123") { 
    isAdmin = true;
    currentUser = username;
  } else {
    isAdmin = false;
    currentUser = username;
  }

  document.getElementById("loginSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
  document.getElementById("userInfo").innerText = isAdmin ? `Bem-vindo Admin ${currentUser}` : `Bem-vindo ${currentUser}`;

  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("equipmentTable");
  tbody.innerHTML = "";
  const filter = document.getElementById("searchInput").value.toLowerCase();

  equipments.forEach(eq => {
    if(!eq.name.toLowerCase().includes(filter)) return;

    const tr = document.createElement("tr");

    const now = new Date();
    let statusText = eq.available > 0 ? "Disponível" : "Indisponível";
    let statusClass = eq.available > 0 ? "available" : "unavailable";

    if(eq.borrowDate !== "" && eq.deadline !== "") {
      const deadlineDate = new Date(eq.deadline);
      if(now > deadlineDate) { 
        statusText += " (atrasado)";
        statusClass = "warning";
      }
    }

    tr.innerHTML = `
      <td>${eq.name}</td>
      <td>${eq.quantity}</td>
      <td>${eq.available}</td>
      <td class="${statusClass}">${statusText}</td>
      <td>
        ${eq.available > 0 ? `<button class="available" onclick="borrow(${eq.id})">Retirar</button>` : ""}
        ${eq.responsible === currentUser ? `<button class="unavailable" onclick="returnEquip(${eq.id})">Devolver</button>` : ""}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function borrow(id) {
  const eq = equipments.find(e => e.id === id);
  if(eq.available <= 0) { alert("Não disponível!"); return; }

  eq.available -= 1;
  eq.responsible = currentUser;
  const now = new Date();
  eq.borrowDate = now.toISOString();
  const deadline = new Date();
  deadline.setDate(now.getDate() + 2);
  eq.deadline = deadline.toISOString();

  sendWhatsApp(eq, "Retirado");
  renderTable();
}

function returnEquip(id) {
  const eq = equipments.find(e => e.id === id);
  if(eq.responsible !== currentUser) { alert("Somente quem retirou pode devolver!"); return; }

  eq.available += 1;
  eq.responsible = "";
  eq.borrowDate = "";
  eq.deadline = "";

  sendWhatsApp(eq, "Devolvido");
  renderTable();
}

function sendWhatsApp(eq, action) {
  const message = `Equipamento: ${eq.name}\nAção: ${action}\nUsuário: ${currentUser}\nData/Hora: ${new Date().toLocaleString()}`;
  const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
