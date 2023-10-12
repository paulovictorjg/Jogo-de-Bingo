"use strict";
// Variáveis para armazenar os números do bingo
const colunaNumeros = [[], [], [], [], []];
const numerosPorColuna = 15;
const numerosSorteados = [];
for (let i = 0; i < colunaNumeros.length; i++) {
    for (let j = 0; j < numerosPorColuna; j++) {
        colunaNumeros[i].push(j + i * numerosPorColuna + 1);
    }
}
// Função para embaralhar um array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
colunaNumeros.forEach(shuffle);
const celulasNumeros = document.querySelectorAll('#tabelaBingo tr:not(:first-child) td');
for (let i = 0; i < celulasNumeros.length; i++) {
    if (i === Math.floor(celulasNumeros.length / 2)) {
        continue;
    }
    const coluna = i % 5;
    const numero = colunaNumeros[coluna].pop();
    celulasNumeros[i].textContent = numero !== undefined ? numero.toString() : '';
}
// Adicionar evento de clique a cada célula da tabela de bingo
for (let i = 0; i < celulasNumeros.length; i++) {
    celulasNumeros[i].addEventListener('click', function () {
        if (numerosSorteados.includes(parseInt(this.textContent))) {
            this.classList.add('marcado');
        }
        else {
            alert('Este número ainda não foi sorteado.');
        }
    });
}
// Função para sortear um número
function sortearNumero() {
    let numeroSorteado;
    do {
        numeroSorteado = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numeroSorteado));
    numerosSorteados.push(numeroSorteado);
    if (numerosSorteados.length === 75) {
        alert('Todos os números foram sorteados!');
    }
    return numeroSorteado;
}
// Função para verificar se o número sorteado está na tabela de bingo
function verificarNumeroTabela(numero) {
    for (let i = 0; i < celulasNumeros.length; i++) {
        if (celulasNumeros[i].textContent === numero.toString()) {
            return true;
        }
    }
    return false;
}
// Função para o botão "Sortear"
function sortear() {
    const numero = sortearNumero();
    document.querySelector('.n-1').textContent = ` ${numero}`;
    if (verificarNumeroTabela(numero)) {
        console.log(`O número ${numero} está na tabela de bingo!`);
        for (let i = 0; i < celulasNumeros.length; i++) {
            if (celulasNumeros[i].textContent === numero.toString()) {
                celulasNumeros[i].classList.add('marcado');
            }
        }
        return true;
    }
    else {
        console.log(`O número ${numero} não está na tabela de bingo.`);
        return false;
    }
}
const botaoSortear = document.querySelector('#botaoSortear');
botaoSortear.addEventListener('click', sortear);
// Função para o botão "Nova Cartela"
function novaCartela() {
    for (let i = 0; i < colunaNumeros.length; i++) {
        colunaNumeros[i] = [];
        for (let j = 0; j < numerosPorColuna; j++) {
            colunaNumeros[i].push(j + i * numerosPorColuna + 1);
        }
    }
    colunaNumeros.forEach(shuffle);
    for (let i = 0; i < celulasNumeros.length; i++) {
        if (i === Math.floor(celulasNumeros.length / 2)) {
            continue;
        }
        const coluna = i % 5;
        const numero = colunaNumeros[coluna].pop();
        if (numero !== undefined) {
            celulasNumeros[i].textContent = numero.toString();
        }
        else {
            celulasNumeros[i].textContent = '';
        }
        if (celulasNumeros[i].classList.contains('marcado')) {
            celulasNumeros[i].classList.remove('marcado');
        }
    }
    numerosSorteados.length = 0;
    document.querySelector('.n-1').textContent = '';
}
const botaoNovaCartela = document.querySelector('#novaCartela');
botaoNovaCartela.addEventListener('click', novaCartela);
// Função para verificar se há bingo na cartela
function verificarBingo() {
    const linhas = document.querySelectorAll('#tabelaBingo tr:not(:first-child)');
    for (let i = 0; i < linhas.length; i++) {
        const celulas = linhas[i].querySelectorAll('td');
        if (Array.from(celulas).every((celula) => celula.classList.contains('marcado'))) {
            return true;
        }
    }
    // Verificar cada coluna
    for (let i = 0; i < 5; i++) {
        const celulas = document.querySelectorAll(`#tabelaBingo tr:not(:first-child) td:nth-child(${i + 1})`);
        if (Array.from(celulas).every((celula) => celula.classList.contains('marcado'))) {
            return true;
        }
    }
    // Verificar as diagonais
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < 5; i++) {
        diagonal1.push(document.querySelector(`#tabelaBingo tr:nth-child(${i + 2}) td:nth-child(${i + 1})`));
        diagonal2.push(document.querySelector(`#tabelaBingo tr:nth-child(${i + 2}) td:nth-child(${5 - i})`));
    }
    if (diagonal1.every((celula) => celula.classList.contains('marcado')) ||
        diagonal2.every((celula) => celula.classList.contains('marcado'))) {
        return true;
    }
    // Verificar as quatro células das pontas
    const pontas = [
        document.querySelector('#tabelaBingo tr:nth-child(2) td:first-child'),
        document.querySelector('#tabelaBingo tr:nth-child(2) td:last-child'),
        document.querySelector('#tabelaBingo tr:last-child td:first-child'),
        document.querySelector('#tabelaBingo tr:last-child td:last-child'),
    ];
    if (pontas.every((celula) => celula.classList.contains('marcado'))) {
        return true;
    }
    // Verificar todas as células da tabela de bingo
    const todasCelulas = document.querySelectorAll('#tabelaBingo td');
    if (Array.from(todasCelulas).every((celula) => celula.classList.contains('marcado'))) {
        alert('Todos os números foram marcados!');
    }
    return false;
}
const botaoVerificarBingo = document.querySelector('#verificarBingo');
botaoVerificarBingo.addEventListener('click', function () {
    if (verificarBingo()) {
        console.log('Bingo!');
        alert('Bingo!');
    }
    else {
        console.log('Ainda não há bingo.');
        alert('Ainda não há bingo.');
    }
});
