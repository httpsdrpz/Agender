document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agendamento-form");
    const listaAgendamentos = document.getElementById("lista-agendamentos");
    const modoToggle = document.getElementById("modo-toggle");
    
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    renderizarAgendamentos();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;

        if (!nome || !data || !horario) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoAgendamento = { nome, data, horario };
        agendamentos.push(novoAgendamento);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

        form.reset();
        renderizarAgendamentos();
    });

    function renderizarAgendamentos() {
        listaAgendamentos.innerHTML = "";
        agendamentos.forEach((ag, index) => {
            const item = document.createElement("li");
            item.innerHTML = `${ag.nome} - ${ag.data} às ${ag.horario} 
                <button onclick="removerAgendamento(${index})">Remover</button>`;
            listaAgendamentos.appendChild(item);
        });
    }

    window.removerAgendamento = (index) => {
        agendamentos.splice(index, 1);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        renderizarAgendamentos();
    };

    modoToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});