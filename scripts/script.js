const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";

startGame();
function startGame() {
  //recebe o que for retornado da função
  initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  //console.log(gameBoard);
  game.cards.forEach((card) => {
    let cardElement = document.createElement("div"); //cria uma div
    cardElement.id = card.id; //adiciona o ID a div criada
    cardElement.classList.add(CARD); //adiciona a classe 'card' ao elemento
    cardElement.dataset.icon = card.icon; //adiciona o data-icon ao elemento
    createCardContent(card, cardElement);
    cardElement.addEventListener("click", flipCard); //adiciona o evento de click ao elemento
    //console.log(cardElement);
    gameBoard.appendChild(cardElement); //adiciona a carta ao gameBoard
  });
}

//cria o conteúdo frente e verso de cada carta
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement); //frente
  createCardFace(BACK, card, cardElement); //verso
}

function createCardFace(face, card, cardElement) {
  let cardElementFace = document.createElement("div"); //cria uma div
  cardElementFace.classList.add(face); //adiciona a respectiva classe a div
  if (face === FRONT) {
    //adiciona a imagem do icon
    //<img class="icon" src="./assets/images/bootstrap.png" />
    let iconElement = document.createElement("img"); //cria um contaner img
    iconElement.classList.add(ICON); //adiciona a classe 'icon'
    iconElement.src = "./assets/images/" + card.icon + ".png"; //adiciona a imagem referente ao icon
    cardElementFace.appendChild(iconElement); //add o elemento criado ao cardElementFace
  } else {
    //adiciona o </>
    //<div class="cardBack">&lt/&gt</div>
    cardElementFace.innerHTML = "&lt/&gt";
  }
  cardElement.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver");
          setTimeout(() => {
            gameOverLayer.style.display = "flex";
          }, 1000);
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1500);
      }
    }
  }
}

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
}
