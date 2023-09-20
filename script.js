document.addEventListener('DOMContentLoaded', main, false);

function main() {
    displayCredits()

    document.getElementById("burger").addEventListener('click', showMenu)

}

function displayCredits() {
    const year = new Date().getFullYear();
    document.getElementById("year").innerText = year;
}

function showMenu() {
    const list = document.getElementById('menu').classList
    if (list.contains("open")) {
        list.remove("open")
    } else {
        list.add("open")
    }
}
function hideMenu() {}