// we can think of a deck of cards as a stack
// 3 last in first out
// 2
// 1
let deck = [];

const suits = ["hearts", "diamonds", "spades", "clubs"];
const values = [
  ["ace", 11],
  ["king", 10],
  ["queen", 10],
  ["jack", 10],
  ["ten", 10],
  ["nine", 9],
  ["eight", 8],
  ["seven", 7],
  ["six", 6],
  ["five", 5],
  ["four", 4],
  ["three", 3],
  ["two", 2],
];

// for (let value of values) {
//   for (let suit of suits) {
//     deck.push({ value, suit });
//   }
// }

// create our deck
suits.forEach((suit) => {
  values.forEach((value) => {
    deck.push({ value, suit });
  });
});

// shuffle our deck
function shuffle(deck) {
  deck.forEach((_card, index) => {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let current = deck[index]; // save the current card
    deck[index] = deck[randomIndex]; // replace the current card with the random card
    deck[randomIndex] = current; // set the random card to the current card
  });
}

shuffle(deck);

// draw a card
function drawCard(deck) {
  return deck.pop();
}

// push an item on a stack
// pop an item off a stack
function drawMultipleCards(deck, numberOfCards) {
  let cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(drawCard(deck));
  }
  return cards;
}

let hand1 = drawMultipleCards(deck, 2);
let hand2 = drawMultipleCards(deck, 2);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkIfHighAce(card){
   return card.value[1] == 11; 
    
}

function checkIfBust(hand) {
  if (computValue(hand) > 21) {
    const ace = hand.find(checkIfHighAce) 
    if(ace){
        ace.value[1] = 1
        return checkIfBust(hand);
    }                      
    return true;                   
  }                               
  return false;
  // return undefined;
}

function checkIfNatural(hand) {
    if (computValue(hand1) === 21 && hand1.length === 2) {
        return true;
    }
    return false;
}

console.log(hand1);

function computerDraw(hand) {
  if (computValue(hand) < 17) {
    hand2.push(drawCard(deck));
  }
}

function computValue(hand) {
  let total = 0;
  hand.forEach((card) => {
    total += card.value[1];
  });
  return total;
}

function playGame() { 
   if (checkIfNatural(hand1)) {
    console.log('Blackjack!')
    rl.close();
    return;
   }
  rl.question("hit or stay? ", function (answer) {
    if (answer === "hit") {
      hand1.push(drawCard(deck));
      if (checkIfBust(hand1)) {
        console.log(hand1);
        console.log("you busted");
        rl.close();
        return;
      }
      console.log(hand1);
      playGame();
    } else if (answer === "stay") {
      computerDraw(hand2);
      if (checkIfBust(hand2)) {
        console.log(hand2);
        console.log("computer busted");
        console.log("you win");
      } else {
        if (computValue(hand1) > computValue(hand2)) {
          console.log(hand2);
          console.log("you win");
        } else {
          console.log(hand2);
          console.log("you lose");
        }
      }
      rl.close();
    } else {
      console.log("invalid input");
      playGame();
    }
  });
}

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

playGame();
