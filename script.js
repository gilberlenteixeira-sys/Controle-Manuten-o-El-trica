let isAdmin = false;
let currentUser = "";

// Lista de equipamentos
let items = [
  { id: 1, name: "ABB EKIP T&P", quantity: 1, available: 1 },
  { id: 2, name: "Analisador de Energia Fluke 437-II", quantity: 1, available: 1 },
  { id: 3, name: "Calibrador RTD Fluke 712B", quantity: 1, available: 1 },
  { id: 4, name: "Câmera Termográfica Flir", quantity: 1, available: 1 },
  { id: 5, name: "Certificador de Cabos Fluke", quantity: 1, available: 1 },
  { id: 6, name: "Conprove CE-7012", quantity: 1, available: 1 },
  { id: 7, name: "Detector de Alta Tensão 1Kv-800Kv", quantity: 4, available: 4 },
  { id: 8, name: "Detector de Cabos Amprobe AT-8000", quantity: 2, available: 2 },
  { id: 9, name: "Detector de Fase Fluke", quantity: 1, available: 1 },
  { id: 10, name: "Detector Tensão de Contato 70Va-1Kv", quantity: 2, available: 2 },
  { id: 11, name: "Luximetro Fluke 941", quantity: 1, available: 1 },
  { id: 12, name: "Mala de Ensaios Omicron", quantity: 1, available: 1 },
  { id: 13, name: "Megger Fluke 5Kv", quantity: 2, available: 2 },
  { id: 14, name: "Megger Fluke 10Kv", quantity: 1, available: 1 },
  { id: 15, name: "Microhmimetro Instrutemp Microhm 200", quantity: 1, available: 1 },
  { id: 16, name: "Miliohmimetro Kocos Promet L100", quantity: 2, available: 2 },
  { id: 17, name: "Osciloscopio Fluke 190-502 scopmetter", quantity: 1, available: 1 },
  { id: 18, name: "Tacometro Monarch PLT200", quantity: 1, available: 1 },
  { id: 19, name: "Terrometro Fluke 1625", quantity: 1, available: 1 },
  { id: 20, name: "Alta Temperatura infravermelho Fluke 572", quantity: 1, available: 1 },
  { id: 21, name: "Analizador de Bateria BT 521 Fluke", quantity: 1, available: 1 },
  { id: 22, name: "Detector de Tensão de Contato 3,8Kv-36Kv", quantity: 2, available: 2 },
  { id: 23, name: "Digital Ratiometer for Transformers DTR 8510 Fluke", quantity: 1, available: 1 },
  { id: 24, name: "Interruptor a Vácuo Viddar Megger", quantity: 1, available: 1 },
  { id: 25, name: "Medidor de irradiância Solar Fluke IRR2-BT", quantity: 1, available: 1 },
  { id: 26, name: "Miliamperimetro", quantity: 2, available: 2 },
  { id: 27, name: "Osciloscopio Fluke 125B", quantity: 1, available: 1 },
  { id: 28, name: "Trena a Laser Fluke", quantity: 1, available: 1 },
  { id: 29, name: "Detector de Tensão de Contato 180Kv-540Kv", quantity: 2, available: 2 },
  { id: 30, name: "Termômetro Infravermelho Fluke 62 MAX IR", quantity: 2, available: 2 },
  { id: 31, name: "Detector de Tensão de Contato 1Kv-800KV", quantity: 2, available: 2 }
];

// Histórico
let history = [];

// Função de login
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (username === "") {
    alert("Digite seu nome!");
    return;
  }

  // Admin fixo
  if (username === "Gilberlen" && password === "Klig") {
    isAdmin = true;
    currentUser = username;
  } else if (password === "") {
    isAdmin = false;
    currentUser = username;
  } else {
    alert("Nome ou senha incorretos!");
    return;
  }

  document.getElementById("loginSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
  document.getElementById("userInfo").innerText = isAdmin
    ? `Bem-vindo Admin ${currentUser}`
    : `Bem-vindo ${currentUser}`;

  renderTable();
}

// Função logout
function logout() {
  isAdmin = false;
  currentUser = "";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("mainSection").style.display = "none";
}

// Renderizar tabela
function renderTable() {
  const tbody = document.getElementById("itemsBody");
  tbody.innerHTML = "";
  items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.available}/${item.quantity}</td>
      <td>
        <button onclick="borrowItem(${item.id})">Retirar</button>
        <button onclick="returnItem(${item.id})">Devolver</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Retirar item
function borrowItem(id) {
  const item = items.find(i => i.id === id);
  if (item.available > 0) {
    item.available--;
    const now = new Date();
    const deadline = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 dias
    history.push(`${currentUser} retirou ${item.name} em ${now.toLocaleString()} (devolver até ${deadline.toLocaleString()})`);
    sendWhatsApp(`🔔 ${currentUser} retirou ${item.name} em ${now.toLocaleString()}`);
    renderTable();
    renderHistory();
  } else {
    alert("Não há mais unidades disponíveis.");
  }
}

// Devolver item
function returnItem(id) {
  const item = items.find(i => i.id === id);
  if (item.available < item.quantity) {
    item.available++;
    const now = new Date();
    history.push(`${currentUser} devolveu ${item.name} em ${now.toLocaleString()}`);
    sendWhatsApp(`✅ ${currentUser} devolveu ${item.name} em ${now.toLocaleString()}`);
    renderTable();
    renderHistory();
  } else {
    alert("Você não possui este item para devolver.");
  }
}

// Renderizar histórico
function renderHistory() {
  const ul = document.getElementById("historyList");
  ul.innerHTML = "";
  history.slice().reverse().forEach(event => {
    const li = document.createElement("li");
    li.textContent = event;
    ul.appendChild(li);
  });
}

// Enviar mensagem via WhatsApp
function sendWhatsApp(message) {
  const phone = "5585985691148";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
