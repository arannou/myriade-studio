let lang = 'FR'
document.addEventListener('DOMContentLoaded', main, false);

let editedContent = [...content]
function main() {
    editedContent = [...content]

    displayMenu()
    displayMenuEdition()
    displayCredits()

    content.forEach(page => {
        displayPage(page.contenu)
    })


    document.getElementById("burger").addEventListener('click', showMenu)
    document.getElementById("extract").addEventListener('click', () => extractContent())
    document.getElementById("reset").addEventListener('click', () => resetContent())
    document.getElementById("refreshMenu").addEventListener('click', () => {
        document.getElementById("meunlu").innerHTML = ''
        displayMenu()
    })

}

function extractContent() {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
        encodeURIComponent("const content = "+JSON.stringify(editedContent, null, "\t")));
    element.setAttribute('download', 'content.js');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function resetContent() {
    let editedContent = [...content]
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
    let lu = document.getElementById("meunlu")
    editedContent.forEach(menu => {
        let li = document.createElement("li")
        if (pathname.includes(menu.page)) {
            li.classList.add("active")
        }
        let a = document.createElement("span");
        a.innerText = menu.texteFR

        li.appendChild(a);
        lu.appendChild(li);
        li.addEventListener('click', () =>  {
            document.getElementById("main").innerHTML = ''
            displayPage(menu.contenu)
        })
    })
}

function displayMenuEdition() {
    let main = document.getElementById("menuEditor")

    editedContent.forEach(menu => {
        createInputText(menu, main)
    })

}

function createInputText(item, parent) {
    let div = document.createElement("div")
        let pFR = document.createElement("input");
        let pEN = document.createElement("input");
        pFR.setAttribute("type", "text")
        pEN.setAttribute("type", "text")
        pFR.value = item.texteFR
        pEN.value = item.texteEN

        div.appendChild(pFR);
        div.appendChild(pEN);
        parent.appendChild(div);
        pFR.addEventListener('change', (e) => updateVal(e.target.value, item, true))
        pEN.addEventListener('change', (e) => updateVal(e.target.value, item, false))

}

function updateVal(newVal, target, isFr) {
    if (isFr) target.texteFR = newVal
    else target.texteEN = newVal
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