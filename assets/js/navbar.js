var elements = [...document.querySelectorAll(".tab a")];
var names = elements.map((el) => el.id);
for (pos = 0; pos < elements.length; pos++) {
  if (location.pathname.includes(names[pos])) {
    elements[pos].classList.add("active");
    if (document.getElementsByClassName("no-autoinit")[0]) {
      document
        .getElementsByClassName("no-autoinit")[0]
        .classList.remove("no-autoinit");
    }
  }
}

document.getElementById("sideswap").addEventListener("click", function () {
  var btn = document.getElementById("sideswap").classList;
  if (btn.contains("right")) {
    setNavbar("right");
  } else {
    setNavbar("left");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var cookie = document.cookie;
  if (cookie) {
    var side = cookie.split("=")[1]
    setNavbar(side)
  }
});

function setNavbar(side) {
  var btn = document.getElementById("sideswap").classList;
  var nav = document.getElementById("nav-mobile").classList;
  var tab = document.getElementById("tab-list").classList;
  if (side === "right") {
    document.cookie = "swiper=right;Max-Age=31536000;path=/";
    btn.remove("right");
    btn.add("left");
    nav.remove("left");
    nav.add("right");
    tab.remove("left");
    tab.add("right");
  }
  if (side === "left") {
    document.cookie = "swiper=left;Max-Age=31536000;path=/"
    btn.remove("left");
    btn.add("right");
    nav.remove("right");
    nav.add("left");
    tab.remove("right");
    tab.add("left");
  }
}
