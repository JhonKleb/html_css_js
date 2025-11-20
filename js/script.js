const API_URL = "http://localhost:5000";  // usa localhost como você pediu

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
            localStorage.setItem("usuarioLogado", JSON.stringify(data));

            alert("Login realizado com sucesso!");

            // Redireciona para a página inicial
            window.location.href = "index.html";

        } else {
            alert(data.message || "Matrícula ou senha incorretos!");
        }

    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao conectar-se ao servidor.");

    if (response.ok) {
    localStorage.setItem("usuarioLogado", JSON.stringify(data));
    localStorage.setItem("matriculaLogada", data.matricula);

    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
}

    }
}


async function enviarRelato(event) {
    event.preventDefault();

    const tombo = document.getElementById("tombo").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const localizacao = document.getElementById("localizacao").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!tombo || !matricula || !localizacao || !descricao) {
        alert("Erro: Todos os campos são obrigatórios!");
        return;
    }

    const denunciaData = {
        "Tombo": tombo,
        "Matrícula": matricula,
        "Descrição": descricao,
        "Localização": localizacao
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
            document.getElementById("tombo").value = "";
            document.getElementById("matricula").value = "";
            document.getElementById("localizacao").value = "";
            document.getElementById("descricao").value = "";
        } else {
            alert("Erro ao enviar relato: " + (data.message || "Erro desconhecido"));
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com a API.");
    }
}