export let bank = 1000;
export let bet = 0;
export let remain = bank;

const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "D",
  "K",
  "A",
];
const symbols = ["hearts", "spades", "diamonds", "clubs"];
//cardsDeck generates only ones 52 card from numbers and symbols instead of hardcoding it
export const cardsDeck = [];
//deck is generated from cardsDeck id's, and shrinks every time you pick a card
export let deck = [];
export const standart = [
  "player-card--1",
  "player-card--2",
  "player-card--3",
  "player-card--4",
  "player-card--5",
  "dealer-card--1",
  "dealer-card--2",
  "dealer-card--3",
  "dealer-card--4",
  "dealer-card--5",
];
export const playersCards = [];
export const dealersCards = [];

//creating cardsDeck from numbers and symbols
symbols.forEach((symbol) => {
  numbers.forEach((number) => {
    let id = number + symbol;
    // defines value from number array where are numbers and letters, number=number else A=11 an dall the outhe letters =10.
    let value = parseInt(number) ? parseInt(number) : number == "A" ? 11 : 10;
    let color = symbol == "hearts" || symbol == "diamonds" ? "red" : "black";
    let icon = symbol == "hearts" ? "heart" : symbol;
    cardsDeck.push({
      id: id,
      value: value,
      color: color,
      icon: icon,
      number: number,
    });
  });
});

// creating deck from cardsDeck (extracting only card.id's)
export const createDeck = function () {
  deck = cardsDeck.map((card) => card.id);
};
//randomly pick a card from deck (returning picked card and removing it from deck)
export const pickCard = function (comand) {
  let i = Math.floor(Math.random() * deck.length);
  let cardname = deck.splice(i, 1)[0];
  let card = cardsDeck.filter((card) => card.id == cardname)[0];
  if (comand == "player") playersCards.push(card);
  if (comand == "dealer") dealersCards.push(card);
  console.log(deck.length);
  return card;
};
//first 4 cards of game
export const starterCards = function () {
  const cards = [];
  cards.push(pickCard("player"));
  cards.push(pickCard("dealer"));
  cards.push(pickCard("player"));
  cards.push(pickCard("dealer"));
  return cards;
};
///???????????????
//next card(s)
// export const nextCard = function (comand) {
//   const card = pickCard(comand);
// };

// calculates player or dealer score
export const calcScore = function (who) {
  let sum;
  if (who == "player") {
    sum = playersCards.reduce((acum, el) => {
      return acum + el.value;
    }, 0);
    if (sum > 21 && playersCards.find((el) => el.value == 11)) sum -= 10;
  } else {
    sum = dealersCards.reduce((acum, el) => {
      return acum + el.value;
    }, 0);
    if (sum > 21 && dealersCards.find((el) => el.value == 11)) sum -= 10;
  }
  return sum;
};

//betting
export const calcBet = function (value) {
  bet += value;
  remain = bank - bet;
};

//owerwrites bank value
export const reduceBank = function () {
  bank = remain;
};

//compaire score results and returns who is winner
export const result = function () {
  let res;
  if (calcScore("player") > 21) {
    res = "dealer";
  } else if (calcScore("dealer") > 21) {
    res = "player";
  } else if (calcScore("player") == calcScore("dealer")) {
    res = "draw";
  } else if (calcScore("player") > calcScore("dealer")) {
    res = "player";
  } else if (calcScore("player") < calcScore("dealer")) {
    res = "dealer";
  }
  return res;
};

export const plusBank = function () {
  if (result() == "draw") {
    bank = remain + bet;
  } else if (result() == "player") {
    bank = remain + 2 * bet;
  }
  bet = 0;
  remain = bank;
  return bank;
};
