import * as model from "./model.js";
import deckView from "./deckView.js";
import bankView from "./bankView.js";
import gameView from "./gameView.js";

const generateBet = function (value) {
  model.calcBet(value);
  bankView.showBet(model.bet);
  gameView.betPlaced(model.bet);
  bankView.showChip(model.bank, model.remain);
};

const startGame = function () {
  model.reduceBank();
  bankView.yourBank(model.bank);
  deckView.dropStarterCards(model.starterCards());
  setTimeout(() => {
    gameView.showScore(model.calcScore("player"), model.dealersCards[1].value);
  }, 2000);
};

deckView.generateDeck(model.standart);
model.createDeck();
bankView.generateBank(model.bank);
bankView.placeBet(generateBet);
bankView.showChip(model.bank, model.remain);
gameView.callForBet(model.bet);
gameView.deal(startGame);
