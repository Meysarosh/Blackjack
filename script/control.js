import * as model from "./model.js";
console.log(model.bank);
console.log(model.deck);
console.log(model.cardsDeck);
model.createDeck();
console.log(model.deck);
console.log(model.pickCard());
console.log(model.deck);
//temporary

let deck = document.querySelector(".deck-container");
let deckpos = deck.getBoundingClientRect();

let cardInDeck = document.querySelector(".deck");
// let cardInDeckpos = cardInDeck.getBoundingClientRect();

let playerCard1 = document.querySelector(".player-card--1");
let playerCard1pos = playerCard1.getBoundingClientRect();

let playerCard2 = document.querySelector(".player-card--2");
let playerCard2pos = playerCard2.getBoundingClientRect();

let dealerCard1 = document.querySelector(".dealer-card--1");
let dealerCard1pos = dealerCard1.getBoundingClientRect();

let dealerCard2 = document.querySelector(".dealer-card--2");
let dealerCard2pos = dealerCard2.getBoundingClientRect();

// cardInDeck.style = `
// transform: rotateZ(-270deg)`;

playerCard1.style = `
transform: translate(${deckpos.left - playerCard1pos.left}px, ${
  deckpos.top - playerCard1pos.top
}px) rotateZ(-270deg)`;

playerCard2.style = `
transform: translate(${deckpos.left - playerCard2pos.left}px, ${
  deckpos.top - playerCard2pos.top
}px) rotateZ(-270deg)`;

dealerCard1.style = `
transform: translate(${deckpos.left - dealerCard1pos.left}px, ${
  deckpos.top - dealerCard1pos.top
}px) rotateZ(-270deg)`;

dealerCard2.style = `
transform: translate(${deckpos.left - dealerCard2pos.left}px, ${
  deckpos.top - dealerCard2pos.top
}px) rotateZ(-270deg)`;

document.querySelector(".deal").addEventListener("click", function () {
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

  playerCard1.style = ``;
  delay(250).then(() => (dealerCard1.style = `z-index:1;`));
  delay(500).then(() => (playerCard2.style = `z-index:1;`));
  delay(750).then(() => (dealerCard2.style = `z-index:1;`));
  delay(1000).then(() => {
    playerCard2.style = `z-index:0;`;
    document.getElementById("4clubs").classList.add("card--left");
  });
  delay(1250).then(() => {
    document.querySelectorAll(".card").forEach((el) => {
      if (
        !el.classList.contains("dealer-card--1") &&
        !el.classList.contains("dealer-card--2")
      ) {
        el.classList.toggle("card--visible");
        el.classList.toggle("card--hidden");
      }
    });
  });
  delay(1450).then(() => {
    document.getElementById("10diamonds").classList.toggle("card--top");
    document.getElementById("4clubs").classList.toggle("card--top");
    document.getElementById("Kspades").classList.add("card--top");
  });
  delay(1700).then(() => {
    document.getElementById("4clubs").classList.remove("card--left");
    document.getElementById("Kspades").classList.toggle("card--visible");
    document.getElementById("Kspades").classList.toggle("card--hidden");
    document.getElementById("Kspades").style.transform = "translateX(-100%)";
  });
});
