let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//Array de padrão de vitória 
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
// Jogador 'X'  começa primeiro
let xTurn = true;
let count = 0;

//Disabilita todos os botões
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //habilita popup
  popupRef.classList.remove("hide");
};
//Habiilita todos os botões (para um novo jogo ou recomeço)
const enableButtons = () => {
    btnRef.forEach((element) => {
      element.innerText = "";
      element.disabled = false;
    });
  //Disabilita popup
    popupRef.classList.add("hide");
};

//Essa função é executada quando o jogador vence
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
      msgRef.innerHTML = "&#x1F389; <br> 'X' Venceu";
    } else {
      msgRef.innerHTML = "&#x1F389; <br> 'O' Venceu";
    }
  };

  // Função para empate
  const drawFunction = ()=> {
    disableButtons();
    msgRef.innerText = "&#x1f60e; <br> Jogo de pato. Empatado";
  }


//NOVO JOGO
newgameBtn.addEventListener("click", ()=>{
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () =>{
    count = 0;
    enableButtons();
})



//logica de vitoria
const winChecker = () => {

    // Faz um loop  entre os padrões de vitorias
    for (let i of winningPattern) {
      let [element1, element2, element3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
      ];
      // Cheque se os elementos estão preenchidos
      // Se houver 3 elementos são os mesmo dara a vitoria
      if (element1 != "" && (element2 != "") & (element3 != "")) {
        if (element1 == element2 && element2 == element3) {
          // se todos os 3 buttons estiverem com os mesmo valores então se torna winFunction
          winFunction(element1);
        }
      }
    }
  };
//Mostra X /O  ao  clicar
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Mostra o X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Mostra o O
      element.innerText = "O";
      element.disabled = true;
    }
    //Incrementação de contagem de cada click
    count += 1;
    if (count == 9) {

      drawFunction();
    }
    //checar a vitoria a cada clique
    winChecker();
  });
});

// Habilita botões e desabilita o popup  no carregamento da pagina
window.onload = enableButtons;
