var elements = [...document.querySelectorAll(".tab a")];
var names = elements.map((el) => el.id);
for (pos = 0; pos < elements.length; pos++) {
  if (location.pathname.includes(names[pos])) {
    elements[pos].classList.add("active");
    document
      .getElementsByClassName("no-autoinit")[0]
      .classList.remove("no-autoinit");
  }
}

document.getElementById("sideswap").addEventListener("click",function(){
    var btn = document.getElementById("sideswap").classList;
    var nav = document.getElementById("nav-mobile").classList;
    var tab = document.getElementById("tab-list").classList;
    if (btn.contains("right")) {
        btn.remove("right")
        btn.add("left")
        nav.remove("left")
        nav.add("right")
        tab.remove("left")
        tab.add("right")
    } else {
        btn.remove("left")
        btn.add("right")
        nav.remove("right")
        nav.add("left")
        tab.remove("right")
        tab.add("left")
    }
})