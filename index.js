const tabelaBingo = document.querySelector('#tabelaBingo');
const bingo = document.querySelector('#nSorteado');
const letras = ['B', 'I', 'N', 'G', 'O'];
const colunaNumeros = [[], [], [], [], []];
const numerosPorColuna = 15;
const combinacoesBingo = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 4, 20, 24],
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

  numerosSorteados.push(numeroSorteado);
  console.log(`Sorteando número: ${numeroSorteado}`);

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

    if (!numerosSorteados.includes(numeroClicado)) {
      alert('O número clicado não foi sorteado.');
      return;
    }

    if (!numerosClicados.includes(numeroClicado)) {
      numerosClicados.push(numeroClicado);
      celula.classList.add('marcados');

      // Verificar combinações de bingo aqui
         for (const combinacao of combinacoesBingo) {
           const todosNumerosMarcados = combinacao.every((numero) =>
             numerosClicados.includes(numero)
           );
           if (todosNumerosMarcados) {
             alert('Bingo!');
             // Continue o jogo ou reinicie como desejar
             break; // Importante: Para de verificar outras combinações após encontrar um bingo
           }
        }
    }
  });
});


/*const tabela = document.querySelector("#tabelaBingo")
const bingo = document.querySelector("#nSorteado")
const combinacoesBingo = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 4, 20, 24],
]

let arrbg = Array.apply(null, { length: 26 }).map(Number.call, Number);

arrbg.shift()
shuffle(arrbg);

function shuffle(arrbg) {
    let currentIndex = arrbg.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arrbg[currentIndex], arrbg[randomIndex]] = [arrbg[randomIndex], arrbg[currentIndex]];
    }
    return arrbg;
}
let arraytabela = 0;
for (i = 0; i < 5; i++) {
    let tr = document.createElement("tr")
    tabela.appendChild(tr)

    for (j = 0; j < 5; j++) {
        let td = document.createElement("td")
        td.id = arrbg[arraytabela].toString()
        td.style.height = "20%"
        td.style.width = "20%"
        td.classList.add("numerosCartela")
        let div = document.createElement("div")
        div.classList.add("divCartela")
        if (i === 2 && j === 2) {
            div.textContent = "";
        } else {
            div.textContent = arrbg[arraytabela].toString();
        }
        td.appendChild(div)
        tr.appendChild(td)
        arraytabela++;
    }
}

function numeroSorteio() {
    return Math.floor(Math.random() * 50) + 1;
}

function sortearNumeros() {
    const numerosSorteados = document.querySelector("#n-sorteado");

    const numero1 = numeroSorteio();

    numerosSorteados.querySelector(".n-1").textContent = numero1;

}

const botaoSorteio = document.querySelector(".botao-sorteio");
botaoSorteio.addEventListener("click", sortearNumeros);


const nBingo = document.querySelectorAll(".numerosCartela");
let numerosGanhar = 0
nBingo.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.add("marcados");

        if(Ganhou()) {
            nBingo[numerosGanhar].classList.add("pedras");

            numerosGanhar++;
            if(numerosGanhar === 1) {
                alert('B I N G O O O');
            }else if (numerosGanhar === 2){
                alert('B I N G O O O');
            }else if (numerosGanhar === 3){
                alert('B I N G O O O');
            }else if (numerosGanhar === 4){
                alert('B I N G O O O');
            }else if (numerosGanhar === 5){
                alert('B I N G O O O');
            }else if (numerosGanhar === 6){
                alert('B I N G O O O');
            }else if (numerosGanhar === 7){
                alert('B I N G O O O');
            }else if (numerosGanhar === 8){
                alert('B I N G O O O');
            }else if (numerosGanhar === 9){
                alert('B I N G O O O, Você completou toda a Cartela');
            }
        }
    })
})

function Ganhou() {
    const nBingo = document.querySelectorAll(".numerosCartela");

    if (combinacoesBingo.length === 17) {
        console.log(combinacoesBingo.length === 1)

        alert("Parabens você fechou a cartela, Você venceu o Bingo!");
    }

    return combinacoesBingo.some(combination => {
        let verf = 0;
        combination.forEach(index => {
            if(nBingo[index].classList.contains("marcados")) verf++;
        })

        if(verf === 5) {
            let arrVit = combinacoesBingo.indexOf(combination);
            combinacoesBingo.splice(arrVit, 1)
        }

        return combination.every(index => {
            return nBingo[index].classList.contains("marcados")
        })
    })
}*/
