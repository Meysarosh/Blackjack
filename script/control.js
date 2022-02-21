//temp
document.querySelector(".btn").addEventListener("click", function () {
  document.getElementById("4clubs").classList.add("card--left");
  setTimeout(function () {
    document.querySelectorAll(".card").forEach((el) => {
      el.classList.toggle("card--visible");
      el.classList.toggle("card--hidden");
    });

    setTimeout(function () {
      document.getElementById("10diamonds").classList.toggle("card--top");
      document.getElementById("4clubs").classList.toggle("card--top");
    }, 300);
    setTimeout(function () {
      document.getElementById("4clubs").classList.remove("card--left");
    }, 800);
  }, 500);
});
