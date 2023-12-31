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

    const currentPage = displayMenu()
    displayPage(currentPage)
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

        const currentPage = displayMenu()
        displayPage(currentPage)
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
    let currentPage;
    let lu = document.getElementById("meunlu")
    content.forEach(menu => {
        let active
        if (pathname.includes(menu.page)) {
            active = true
            currentPage = menu
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
    if (!currentPage) {
        // If root
        currentPage = content[0]
    }
    return currentPage
}

function displayPage(page) {
    let main = document.getElementById("main")
    displayFromContentParsing(page, main, main)
}

function displayFromContentParsing(content, parent) {
    content.contenu.forEach(item => {
        if (item.type == "texte") {
            displayText(item, parent)
        } else if (item.type == "image") {
            displayImage(item, parent)
        } else if (item.type == "section") {
            let div = document.createElement("div");
            div.classList.add('section-flex')
            displayFromContentParsing(item, div) 
            parent.appendChild(div)
        }
    })
}

function displayText(item, parent) {
    let p = document.createElement("p");
    if (lang == 'FR') p.innerText = item.texteFR
    if (lang == 'EN') p.innerText = item.texteEN
    if (item.position) p.style.textAlign = item.position
    parent.appendChild(p)
}

function displayImage(media, parent) {
    let imageDiv = document.createElement("div");
    let image = document.createElement("img");
    image.setAttribute("src", media.source);
    if (lang == 'FR') image.setAttribute("alt", media.texteFR);
    if (lang == 'EN') image.setAttribute("alt", media.texteEN);
    if (media.position) imageDiv.style.textAlign = media.position
    imageDiv.appendChild(image)
    parent.appendChild(imageDiv)
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
