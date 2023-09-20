document.addEventListener('DOMContentLoaded', main, false);

function main() {
    displayCredits()
    
}

function displayCredits() {
    const year = new Date().getFullYear();
    document.getElementById("year").innerText = year;
}