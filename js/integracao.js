// ========================= CONFIGURAÇÃO =========================
// Define a URL base da tua API Flask
const API_URL = "http://localhost:5000"; // Ajuste conforme o IP/porta da tua API

// ========================= LOGIN =========================
// Página: login.html
async function login(event) {
  event.preventDefault();
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('senha').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: user, senha: pass })
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Login bem-sucedido!");
      localStorage.setItem("usuario", user);
      window.location.href = "index.html";
    } else {
      alert(data.mensagem || "❌ Usuário ou senha incorretos!");
    }
  } catch (error) {
    console.error("Erro ao tentar logar:", error);
    alert("⚠️ Erro de conexão com o servidor.");
  }
}

// ========================= LOGOUT =========================
// Pode ser chamado por um botão em qualquer página
function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

// ========================= VERIFICAR LOGIN =========================
// Para proteger páginas que exigem login (index, equipamentos, etc.)
function verificarLogin() {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) {
    alert("⚠️ Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
  }
}

// ========================= RELATAR PROBLEMA =========================
// Página: relatar.html
async function enviarRelato(event) {
  event.preventDefault();

  const equipamento = document.querySelector("input[type='text']").value;
  const descricao = document.querySelector("textarea").value;

  try {
    const response = await fetch(`${API_URL}/insobj`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identificacao: equipamento,
        descricao: descricao
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Relato enviado com sucesso!");
      document.querySelector("form").reset();
    } else {
      alert(data.mensagem || "❌ Erro ao enviar relato.");
    }
  } catch (error) {
    console.error("Erro ao enviar relato:", error);
    alert("⚠️ Erro de conexão com o servidor.");
  }
}

// ========================= LISTAR PATRIMÔNIOS =========================
// Página: equipamentos.html
async function carregarPatrimonios() {
  try {
    const response = await fetch(`${API_URL}/patrimonio`);
    const data = await response.json();

    if (response.ok) {
      const container = document.getElementById("lista-patrimonios");
      if (!container) return;

      container.innerHTML = "";
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("equipamento-card");
        card.innerHTML = `
          <h3>${item.nome}</h3>
          <p><strong>Tombo:</strong> ${item.tombo}</p>
          <p><strong>Setor:</strong> ${item.setor}</p>
          <p><strong>Status:</strong> ${item.status}</p>
        `;
        container.appendChild(card);
      });
    } else {
      alert("❌ Erro ao carregar patrimônios.");
    }
  } catch (error) {
    console.error("Erro ao buscar patrimônios:", error);
  }
}

// ========================= FILTRAR POR TOMBO =========================
// Página: index.html (ou qualquer uma que tenha busca)
async function filtrarPorTombo() {
  const tombo = document.getElementById("input-tombo").value;
  if (!tombo) {
    alert("⚠️ Informe um número de tombo!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/filtpatrimonio/${tombo}`);
    const data = await response.json();

    const container = document.getElementById("resultado-filtro");
    if (!container) return;
    container.innerHTML = "";

    if (response.ok && data.length > 0) {
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("equipamento-card");
        card.innerHTML = `
          <h3>${item.nome}</h3>
          <p><strong>Tombo:</strong> ${item.tombo}</p>
          <p><strong>Setor:</strong> ${item.setor}</p>
          <p><strong>Status:</strong> ${item.status}</p>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>Nenhum equipamento encontrado.</p>";
    }
  } catch (error) {
    console.error("Erro ao buscar por tombo:", error);
  }
}

// ========================= CADASTRAR NOVO USUÁRIO =========================
// (Opcional) Caso a tua API Flask tenha rota /cadastro
async function cadastrarUsuario(usuario, senha) {
  try {
    const response = await fetch(`${API_URL}/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Usuário cadastrado com sucesso!");
    } else {
      alert(data.mensagem || "❌ Erro ao cadastrar usuário.");
    }
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
  }
}

// ===============================================================
// DICA: Se quiser rodar testes, abre o console (F12) no navegador
// e executa manualmente: login(), enviarRelato(), filtrarPorTombo()
// ===============================================================
