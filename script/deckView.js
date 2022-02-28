class DeckView {
  parentElement = document.querySelector(".table");
  playerCard1;
  playerCard2;
  first2PlayerCards;
  dealerCard1;
  dealerCard2;

  generateDeck(standart) {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      ` <div class="deck-container">
            <div class="card deck" style="transform: rotateZ(-270deg) translate(0.5rem, -0.5rem)">
                <div class="card__side card__side--back">
                </div>
            </div>
            <div class="card deck" style="transform: rotateZ(-270deg) translate(0.25rem, -0.25rem)">
                <div class="card__side card__side--back">
                </div>
            </div>
            <div class="card deck">
                <div class="card__side card__side--back">
                <div class="card__backside-img"></div>
                </div>
            </div>
            </div>
            ${standart
              .map((el) => {
                return `
                <div class="card card--hidden ${el}" style="visibility: hidden">
                    <div class="card__side card__side--back">
                         <div class="card__backside-img"></div>
                    </div>
                </div>`;
              })
              .join("")}
            `
    );
    let deck = document.querySelector(".deck-container");
    let deckpos = deck.getBoundingClientRect();
    let cards = document.querySelectorAll(".card--hidden");
    cards.forEach((card) => {
      let cardpos = card.getBoundingClientRect();
      card.style = `
      visibility: hidden;
        transform: translate(${deckpos.left - cardpos.left}px, ${
        deckpos.top - cardpos.top
      }px) rotateZ(-270deg)`;
    });
    this.playerCard1 = document.querySelector(".player-card--1");
    this.playerCard2 = document.querySelector(".player-card--2");
    this.first2PlayerCards = [this.playerCard1, this.playerCard2];
    this.dealerCard1 = document.querySelector(".dealer-card--1");
    this.dealerCard2 = document.querySelector(".dealer-card--2");
  }

  insertFrontCardView(card) {
    return `
    <div class="card__side card__side--front">
      <div class="card__value card__value--${card.color}">
        <div class="card__value__symbol">${card.number}</div>
        <svg class="card__value__icon--${card.icon}">
          <use xlink:href="img/symbol.svg#icon-${card.icon}"></use>
        </svg>
      </div>
      <div class="card__value card__value--${card.color} card__value--bottom">
        <div class="card__value__symbol">${card.number}</div>
        <svg class="card__value__icon--${card.icon}">
          <use xlink:href="img/symbol.svg#icon-${card.icon}"></use>
        </svg>
      </div>
    </div>`;
  }

  dropStarterCards(starterCards) {
    this.playerCard1.insertAdjacentHTML(
      "beforeend",
      this.insertFrontCardView(starterCards[0])
    );
    this.playerCard2.insertAdjacentHTML(
      "beforeend",
      this.insertFrontCardView(starterCards[2])
    );
    this.dealerCard2.insertAdjacentHTML(
      "beforeend",
      this.insertFrontCardView(starterCards[3])
    );

    const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

    this.playerCard1.style = ``;
    delay(250).then(() => (this.dealerCard1.style = `z-index:1;`));
    delay(500).then(() => (this.playerCard2.style = `z-index:1;`));
    delay(750).then(() => (this.dealerCard2.style = `z-index:1;`));
    delay(1000).then(() => {
      this.playerCard1.classList.add("card--top");
      this.playerCard2.style = ``;
      this.playerCard2.classList.add("card--left");
    });
    delay(1250).then(() => {
      this.first2PlayerCards.forEach((el) => {
        el.classList.toggle("card--visible");
        el.classList.toggle("card--hidden");
      });
    });
    delay(1450).then(() => {
      this.first2PlayerCards.forEach((el) => {
        el.classList.toggle("card--top");
      });
      this.dealerCard2.classList.add("card--top");
    });
    delay(1700).then(() => {
      this.playerCard2.classList.remove("card--left");
      this.dealerCard2.classList.toggle("card--visible");
      this.dealerCard2.classList.toggle("card--hidden");
      this.dealerCard2.style.transform = "translateX(-100%)";
    });
  }
}
export default new DeckView();
