let game = {
  lockMode: false, //bloqueia que outra carta seja flipada enquanto 2 estiverem sendo checadas
  firstCard: null,
  secondCard: null,
  techs: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],
  cards: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    console.log(card);

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function () {
    return this.cards.filter((card) => !card.flipped).length == 0;
    //return true;
  },

  //cria as cartas a partir da tecnologia
  createCardsFromTechs: function () {
    this.cards = [];
    //para cada uma das tech, é retornado um array contendo 2 objetos
    for (let tech of this.techs) {
      this.cards.push(this.createPairFromTech(tech));
    }
    //flatMap separa os array secundário dentro do array pricipal, retornando cada um como um elemento solo do array pricipal
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  //cria um par de cartas para cada tech
  createPairFromTech: function (tech) {
    return [
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
    ];
  },

  //cria a ID unica de cada carta, a partir da concatenação do nome da tech + um numero randomico
  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      //Math.floor pega o elemento anterior ao passado, pois o array começa em 0. sendo assim, se o elemento for até 3, ele retorna 2, correspondendo a 3º casa do array
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      //inverte as posições do array. [x,y] = [y,x]
      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },
};
