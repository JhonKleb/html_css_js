// js/integracao.js
const API_URL = "http://localhost:5000"; // usa localhost como tu mencionou

// --- LOGIN ---
async function login(event) {
  event.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("token", dados.token);
      localStorage.setItem("usuario", usuario);
      window.location.href = "index.html";
    } else {
      alert(dados.mensagem || "Usuário ou senha incorretos!");
    }
  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao conectar ao servidor.");
  }
}

// --- LOGOUT ---
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

// --- VERIFICA LOGIN ---
function verificarLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// --- LISTAR PATRIMÔNIOS ---
async function carregarPatrimonios() {
  try {
    const resposta = await fetch(`${API_URL}/patrimonio`);
    const dados = await resposta.json();

    const container = document.getElementById("lista-patrimonios");
    container.innerHTML = "";

    dados.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("equipamento-item");
      div.innerHTML = `
        <p><strong>${item.nome}</strong></p>
        <p>Tombo: ${item.tombo}</p>
        <p>Status: ${item.status}</p>
      `;
      container.appendChild(div);
    });
  } catch (erro) {
    console.error("Erro ao carregar patrimônios:", erro);
  }
}

// --- FILTRAR POR TOMBO ---
async function filtrarPorTombo() {
  const tombo = document.getElementById("input-tombo").value;
  if (!tombo) return alert("Digite um número de tombo.");

  try {
    const resposta = await fetch(`${API_URL}/filtpatrimonio/${tombo}`);
    const dados = await resposta.json();

    const container = document.getElementById("resultado-filtro");
    if (resposta.ok && dados.length > 0) {
      container.innerHTML = `
        <p><strong>${dados[0].nome}</strong></p>
        <p>Tombo: ${dados[0].tombo}</p>
        <p>Status: ${dados[0].status}</p>
      `;
    } else {
      container.innerHTML = "<p>Nenhum equipamento encontrado.</p>";
    }
  } catch (erro) {
    console.error("Erro ao buscar tombo:", erro);
  }
}
