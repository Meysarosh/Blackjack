import * as model from "./model.js";
import deckView from "./deckView.js";
import bankView from "./bankView.js";

const generateBet = function (value) {
  model.calcBet(value);
  bankView.showBet(model.bet);
};

deckView.generateDeck(model.standart);
bankView.generateBank(model.bank);
bankView.placeBet(generateBet, model.remain);

// document.querySelector(".deal").addEventListener("click", function () {
//   const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

//   playerCard1.style = ``;
//   delay(250).then(() => (dealerCard1.style = `z-index:1;`));
//   delay(500).then(() => (playerCard2.style = `z-index:1;`));
//   delay(750).then(() => (dealerCard2.style = `z-index:1;`));
//   delay(1000).then(() => {
//     playerCard2.style = `z-index:0;`;
//     document.getElementById("4clubs").classList.add("card--left");
//   });
//   delay(1250).then(() => {
//     document.querySelectorAll(".card").forEach((el) => {
//       if (
//         !el.classList.contains("dealer-card--1") &&
//         !el.classList.contains("dealer-card--2")
//       ) {
//         el.classList.toggle("card--visible");
//         el.classList.toggle("card--hidden");
//       }
//     });
//   });
//   delay(1450).then(() => {
//     document.getElementById("10diamonds").classList.toggle("card--top");
//     document.getElementById("4clubs").classList.toggle("card--top");
//     document.getElementById("Kspades").classList.add("card--top");
//   });
//   delay(1700).then(() => {
//     document.getElementById("4clubs").classList.remove("card--left");
//     document.getElementById("Kspades").classList.toggle("card--visible");
//     document.getElementById("Kspades").classList.toggle("card--hidden");
//     document.getElementById("Kspades").style.transform = "translateX(-100%)";
//   });
// });
