let lang = 'FR'
document.addEventListener('DOMContentLoaded', main, false);

function main() {
    let locale = localStorage.getItem('language')
    if (locale) {
        lang = locale
    } else {
        lang = 'FR'
        localStorage.setItem('language', lang)
    }

    const currentPageContent = displayMenu()
    displayPage(currentPageContent)
    displayCredits()

    document.getElementById("burger").addEventListener('click', showMenu)
    document.getElementById("langEN").addEventListener('click', () => changeLang('EN'), false)
    document.getElementById("langFR").addEventListener('click', () => changeLang('FR'), false)

}

function changeLang(newLang) {
    if (newLang != lang) {
        lang = newLang

        // clear
        document.getElementById("meunlu").innerHTML = ''
        document.getElementById("main").innerHTML = ''

        const currentPageContent = displayMenu()
        displayPage(currentPageContent)
    }
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
    let currentPageContent;
    let lu = document.getElementById("meunlu")
    content.forEach(menu => {
        let active
        if (pathname.includes(menu.page)) {
            active = true
            currentPageContent = menu.contenu
        } else {
            active = false
        }

        let li = document.createElement("li")
        if (active) {
            li.classList.add("active")
        }
        let a = document.createElement("a");
        a.setAttribute("href", "./"+menu.page);
        if (lang == 'FR') a.innerText = menu.texteFR
        if (lang == 'EN') a.innerText = menu.texteEN

        li.appendChild(a);
        lu.appendChild(li);
    })
    return currentPageContent
}

function displayPage(page) {
    let main = document.getElementById("main")
    page.forEach(item => {
        if (item.type == "texte") {
            displayText(item, main)
        }
    })
}
function displayText(item, parent) {
    let p = document.createElement("p");
    if (lang == 'FR') p.innerText = item.texteFR
    if (lang == 'EN') p.innerText = item.texteEN
    parent.appendChild(p)
}

function displayImage(media, parent) {
    let image = document.createElement("img");
    image.setAttribute("src", media.source);
    image.setAttribute("alt", media.titre);
    
    parent.appendChild(image)
}

function displayVideo(media, parent) {
    let child = document.createElement("iframe");
    child.src = media.source;
    child.setAttribute("frameborder", 0);
    child.setAttribute("allowfullscreen", true);
    child.width = "560";
    child.height = "315";

    parent.appendChild(child)
}

function displayVideoLocal(media, parent) {
    child = document.createElement("video");
    child.setAttribute("controls", true);
    child.style.width = "560";
    child.style.height = "315";
    let source = document.createElement("source");
    source.src = media.source;
    source.setAttribute("type", "video/mp4");
    source.innerText = "Your browser does not support the video tag."
    child.append(source)

    parent.appendChild(child)
}
