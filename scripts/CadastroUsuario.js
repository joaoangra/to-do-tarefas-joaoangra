document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email })
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            document.querySelector("form").reset();
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao cadastrar usuário.");
        }
    } catch (error) {
        alert("Erro de conexão com o servidor.");
    }
});