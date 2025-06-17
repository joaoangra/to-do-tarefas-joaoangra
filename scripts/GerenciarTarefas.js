const afazerCol = document.getElementById("afazer");
const fazendoCol = document.getElementById("fazendo");
const prontoCol = document.getElementById("pronto");

window.onload = listarTarefas;

function listarTarefas() {
    afazerCol.innerHTML = "";
    fazendoCol.innerHTML = "";
    prontoCol.innerHTML = "";

    const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");

    tarefas.forEach(tarefa => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p><b>Descrição:</b> ${tarefa.descricao}<br>
            <b>Setor:</b> ${tarefa.setor}<br>
            <b>Prioridade:</b> ${tarefa.prioridade}<br>
            <b>Vinculado a:</b> ${tarefa.usuario}</p>
            <div class="actions">
                <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            </div>
            <div class="status">
                <input type="radio" name="status${tarefa.id}" value="A fazer" ${tarefa.status === "A fazer" ? "checked" : ""}> A fazer
                <input type="radio" name="status${tarefa.id}" value="Fazendo" ${tarefa.status === "Fazendo" ? "checked" : ""}> Fazendo
                <input type="radio" name="status${tarefa.id}" value="Pronto" ${tarefa.status === "Pronto" ? "checked" : ""}> Pronto
            </div>
            <button onclick="alterarStatus(${tarefa.id})" class="alterar">Alterar Status</button>
        `;

        if (tarefa.status === "A fazer") {
            afazerCol.appendChild(card);
        } else if (tarefa.status === "Fazendo") {
            fazendoCol.appendChild(card);
        } else if (tarefa.status === "Pronto") {
            prontoCol.appendChild(card);
        }
    });
}

window.alterarStatus = function(id) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    const radios = document.getElementsByName("status" + id);
    radios.forEach(radio => {
        if (radio.checked) tarefa.status = radio.value;
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    listarTarefas();
};

window.excluirTarefa = function(id) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
    tarefas = tarefas.filter(t => t.id !== id);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    listarTarefas();
};

window.editarTarefa = function(id) {
    alert("Função de edição pode ser implementada aqui.");
};