class BankView {
  parentElement = document.querySelector(".table");

  chips(num) {
    if (num == 500)
      return `<div class="chip chip--500 chip-bank" data-id="500"><div class="chip__circle"><div class="chip__midle" >500</div></div></div>`;
    if (num == 100)
      return `<div class="chip chip--100 chip-bank" data-id="100"><div class="chip__circle"><div class="chip__midle" >100</div></div></div>`;
    if (num == 25)
      return `<div class="chip chip--25 chip-bank" data-id="25"><div class="chip__circle"><div class="chip__midle" >25</div></div></div>`;
    if (num == 5)
      return `<div class="chip chip--5 chip-bank" data-id="5"><div class="chip__circle"><div class="chip__midle" >5</div></div></div>`;
    if (num == 1)
      return `<div class="chip chip--1 chip-bank" data-id="1"><div class="chip__circle"><div class="chip__midle" >1</div></div></div>`;
  }

  generateBank(amount) {
    this.parentElement.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="bank">
            <span class="bank__info">Your Bank: ${amount}</span>
            <svg class="bank__icon">
                <use xlink:href="img/symbol.svg#icon-attach_money"></use>
            </svg>
            </div>

            <div class="deal-container">
            <button class="btn btn--animated deal">deal</button>
            </div>

            <div class="chip-container chip-container--500">
                ${this.chips(500)}
            </div>
            <div class="chip-container chip-container--100">
            ${this.chips(100)}
            </div>
            <div class="chip-container chip-container--25">
            ${this.chips(25)}
            </div>
            <div class="chip-container chip-container--5">
            ${this.chips(5)}
            </div>
            <div class="chip-container chip-container--1">
            ${this.chips(1)}
            </div>
            <div class="bet--chip-container"></div>`
    );
  }

  placeBet(control) {
    const chip = this.chips;
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".chip")) return;
      let value = parseInt(e.target.closest(".chip").dataset.id);

      let div;
      if (e.target.closest(".chip--1")) div = `${chip(1)}`;
      if (e.target.closest(".chip--5")) div = `${chip(5)}`;
      if (e.target.closest(".chip--25")) div = `${chip(25)}`;
      if (e.target.closest(".chip--100")) div = `${chip(100)}`;
      if (e.target.closest(".chip--500")) div = `${chip(500)}`;

      if (e.target.closest(".chip-bank")) {
        value = parseInt(e.target.closest(".chip").dataset.id);

        e.target.closest(".chip").classList.add("chip-bet");
        e.target.closest(".chip").classList.remove("chip-bank");

        e.target
          .closest(".chip-container")
          .insertAdjacentHTML("beforeend", `${div}`);

        let betdiv = document.querySelector(".bet--chip-container");
        let betdivpos = betdiv.getBoundingClientRect();
        let chippos = e.target.closest(".chip").getBoundingClientRect();

        if (document.querySelectorAll(".chip-bet").length > 1) {
          let qty = document.querySelectorAll(".chip-bet").length;
          e.target.closest(".chip").style = `
            transform: translate(${betdivpos.left - chippos.left}px, ${
            betdivpos.top - chippos.top - (qty - 1) * 6
          }px) rotateX(45deg);
            z-index: ${qty};`;
        } else {
          e.target.closest(".chip").style = `
            transform: translate(${betdivpos.left - chippos.left}px, ${
            betdivpos.top - chippos.top
          }px) rotateX(45deg);`;
        }
      } else {
        value = -parseInt(e.target.closest(".chip").dataset.id);

        e.target.closest(".chip").classList.remove("chip-bet");
        e.target.closest(".chip").classList.add("chip-bank");

        e.target.closest(".chip").style = ``;
      }
      control(value);
    });
  }
  showBet(bet) {
    if (document.querySelector(".bet--info")) {
      document.querySelector(".bet--info").textContent = `Your Bet:${bet}`;
    } else {
      this.parentElement.insertAdjacentHTML(
        "afterbegin",
        `
                <div class="bet--info">Your Bet:${bet}</div>
                `
      );
    }
  }
  showChip(bank, remain) {
    document.querySelectorAll(".chip-hidden").forEach((el) => {
      if (parseInt(el.dataset.id) < remain) {
        setTimeout(() => {
          el.style.display = "block";
          el.classList.remove("chip-hidden");
        }, 500);
      }
    });
    document.querySelectorAll(".chip-bank").forEach((el) => {
      if (parseInt(el.dataset.id) > bank || parseInt(el.dataset.id) > remain) {
        el.style.display = "none";
        el.classList.add("chip-hidden");
      }
    });
  }
}
export default new BankView();
