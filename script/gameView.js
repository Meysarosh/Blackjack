class GameView {
  parentElement = document.querySelector(".table");
  dealBtn = document.querySelector(".deal");
  newGameBtn = document.querySelector(".new-game");
  hitBtn = document.querySelector(".hit");
  splitBtn = document.querySelector(".split");
  standBtn = document.querySelector(".stand");
  playerScore = document.querySelector(".player-score");
  dealerScore = document.querySelector(".dealer-score");
  infoWinPlayer = document.querySelector(".win--player");
  infoWinDealer = document.querySelector(".win--dealer");
  infoWinDraw = document.querySelector(".win--draw");

  //displaying message that calls for making bet if bet=0
  callForBet(bet) {
    if (bet == 0) {
      this.parentElement.insertAdjacentHTML(
        "beforeend",
        `
            <div class="call-for-bet">
                 Plaese, make your bet by clicking on chips
            </div>
            <svg class="call-for-bet-arrow">
            <use xlink:href="img/symbol.svg#icon-arrow-bold-down"></use>
            </svg>
            `
      );
    }
  }

  //hides call for bet message and the moving arrow, displays deal button. If all the chips was removed from bet (bet=0) displaying call for bet message and the moving arrow
  betPlaced(bet) {
    document.querySelector(".call-for-bet").style.display = "none";
    document.querySelector(".call-for-bet-arrow").style.display = "none";
    this.dealBtn.style.display = "block";
    if (bet == 0) {
      this.dealBtn.style.display = "none";
      document.querySelector(".call-for-bet").style.display = "block";
      document.querySelector(".call-for-bet-arrow").style.display = "block";
    }
  }

  //listen to clicking on deal button and if it was clicked hides it, shows hit and stand buttons. Than calls ontrol.js function
  deal(control) {
    const dealBtn = this.dealBtn;
    const hitBtn = this.hitBtn;
    const splitBtn = this.splitBtn;
    const standBtn = this.standBtn;

    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("deal")) return;
      dealBtn.style.display = "none";
      hitBtn.style.display = "block";
      standBtn.style.display = "block";
      control();
    });
  }

  // listener to hit button than call control.js function
  hit(control) {
    const hitBtn = this.hitBtn;
    const splitBtn = this.splitBtn;
    const standBtn = this.standBtn;
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".hit")) return;
      control();
    });
  }

  // listener to hit button than call control.js function
  stand(control) {
    const hitBtn = this.hitBtn;
    const splitBtn = this.splitBtn;
    const standBtn = this.standBtn;
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".stand")) return;
      hitBtn.style.display = "none";
      splitBtn.style.display = "none";
      standBtn.style.display = "none";
      control();
    });
  }

  //hides all buttons when dealers game
  dealer() {
    this.hitBtn.style.display = "none";
    this.splitBtn.style.display = "none";
    this.standBtn.style.display = "none";
  }

  //displays players and dealers open cards score
  showScore(pscore, dscore) {
    this.playerScore.style.display = "block";
    this.playerScore.innerHTML = pscore;

    this.dealerScore.style.display = "block";
    this.dealerScore.innerHTML = dscore;
  }

  //displays winner message based on result of game
  infoWin(comand) {
    if (comand == "player") this.infoWinPlayer.classList.toggle("hidden");
    if (comand == "dealer") this.infoWinDealer.classList.toggle("hidden");
    if (comand == "draw") this.infoWinDraw.classList.toggle("hidden");
  }

  //display new game button
  newGame() {
    this.newGameBtn.style.display = "block";
  }
}
export default new GameView();
