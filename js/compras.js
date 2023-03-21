let inputNovoItem = document.querySelector('#inputNovoItem');
let btnAddItem = document.querySelector('#btnAddItem');
let listaItens = document.querySelector('#listaItens');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarItem = document.querySelector('#btnAtualizarItem');
let idItemEdicao = document.querySelector('#idItemEdicao');
let inputItemNomeEdicao = document.querySelector('#inputItemNomeEdicao');
const qtdIdsDisponiveis = Number.MAX_VALUE;
const KEY_CODE_ENTER = 13;
const KEY_LOCAL_STORAGE = 'listaDeItens';
let dbItens = [];


obterItensLocalStorage();
renderizarListaItemHtml();


inputNovoItem.addEventListener('keypress', (e) => {


    if(e.keyCode == KEY_CODE_ENTER) {
        let item = {
            nome: inputNovoItem.value,
            id: gerarIdV2(),
        }
        adicionarItem(item);
    }
});


janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});


btnAddItem.addEventListener('click', (e) => {


    let item = {
        nome: inputNovoItem.value,
        id: gerarIdV2(),
    }
    adicionarItem(item);
});


btnAtualizarItem.addEventListener('click', (e) => {
    e.preventDefault();


    let idItem = idItemEdicao.innerHTML.replace('#', '');


    let item = {
        nome: inputItemNomeEdicao.value,
        id: idItem
    }


    let itemAtual = document.getElementById(''+idItem+'');


    if(itemAtual) {


        const indiceItem = obterIndiceItemPorId(idItem);
        dbItens[indiceItem] = item;
        salvarItensLocalStorage();


        let li = criarTagLI(item);
        listaItens.replaceChild(li, itemAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    } 
});


function gerarId() {
    return Math.floor(Math.random() * qtdIdsDisponiveis);
}


function gerarIdV2() {
    return gerarIdUnico();
}


function gerarIdUnico() {


    // debugger;
    let itensDaLista = document.querySelector('#listaItens').children;
    let idsGerados = [];


    for(let i=0;i<itensDaLista.length;i++) {
        idsGerados.push(itensDaLista[i].id);
    }


    let contadorIds = 0;
    let id = gerarId();


    while(contadorIds <= qtdIdsDisponiveis && 
        idsGerados.indexOf(id.toString()) > -1) {
            id = gerarId();
            contadorIds++;


            if(contadorIds >= qtdIdsDisponiveis) {
                alert("Oops, ficamos sem IDS :/");
                throw new Error("Acabou os IDs :/");
            }
        }


    return id;
}


function adicionarItem(item) {
    dbItens.push(item);
    salvarItensLocalStorage(dbItens);
    renderizarListaItemHtml();
}


function criarTagLI(item) {


    let li = document.createElement('li');
    li.id = item.id;


    let span = document.createElement('span');
    span.classList.add('textoItem');
    span.innerHTML = item.nome;


    let div  = document.createElement('div');


    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+item.id+')');
    
    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+item.id+')');


    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);


    li.appendChild(span);
    li.appendChild(div);
    return li;
}


function editar(idItem) {
    let li = document.getElementById(''+ idItem + '');
    if(li) {
        idItemEdicao.innerHTML = '#' + idItem;
        inputItemNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}


function excluir(idItem) {


    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {


        const indiceItem = obterIndiceItemPorId(idItem);
        dbItem.splice(indiceItem, 1);
        salvarItensLocalStorage();


        let li = document.getElementById(''+ idItem + '');
        if(li) {
            listaItens.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}


function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}


function obterIndiceItemPorId(idItem) {
    const indiceItem = dbItens.findIndex(t => t.id == idItem);
    if(indiceItem < 0) {
        throw new Error('Id do item não encontrado: ', idItem);
    }
    return indiceItem;
}


function renderizarListaItemHtml() {
    listaItens.innerHTML = '';
    for(let i=0; i < dbItens.length; i++) {
        let li = criarTagLI(dbItens[i]);
        listaItens.appendChild(li); 
    } 
    inputNovoItem.value = '';  
}


function salvarItensLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbItens));
}


function obterItensLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbItens = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }  
}


function editar(idItem) {
    let li = document.getElementById(''+ idItem + '');
    if(li) {
        idItemEdicao.innerHTML = '#' + idItem;
        inputItemNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}


function excluir(idItem) {


    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {


        const indiceItem = obterIndiceItemPorId(idItem);
        dbItens.splice(indiceItem, 1);
        salvarItensLocalStorage();


        let li = document.getElementById(''+ idItem + '');
        if(li) {
            listaItens.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}


function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}


function obterIndiceItemPorId(idItem) {
    const indiceItem = dbItens.findIndex(t => t.id == idItem);
    if(indiceItem < 0) {
        throw new Error('Id da tarefa não encontrado: ', idItem);
    }
    return indiceItem;
}


function renderizarListaItemHtml() {
    listaItens.innerHTML = '';
    for(let i=0; i < dbItens.length; i++) {
        let li = criarTagLI(dbItens[i]);
        listaItens.appendChild(li); 
    } 
    inputNovoItem.value = '';  
}


function salvarItensLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbItens));
}


function obterItensLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbItens = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }  
}