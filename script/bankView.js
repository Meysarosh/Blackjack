class BankView {
  parentElement = document.querySelector(".table");

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
                <div class="chip chip--500" data-id="500">
                    <div class="chip__circle">
                    <div class="chip__midle">500</div>
                    </div>
                </div>
            </div>
            <div class="chip-container chip-container--100">
                <div class="chip chip--100" data-id="100">
                    <div class="chip__circle">
                    <div class="chip__midle">100</div>
                    </div>
                </div>
            </div>
            <div class="chip-container chip-container--25">
                <div class="chip chip--25" data-id="25">
                    <div class="chip__circle">
                    <div class="chip__midle">25</div>
                    </div>
                </div>
            </div>
            <div class="chip-container chip-container--5">
                <div class="chip chip--5" data-id="5">
                    <div class="chip__circle">
                    <div class="chip__midle">5</div>
                    </div>
                </div>
            </div>
            <div class="chip-container chip-container--1">
                <div class="chip chip--1" data-id="1">
                    <div class="chip__circle">
                    <div class="chip__midle">1</div>
                    </div>
                </div>
            </div>
            <div class="bet--chip"></div>`
    );
  }

  placeBet(control, remain) {
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".chip")) return;
      console.log(remain);
      e.target.closest(".chip").classList.add("bet");
      let value = parseInt(e.target.closest(".chip").dataset.id);
      control(value);
      let div;
      if (e.target.closest(".chip--1") && remain > 1)
        div = `<div class="chip chip--1" data-id="1"><div class="chip__circle"><div class="chip__midle" >1</div></div></div>`;
      if (e.target.closest(".chip--5") && remain > 5)
        div = `<div class="chip chip--5" data-id="5"><div class="chip__circle"><div class="chip__midle" >5</div></div></div>`;
      if (e.target.closest(".chip--25") && remain > 25)
        div = `<div class="chip chip--25" data-id="25"><div class="chip__circle"><div class="chip__midle" >25</div></div></div>`;
      if (e.target.closest(".chip--100") && remain > 100)
        div = `<div class="chip chip--100" data-id="100"><div class="chip__circle"><div class="chip__midle" >100</div></div></div>`;
      if (e.target.closest(".chip--500") && remain > 500)
        div = `<div class="chip chip--500" data-id="500"><div class="chip__circle"><div class="chip__midle" >500</div></div></div>`;

      e.target
        .closest(".chip-container")
        .insertAdjacentHTML("beforeend", `${div}`);

      let betdiv = document.querySelector(".bet--chip");
      let betdivpos = betdiv.getBoundingClientRect();
      let chippos = e.target.closest(".chip").getBoundingClientRect();

      if (document.querySelectorAll(".bet").length > 1) {
        let qty = document.querySelectorAll(".bet").length;
        e.target.closest(".chip").style = `
      transform: translate(${betdivpos.left - chippos.left}px, ${
          betdivpos.top - chippos.top - (qty - 1) * 6
        }px) rotateX(45deg);
      z-index: ${qty};
      `;
      } else {
        e.target.closest(".chip").style = `
        transform: translate(${betdivpos.left - chippos.left}px, ${
          betdivpos.top - chippos.top
        }px) rotateX(45deg);
        `;
      }
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
}
export default new BankView();
