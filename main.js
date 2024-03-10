
var toggle = document.getElementById("darkLight");

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)
change(storedTheme);

toggle.onclick = function () {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    change(targetTheme);

    localStorage.setItem('theme', targetTheme);
};

function change(theme) {
    if (theme === "dark") {
        document.querySelector("#darklogo").setAttribute("style", "display: block")
        document.querySelector("#lightlogo").setAttribute("style", "display: none")
    }
    if (theme === "light") {
        document.querySelector("#darklogo").setAttribute("style", "display: none")
        document.querySelector("#lightlogo").setAttribute("style", "display: block")
    }
}