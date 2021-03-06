class GameView {
  parentElement = document.querySelector(".table");
  dealBtn = document.querySelector(".deal");
  hitBtn = document.querySelector(".hit");
  splitBtn = document.querySelector(".split");
  standBtn = document.querySelector(".stand");
  playerScore = document.querySelector(".player-score");
  dealerScore = document.querySelector(".dealer-score");
  infoWinPlayer = document.querySelector(".win--player");
  infoWinDealer = document.querySelector(".win--dealer");
  infoWinDraw = document.querySelector(".win--draw");

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
  hit(control) {
    const hitBtn = this.hitBtn;
    const splitBtn = this.splitBtn;
    const standBtn = this.standBtn;
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".hit")) return;
      control();
    });
  }
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
  dealer() {
    this.hitBtn.style.display = "none";
    this.splitBtn.style.display = "none";
    this.standBtn.style.display = "none";
  }
  showScore(pscore, dscore) {
    this.playerScore.style.display = "block";
    this.playerScore.innerHTML = pscore;

    this.dealerScore.style.display = "block";
    this.dealerScore.innerHTML = dscore;
  }
  infoWin(comand) {
    if (comand == "player") this.infoWinPlayer.classList.toggle("hidden");
    if (comand == "dealer") this.infoWinDealer.classList.toggle("hidden");
    if (comand == "draw") this.infoWinDraw.classList.toggle("hidden");
  }
}
export default new GameView();
