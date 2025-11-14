// ======= CONFIGURAÇÕES GERAIS =======
const API_URL = "http://127.0.0.1:5000";

// ======= FUNÇÕES DE AUTENTICAÇÃO =======

// Login
async function login(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("usuario", usuario);
            alert("Login realizado com sucesso!");
            window.location.href = "index.html";
        } else {
            alert(data.mensagem || "Usuário ou senha incorretos!");
        }
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao tentar se conectar ao servidor.");
    }
}

// Cadastro
async function cadastrar(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch(`${API_URL}/cadastro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        } else {
            alert(data.mensagem || "Erro ao cadastrar usuário.");
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
    }
}

// Verificar login
function verificarLogin() {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    }
}

// Logout
function logout() {
    localStorage.removeItem("usuario");
    alert("Você saiu da sua conta.");
    window.location.href = "login.html";
}

// ======= FUNÇÕES DE PATRIMÔNIO =======

// Carregar todos os patrimônios (equipamentos.html)
async function carregarPatrimonios() {
    try {
        const response = await fetch(`${API_URL}/patrimonio`);
        const data = await response.json();

        const lista = document.getElementById("lista-patrimonios");
        lista.innerHTML = "";

        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "patrimonio-item";
            div.innerHTML = `
                <h3>${item.nome}</h3>
                <p><strong>Tombo:</strong> ${item.tombo}</p>
                <p><strong>Setor:</strong> ${item.setor}</p>
                <p><strong>Descrição:</strong> ${item.descricao}</p>
            `;
            lista.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao carregar patrimônios:", error);
    }
}

// Filtrar patrimônio por tombo (index.html)
async function filtrarPorTombo() {
    const tombo = document.getElementById("input-tombo").value.trim();
    const divResultado = document.getElementById("resultado-filtro");
    divResultado.innerHTML = "";

    if (!tombo) {
        alert("Digite um número de tombo.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/filtpatrimonio/${tombo}`);
        const data = await response.json();

        if (response.ok) {
            divResultado.innerHTML = `
                <h3>${data.nome}</h3>
                <p><strong>Tombo:</strong> ${data.tombo}</p>
                <p><strong>Setor:</strong> ${data.setor}</p>
                <p><strong>Descrição:</strong> ${data.descricao}</p>
            `;
        } else {
            divResultado.innerHTML = `<p>${data.mensagem || "Patrimônio não encontrado."}</p>`;
        }
    } catch (error) {
        console.error("Erro ao buscar patrimônio:", error);
    }
}

// ======= FUNÇÃO DE RELATO DE PROBLEMA =======

// Enviar relato (relatar.html)
async function enviarRelato(event) {
    event.preventDefault();

    const tombo = document.getElementById("tombo").value;
    const problema = document.getElementById("problema").value;

    if (!tombo || !problema) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/insobj`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tombo, problema }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Relato enviado com sucesso!");
            document.getElementById("tombo").value = "";
            document.getElementById("problema").value = "";
        } else {
            alert(data.mensagem || "Erro ao enviar relato.");
        }
    } catch (error) {
        console.error("Erro ao enviar relato:", error);
    }
}