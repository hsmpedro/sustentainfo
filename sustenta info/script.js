const campoBusca = document.querySelector('.input-busca');
const cards = document.querySelectorAll('.categoria-card');
const mensagemErroCategoria = document.querySelector('.mensagem-erro-categorias');

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarCategorias() {
    const termo = removerAcentos(campoBusca.value.toLowerCase());
    let encontrou = false;

    cards.forEach(card => {
        const nome = removerAcentos(card.querySelector('.categoria-nome').textContent.toLowerCase());

        if (nome.includes(termo)) {
            card.style.display = 'block';
            encontrou = true;
        } else {
            card.style.display = 'none';
        }
    });

    mensagemErroCategoria.style.display = encontrou ? 'none' : 'block';
}

campoBusca.addEventListener('input', filtrarCategorias);
