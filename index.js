const tabelaBingo = document.querySelector('#tabelaBingo');
const bingo = document.querySelector('#nSorteado');
const letras = ['B', 'I', 'N', 'G', 'O'];
const colunaNumeros = [[], [], [], [], []];
const numerosPorColuna = 15;
const combinacoesBingo = [
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 18, 19],
  [20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29],

  [5, 10, 15, 20, 25],
  [6, 11, 16, 21, 26],
  [7, 12, 22, 27],
  [8, 13, 19, 23, 28],
  [9, 14, 19, 24, 29],
];
const numerosSorteados = [];
const numerosClicados = [];

for (let i = 0; i < colunaNumeros.length; i++) {
  for (let j = 0; j < numerosPorColuna; j++) {
    colunaNumeros[i].push(j + i * numerosPorColuna + 1);
  }
  shuffle(colunaNumeros[i]);
  console.log(colunaNumeros);
}

colunaNumeros[2][2] = null; // Célula N3 vazia

for (let linha = 0; linha < 6; linha++) {
  const tr = document.createElement('tr');
  tabelaBingo.appendChild(tr);

  for (let coluna = 0; coluna < 5; coluna++) {
    const td = document.createElement('td');
    td.style.height = '20%';
    td.style.width = '20%';
    td.classList.add('numerosCartela');

    const div = document.createElement('div');
    div.classList.add('divCartela');

    if (linha === 0) {
      div.textContent = letras[coluna];
    } else {
      const numero = colunaNumeros[coluna][linha - 1];
      div.textContent = numero !== null ? numero.toString() : '';
    }

    td.appendChild(div);
    tr.appendChild(td);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// funcao para sortear o numero

let indiceAtual = 0;

function sortearNumero() {
  if (numerosSorteados.length === 75) {
    alert(
      'Todos os números foram sorteados. Atualize a página para reiniciar o Jogo ou pressione OK'
    );
    location.reload();
    return;
  }

  let numeroSorteado;
  do {
    numeroSorteado = Math.floor(Math.random() * 75) + 1;
  } while (numerosSorteados.includes(numeroSorteado));
  console.log(numerosSorteados);

  numerosSorteados.push(numeroSorteado);

  const numerosSorteadosElement = document.querySelector('#n-sorteado');
  numerosSorteadosElement.querySelector('.n-1').textContent = numeroSorteado;
}

document.addEventListener('DOMContentLoaded', () => {
  const botaoSorteio = document.querySelector('.botao-sorteio');

  botaoSorteio.addEventListener('click', () => {
    sortearNumero();
  });
});

const celulasTabela = document.querySelectorAll('.numerosCartela');
celulasTabela.forEach((celula) => {
  celula.addEventListener('click', () => {
    const numeroClicado = parseInt(celula.textContent);
    const celulasTabela = document.querySelectorAll('.numerosCartela');
    let numerosGanhar = 0;
    if (!numerosSorteados.includes(numeroClicado)) {
    alert('O número clicado não foi sorteado.');
    return;
      celulasTabela.forEach((celula) => {
        celula.addEventListener('click', () => {
          if (!celula.classList.contains('marcados')) {
            celula.classList.add('marcados');
            numerosGanhar++;
            if (Ganhou()) {

              if (numerosGanhar === 5) {
                if (combinacoesBingo.some((combinacao) => combinacao.includes(numerosGanhar))) {
                alert('Bingo em uma das combinações!');
                }
              } 
              
              else if (numerosGanhar === 10) {
                if (combinacoesBingo.some((combinacao) => combinacao.includes(numerosGanhar))) {
                alert('Bingo em uma das combinações!');
                }
              } 
              
              else if (numerosGanhar === 15) {
                if (combinacoesBingo.some((combinacao) => combinacao.includes(numerosGanhar))) {
                alert('Bingo em uma das combinações!');
                }
              }
              
              else if(numerosGanhar === 20) {
                if (combinacoesBingo.some((combinacao) => combinacao.includes(numerosGanhar))) {
                alert('Bingo em uma das combinações!');
                }
              }
              
              else if(numerosGanhar === 24) {
                alert('B I N G O O O, Você completou toda a Cartela');
              }
            };
          };
        });
      });
    }
  });
});

    function Ganhou() {
      return combinacoesBingo.some((combination) => {
        return combination.every((index) => {
          return celulasTabela[index].classList.contains('marcados');
      });
    });
}
