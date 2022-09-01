import * as model from "./model.js";
import deckView from "./deckView.js";
import bankView from "./bankView.js";
import gameView from "./gameView.js";

//timeout function is used more times below
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

//calcs bet and remain value, shows bet value, controlls call for bet messsage, controls displaying chips based on remain value
const generateBet = function (value) {
  model.calcBet(value);
  bankView.showBet(model.bet);
  gameView.betPlaced(model.bet);
  bankView.showChip(model.remain);
};

//owerwrites bank value due to remain and displays it, drops starter cards, shows scores and if players score is 21 calls dealerGame function
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

//requests and drops new card for player, displays scores, if players score is equal or more then 21 calls dealerGame function
const nextCardForPlayer = function () {
  model.pickCard("player");
  deckView.dropNextCardForPlayer(model.playersCards);
  delay(500).then(() => {
    gameView.showScore(model.calcScore("player"), model.dealersCards[1].value);
  });
  if (model.calcScore("player") >= 21) dealerGame();
};

//untill dealer has less then 17 requests card for dealer and drop it, show scores, calls itself
const nextCardForDealer = function () {
  if (model.calcScore("dealer") < 17) {
    model.pickCard("dealer");
    deckView.dropNextCardForDealer(model.dealersCards);
    gameView.showScore(model.calcScore("player"), model.calcScore("dealer"));
    setTimeout(nextCardForDealer, 500);
  } else {
    endGame();
  }
};

const startNewGame = function (comand) {
  gameView.infoWin(comand);
  gameView.hideScore();
  deckView.displayDeck(model.standart);
};
//defines who won, display message, change cards brightness, throwing chips to the winner
const endGame = function () {
  const comand = model.result();
  gameView.infoWin(comand);
  deckView.cardsBrightness(comand);
  bankView.whoWonTakeBet(comand, model.plusBank());
  //////////////////
  bankView.showChip(model.remain);
  bankView.showBet(model.bet);
  /////////////////////
  //new game button + listener + hididng winner message
  gameView.newGame(comand, startNewGame);
};

//hides buttons, shows dilers first card, shows scores, if player has less then 21 request next card for dealer
const dealerGame = function () {
  gameView.dealer();
  deckView.showDealerFirstCard(model.dealersCards[0]);
  delay(500).then(() => {
    gameView.showScore(model.calcScore("player"), model.calcScore("dealer"));
  });
  delay(750).then(() => {
    if (model.calcScore("player") > 21) {
      endGame();
      return;
    }
    nextCardForDealer();
  });
};

//dislays the deck in left upper corner
deckView.displayDeck(model.standart);
//generates deck based on card id from cardsDeck array of objects
model.createDeck();
//displays bank and chips
bankView.displayBank(model.bank);
//listens to clicking on chips, moves chips and displays bet value than calls generateBet function that controls the bank/remain value and displaying chips in bank
bankView.placeBet(generateBet);
//controlls displaying chips based on bank/remain value
bankView.showChip(model.remain);
//gets  bet value from model.js and if its value=0 displays a call for bet message
// gameView.callForBet(model.bet);
gameView.betPlaced(model.bet);
//listens to clicking on deal button and if it was clicked hides it, shows hit and stand buttons. Than calls startGame function
gameView.deal(startGame);
//listens to clicking on hit button and if it was clicked calls nextCardForPlayer function
gameView.hit(nextCardForPlayer);
//listens to clicking on hit button and if it was clicked calls dealerGame function
gameView.stand(dealerGame);
