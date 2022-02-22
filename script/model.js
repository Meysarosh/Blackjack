export let bank = 1000;
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
export let deck = [];
export const cardsDeck = [];
// EXAMPLE of cardsDECK = [
//   {
//     id: "2hearts",
//     value: 2,
//     color: "red",
//     icon: "heart",
//   },
// ];
//creating cardsDeck from numbers and symbols
symbols.forEach((symbol) => {
  numbers.forEach((number) => {
    let id = number + symbol;
    let value = parseInt(number) ? parseInt(number) : number == "A" ? 11 : 10;
    let color = symbol == "hearts" || "diamonds" ? "red" : "black";
    let icon = symbol == "hearts" ? "heart" : symbol;
    cardsDeck.push({
      id: id,
      value: value,
      color: color,
      icon: icon,
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
  let card = deck.splice(i, 1);
  return card;
};
