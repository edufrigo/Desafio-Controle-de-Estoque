var lojasCadastradas = [];
var fornecedoresCadastrados = [];

function cadastrarLoja() {
    var nomeLoja = document.getElementById('nomeLoja').value;
    lojasCadastradas.push(nomeLoja);
    atualizarLista('resultadoLoja', lojasCadastradas);
    document.getElementById('nomeLoja').value = '';
}

function cadastrarFornecedor() {
    var nomeFornecedor = document.getElementById('nomeFornecedor').value;
    fornecedoresCadastrados.push(nomeFornecedor);
    atualizarLista('resultadoFornecedor', fornecedoresCadastrados);
    document.getElementById('nomeFornecedor').value = '';
}

function removerItem(elementId, index) {

    var lista = (elementId === 'resultadoLoja') ? lojasCadastradas : fornecedoresCadastrados;


    lista.splice(index, 1);


    atualizarLista(elementId, lista);
}

function atualizarLista(elementId, lista) {
    var resultadoDiv = document.getElementById(elementId);
    resultadoDiv.innerHTML = '';

    if (lista.length > 0) {
        var listaHTML = '<ul>';
        lista.forEach(function (item, index) {
            listaHTML += '<li>' + item + ' <button onclick="removerItem(\'' + elementId + '\', ' + index + ')">Remover</button></li>';
        });
        listaHTML += '</ul>';
        resultadoDiv.innerHTML = listaHTML;
    }
}


var estoque = [
    { produto: "Produto A", quantidade: 50, entradas: 0, saidas: 0 },
    { produto: "Produto B", quantidade: 30, entradas: 0, saidas: 0 },
    { produto: "Produto C", quantidade: 20, entradas: 0, saidas: 0 }
];


function exibirEstoque() {
    var tableBody = document.getElementById("estoqueTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    for (var i = 0; i < estoque.length; i++) {
        var row = tableBody.insertRow(i);

        var cellProduto = row.insertCell(0);
        var cellQuantidade = row.insertCell(1);
        var cellEntradas = row.insertCell(2);
        var cellSaidas = row.insertCell(3);
        var cellSaldo = row.insertCell(4);
        var cellAcoes = row.insertCell(5);

        cellProduto.innerHTML = estoque[i].produto;
        cellQuantidade.innerHTML = estoque[i].quantidade;
        cellEntradas.innerHTML = estoque[i].entradas;
        cellSaidas.innerHTML = estoque[i].saidas;
        cellSaldo.innerHTML = calcularSaldoPorProduto(estoque[i]);
        cellAcoes.innerHTML = '<button onclick="adicionarEntrada(' + i + ')">Adicionar Entrada</button> ' +
            '<button onclick="adicionarSaida(' + i + ')">Adicionar Saída</button>';
    }

    calcularSaldoTotal();
}


function calcularSaldoPorProduto(produto) {
    return (produto.quantidade + produto.entradas - produto.saidas);
}


function calcularSaldoTotal() {
    var saldoTotal = 0;
    for (var i = 0; i < estoque.length; i++) {
        saldoTotal += calcularSaldoPorProduto(estoque[i]);
    }
    document.getElementById("total").innerText = saldoTotal;
}


function adicionarEntrada(index) {
    var quantidadeEntrada = parseInt(prompt("Quantidade de Entrada para " + estoque[index].produto + ":"));
    if (!isNaN(quantidadeEntrada) && quantidadeEntrada > 0) {
        estoque[index].quantidade += quantidadeEntrada;
        estoque[index].entradas += quantidadeEntrada;
        exibirEstoque();
    } else {
        alert("Por favor, insira uma quantidade válida maior que zero.");
    }
}


function adicionarSaida(index) {
    var quantidadeSaida = parseInt(prompt("Quantidade de Saída para " + estoque[index].produto + ":"));
    if (!isNaN(quantidadeSaida) && quantidadeSaida > 0 && quantidadeSaida <= estoque[index].quantidade) {
        estoque[index].quantidade -= quantidadeSaida;
        estoque[index].saidas += quantidadeSaida;
        exibirEstoque();
    } else {
        alert("Por favor, insira uma quantidade válida maior que zero e menor ou igual à quantidade atual em estoque.");
    }
}


window.onload = exibirEstoque;
