document.addEventListener('DOMContentLoaded', main, false);

function main() {
    const currentPage = displayMenu()
    displayPage(currentPage)
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

function displayMenu() {
    const pathname = window.location.pathname
    let currentPage;
    let lu = document.getElementById("meunlu")
    content.forEach(menu => {
        let active
        if (pathname.includes(menu.page)) {
            active = true
            currentPage = menu.page
        } else {
            active = false
        }

        let li = document.createElement("li")
        if (active) {
            li.classList.add("active")
        }
        let a = document.createElement("a");
        a.setAttribute("href", "./"+menu.page);
        a.innerText = menu.texteFR

        li.appendChild(a);
        lu.appendChild(li);
    })
    return currentPage
}


function displayImage(media) {
    let image = document.createElement("img");
    image.setAttribute("src", media.source);
    image.setAttribute("alt", media.titre);
    
    return image
}

function displayVideo(media) {
    let child = document.createElement("iframe");
    child.src = media.source;
    child.setAttribute("frameborder", 0);
    child.setAttribute("allowfullscreen", true);
    child.width = "560";
    child.height = "315";

    return child
}

function displayVideoLocal(media) {
    child = document.createElement("video");
    child.setAttribute("controls", true);
    child.style.width = "560";
    child.style.height = "315";
    let source = document.createElement("source");
    source.src = media.source;
    source.setAttribute("type", "video/mp4");
    source.innerText = "Your browser does not support the video tag."
    child.append(source)

    return child
}
