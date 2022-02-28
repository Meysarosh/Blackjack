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

export const cardsDeck = [];
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
// creating deck from cardsDeck
export const createDeck = function () {
  deck = cardsDeck.map((card) => card.id);
};
//randomly pick a card from deck (returning picked card and removing it from deck)
export const pickCard = function () {
  let i = Math.floor(Math.random() * deck.length);
  let card = deck.splice(i, 1)[0];
  return card;
};
//first 4 cards of game
export const starterCards = function () {
  const cardnames = [];
  let cards = [];
  cardnames.push(pickCard());
  cardnames.push(pickCard());
  cardnames.push(pickCard());
  cardnames.push(pickCard());
  cards = cardnames.map((el) => cardsDeck.filter((card) => card.id == el)[0]);
  playersCards.push(cards[0]);
  playersCards.push(cards[2]);
  dealersCards.push(cards[1]);
  dealersCards.push(cards[3]);
  return cards;
};
//
export const calcScore = function (who) {
  if (who == "player") {
    return playersCards.reduce((acum, el) => {
      return acum + el.value;
    }, 0);
  } else {
    return dealersCards.reduce((acum, el) => {
      return acum + el.value;
    }, 0);
  }
};
//betting
export const calcBet = function (value) {
  bet += value;
  remain = bank - bet;
};
export const reduceBank = function () {
  bank = remain;
};
