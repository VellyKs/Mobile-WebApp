
// Dark mode ----------------------------------------------------------------

var toggle = document.getElementById("darkLight");

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)
change(storedTheme);
var currentTheme = document.documentElement.getAttribute("data-theme");
if (currentTheme === "dark") {
    toggle.checked = "true";
}



toggle.onclick = function () {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    // moon.checked = true;
    // sun.checked = false;
    var targetTheme = "dark";

    if (currentTheme === "dark") {
        targetTheme = "light";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    change(targetTheme);

    localStorage.setItem('theme', targetTheme);
};

function change(theme) {

    if (theme === "dark") {
        document.querySelector("#darklogo").setAttribute("style", "display: block")
        // document.querySelector(".conteiner .moon").setAttribute("style", "display: none")
        document.querySelector("#lightlogo").setAttribute("style", "display: none")
    }
    if (theme === "light") {
        document.querySelector("#darklogo").setAttribute("style", "display: none")
        document.querySelector("#lightlogo").setAttribute("style", "display: block")
    }
}

// Dark mode -------------------------------------------------------------------------

const openModal =  document.querySelector("#newInput");


console.log(openModal);
openModal.onclick = function (){
    var modal = document.querySelector(".modal");
    modal.classList.add("active");
}





