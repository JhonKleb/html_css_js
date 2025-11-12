const API_URL = "http://localhost:5000";

// Login
async function login(event) {
  event.preventDefault();
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('senha').value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: user, senha: pass })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("usuario", user);
      window.location.href = "index.html";
    } else {
      alert(data.mensagem || "Usuário ou senha incorretos.");
    }
  } catch (err) {
    alert("Erro de conexão com o servidor.");
    console.error(err);
  }
}

// Logout
function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

// Verifica login
function verificarLogin() {
  if (!localStorage.getItem("usuario")) {
    window.location.href = "login.html";
  }
}

// Enviar relato
async function enviarRelato(event) {
  event.preventDefault();
  const identificacao = document.querySelector("input[type='text']").value;
  const descricao = document.querySelector("textarea").value;

  try {
    const res = await fetch(`${API_URL}/insobj`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identificacao, descricao })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Relato enviado com sucesso!");
      document.querySelector("form").reset();
    } else {
      alert(data.mensagem || "Erro ao enviar relato.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
}

// Carregar patrimônios
async function carregarPatrimonios() {
  const container = document.getElementById("lista-patrimonios");
  if (!container) return;

  try {
    const res = await fetch(`${API_URL}/patrimonio`);
    const data = await res.json();

    if (res.ok) {
      container.innerHTML = data.map(item => `
        <div class="equipamento-card">
          <h3>${item.nome}</h3>
          <p><strong>Tombo:</strong> ${item.tombo}</p>
          <p><strong>Setor:</strong> ${item.setor}</p>
          <p><strong>Status:</strong> ${item.status}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = "<p>Erro ao carregar equipamentos.</p>";
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Erro ao conectar com a API.</p>";
  }
}

// Filtro por tombo
async function filtrarPorTombo() {
  const tombo = document.getElementById("input-tombo").value;
  if (!tombo) return alert("Informe o número do tombo.");

  const container = document.getElementById("resultado-filtro");

  try {
    const res = await fetch(`${API_URL}/filtpatrimonio/${tombo}`);
    const data = await res.json();

    if (res.ok && data.length > 0) {
      container.innerHTML = data.map(item => `
        <div class="equipamento-card">
          <h3>${item.nome}</h3>
          <p><strong>Tombo:</strong> ${item.tombo}</p>
          <p><strong>Setor:</strong> ${item.setor}</p>
          <p><strong>Status:</strong> ${item.status}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = "<p>Nenhum equipamento encontrado.</p>";
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Erro de conexão com a API.</p>";
  }
}
