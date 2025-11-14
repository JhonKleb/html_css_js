// ===== CONFIGURAÇÃO =====
const API_URL = "http://localhost:5000";  // usa localhost como você pediu

// ===== LOGIN =====
async function login(event) {
    event.preventDefault();

    const matricula = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!matricula || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                matricula: Number(matricula),
                senha: senha
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login realizado com sucesso!");
            localStorage.setItem("matricula", matricula);
            window.location.href = "index.html";  // redireciona após login
        } else {
            alert(data.message || "Matrícula ou senha incorretos!");
        }

    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao conectar-se ao servidor.");
    }
}

// =========================
//  ENVIAR RELATO (classe InserirObjeto da API)
// =========================
async function enviarRelato(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll("form input, form textarea");

    const tombo = inputs[0].value.trim();
    const descricao = inputs[1].value.trim();

    // 🔐 matrícula do usuário logado (salva no login.js)
    const matricula = localStorage.getItem("matricula");

    if (!matricula) {
        alert("Erro: Nenhum usuário logado. Faça login novamente.");
        window.location.href = "login.html";
        return;
    }

    // 🔥 Corpo EXATO que a API Flask espera
    const denunciaData = {
        "Tombo": tombo,
        "Matrícula": parseInt(matricula),
        "Descrição": descricao,
        "Localização": "Não informada"
    };

    try {
        const response = await fetch("http://localhost:5000/insobj", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(denunciaData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Relato enviado com sucesso!");
            inputs[0].value = "";
            inputs[1].value = "";
        } else {
            alert("Erro ao enviar relato: " + (data.message || "Erro desconhecido"));
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com a API.");
    }
}
