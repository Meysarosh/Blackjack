class BankView {
  parentElement = document.querySelector(".table");
  bankInfo = document.querySelector(".bank__info");
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

  //displays your bank + value and chips on the table
  displayBank(amount) {
    this.parentElement.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="bank">
            <span class="bank__info">Your Bank: ${amount}</span>
            <svg class="bank__icon">
                <use xlink:href="img/symbol.svg#icon-attach_money"></use>
            </svg>
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

  //listens to clicking on chips,
  //extracts value from clicked chip
  //moves clicked chip from bank to bet and copys that chip to bank and backwards, chips move is based on div position and quantity of chips
  //in the and calls function in control.js that controlls bank/remain value and display chips based on remain value
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

  //if your bet message exists, owerwrites it with the new value, else inserts message with the bet value
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

  // if remain is bigger then the chip value, displays the chip in bank,
  //if the chip value bigger then the remain the chip will be hidden
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

  //displays bank after bet
  yourBank(amount) {
    document.querySelector(".bank__info").innerHTML = `Your Bank: ${amount}`;
  }

  whoWonTakeBet(result, bet) {
    let chipsOnTable;
    let counter;
    const scanChipsOnTable = function () {
      chipsOnTable = [];
      counter = 0;
      document.querySelectorAll(".chip-bet").forEach((el) => {
        chipsOnTable.push(el);
      });
      document.querySelectorAll(".chip-dealer").forEach((el) => {
        chipsOnTable.push(el);
      });
      chipsOnTable.sort(function (a, b) {
        return a.style.zIndex - b.style.zIndex;
      });
      counter = chipsOnTable.length;
    };

    // console.log(chipsOnTable[0].outerHTML);

    const chipsToDealer = function () {
      chipsOnTable[
        counter - 1
      ].style = `transform: translate(-500px, -1000px) rotateX(70deg);`;
      counter = counter - 1;
      if (counter > 0) {
        setTimeout(chipsToDealer, 250);
      }
    };
    const chipsToPlayer = function () {
      chipsOnTable[counter - 1].style = ``;
      chipsOnTable[counter - 1].classList.remove("chip-bet");
      chipsOnTable[counter - 1].classList.add("chip-bank");
      counter = counter - 1;
      if (counter > 0) {
        setTimeout(chipsToPlayer, 250);
      }
    };
    if (result == "dealer") {
      scanChipsOnTable();
      chipsToDealer();
    }
    if (result == "draw") {
      scanChipsOnTable();
      chipsToPlayer();
    }
    if (result == "player") {
      scanChipsOnTable();
      chipsOnTable.forEach((el, i) => {
        console.log(el.dataset.id);
        console.log(chipsOnTable[i].outerHTML);
        let chipPosition = el.getBoundingClientRect();
        let chipContainer = document.querySelector(
          `.chip-container--${el.dataset.id}`
        );
        let containerPosition = chipContainer.getBoundingClientRect();
        console.log(
          i,
          chipPosition.left,
          containerPosition.left,
          chipPosition.top,
          containerPosition.top
        );
        chipContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="chip chip--${el.dataset.id} chip-dealer" data-id="${
            el.dataset.id
          }" style="transform: translate(${
            chipPosition.left - containerPosition.left - 100
          }px, ${
            chipPosition.top - containerPosition.top
          }px) rotateX(45deg); z-index: ${
            i + 1
          };"><div class="chip__circle"><div class="chip__midle" >${
            el.dataset.id
          }</div></div></div>
        `
        );
      });

      scanChipsOnTable();
      chipsToPlayer();
    }
  }
}
export default new BankView();
