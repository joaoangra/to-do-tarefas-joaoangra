const form = document.querySelector("form");
const descricaoInput = document.getElementById("descricao");
const setorInput = document.getElementById("setor");
const usuarioSelect = document.getElementById("usuario");
const prioridadeSelect = document.getElementById("prioridade");

async function loadUsuarios() {
    try {
        const response = await fetch("http://localhost:5000/usuarios");
        if (response.ok) {
            const usuarios = await response.json();
            usuarioSelect.innerHTML = "";
            usuarios.forEach(usuario => {
                const option = document.createElement("option");
                option.value = usuario.nome;
                option.textContent = usuario.nome;
                usuarioSelect.appendChild(option);
            });
        } else {
            console.error("Erro ao carregar usuários");
        }
    } catch (error) {
        console.error("Erro de conexão ao carregar usuários", error);
    }
}

loadUsuarios();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = descricaoInput.value.trim();
    const setor = setorInput.value.trim();
    const usuario = usuarioSelect.value;
    const prioridade = prioridadeSelect.value;

    if (!descricao || !setor || !usuario || !prioridade) {
        alert("Preencha todos os campos!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        descricao,
        setor,
        usuario,
        prioridade,
        status: "A fazer"
    };

    const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    alert("Tarefa cadastrada com sucesso!");
    form.reset();
});
