const campoBusca = document.querySelector('.input-busca');
const cards = document.querySelectorAll('.categoria-card');
const mensagemErroCategoria = document.querySelector('.mensagem-erro-categorias');

//funcao para conseguir pesquisar as categorias sem precisar colocar os acentos
function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//funcao para filtrar as categorias
function filtrarCategorias() {
    const termo = removerAcentos(campoBusca.value.toLowerCase()); //toLowerCase transforma as letras maisuculas em minusculas
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
    //se não aparecer nenhuma categoria, exibe a mensagem de "Nenhguma categoria encontrada" (block)
    //se aparecer pelo menos uma categoria, não exibe nenhuma mensagem (none)
    mensagemErroCategoria.style.display = encontrou ? 'none' : 'block';
}
//faz com que as categorias atualizem a cada "input" que o usuário da (a cada letra que ele digita)
campoBusca.addEventListener('input', filtrarCategorias);

//janela com informacões de cada categoria
function abrirInformacoes(card) {
    const janela = document.getElementById('janela');
    const janelaContent = janela.querySelector('.janela-content');

    // limpa o conteúdo antigo antes de criar os novos blocos
    janelaContent.innerHTML = `
        <span id="fechar" class="fechar">&times;</span>
    `;

    // pega todos os nomes, endereços e links do card
    const nomes = card.querySelectorAll('.info-nome');
    const enderecos = card.querySelectorAll('.info-endereco');
    const links = card.querySelectorAll('.info-maps');

    // Cria um bloco para cada endereço
    for (let i = 0; i < nomes.length; i++) {
        const bloco = document.createElement('div');
        bloco.classList.add('janela-endereco-bloco');

        bloco.innerHTML = `
            <h4>${nomes[i].textContent}</h4>
            <p>${enderecos[i].textContent}</p>
            <a href="${links[i].href}" target="_blank">Ver no Google Maps</a>
        `;
        janelaContent.appendChild(bloco);
    }

    // Recria o botão de fechar
    const botaoFechar = janelaContent.querySelector('.fechar');
    botaoFechar.addEventListener('click', () => {
        janela.style.display = 'none';
    });

    janela.style.display = 'flex';
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        abrirInformacoes(card);
    });
});