class DeckView {
  parentElement = document.querySelector(".table");

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
  }
}
export default new DeckView();
