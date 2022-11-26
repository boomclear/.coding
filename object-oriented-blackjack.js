// what is a deck?
// a deck is a collection of cards
// you can shuffle a deck
// you can draw cards from a deck

class Card {
  constructor(suit, name, value) {
    this.suit = suit;
    this.name = name;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["hearts", "diamonds", "spades", "clubs"];
    const name = [
      "ace",
      "king",
      "queen",
      "jack",
      "ten",
      "nine",
      "eight",
      "seven",
      "six",
      "five",
      "four",
      "three",
      "two",
    ];
    const value = [11, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < name.length; j++) {
        let card = new Card(name[j], suits[i], value[j]);
        this.cards.push(card);
      }
    }
  }
  // shuffle the deck
  shuffle() {
    // shuffle the deck
    // using the Fisher-Yates shuffle algorithm
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }
  // draw a card from the deck
  draw() {
    return this.cards.pop();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }
  // player is dealt a card
  deal(card) {
    this.hand.push(card);
  }
  // get the value of the hand
  getHandValue() {
    let handValue = 0;
    for (let card of this.hand) {
      handValue += card.value;
    }
    return handValue;
  }
}

class Game {
  constructor() {
    this.players = [];
    let deck = new Deck();
    deck.shuffle();
    this.deck = deck;
  }

  addPlayer(name) {
    this.players.push(new Player(name));
  }

  deal() {
    // deal two cards to each player
    for (let i = 0; i < 2; i++) {
      this.players.forEach((player) => {
        player.deal(this.deck.draw());
      });
    }
  }
}

blackjack = new Game();

blackjack.addPlayer("micah");
blackjack.addPlayer("austin");
blackjack.addPlayer("dealer");

blackjack.deal();

console.log(blackjack.players[1].hand);
