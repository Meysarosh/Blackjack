import * as model from "./model.js";
import deckView from "./deckView.js";
import bankView from "./bankView.js";
import gameView from "./gameView.js";

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

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
  delay(2000).then(() => {
    gameView.showScore(model.calcScore("player"), model.dealersCards[1].value);
  });
  if (model.calcScore("player") == 21) {
    delay(2000).then(() => {
      dealerGame();
    });
  }
};

const nextCardForPlayer = function () {
  model.pickCard("player");
  deckView.dropNextCardForPlayer(model.playersCards);
  delay(500).then(() => {
    gameView.showScore(model.calcScore("player"), model.dealersCards[1].value);
  });
  if (model.calcScore("player") >= 21) dealerGame();
};

const nextCardForDealer = function () {
  model.pickCard("dealer");
  deckView.dropNextCardForDealer(model.dealersCards);
  gameView.showScore(model.calcScore("player"), model.calcScore("dealer"));
};

const dealerGame = function () {
  gameView.dealer();
  deckView.showDealerFirstCard(model.dealersCards[0]);
  delay(500).then(() => {
    gameView.showScore(model.calcScore("player"), model.calcScore("dealer"));
  });
  if (model.calcScore("player") > 21) return;
  delay(750).then(() => {
    if (model.calcScore("dealer") < 17) {
      nextCardForDealer();
    }
  });
  delay(1500).then(() => {
    if (model.calcScore("dealer") < 17) {
      nextCardForDealer();
    }
  });
  delay(2500).then(() => {
    if (model.calcScore("dealer") < 17) {
      nextCardForDealer();
    }
  });
};

deckView.generateDeck(model.standart);
model.createDeck();
bankView.generateBank(model.bank);
bankView.placeBet(generateBet);
bankView.showChip(model.bank, model.remain);
gameView.callForBet(model.bet);
gameView.deal(startGame);
gameView.hit(nextCardForPlayer);
gameView.stand(dealerGame);
