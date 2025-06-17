const form = document.querySelector("form");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    const usuario = {
        id: Date.now(),
        nome,
        email
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");

    form.reset();
});