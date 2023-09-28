let lang = 'FR'
document.addEventListener('DOMContentLoaded', main, false);

let editedContent = [...content]
function main() {
    editedContent = [...content]

    displayMenu()
    displayMenuEdition()
    displayCredits()

    displayPage(content[0].contenu) // display first page by default


    document.getElementById("burger").addEventListener('click', showMenu)
    document.getElementById("extract").addEventListener('click', () => extractContent())
    document.getElementById("reset").addEventListener('click', () => resetContent())
    document.getElementById("refreshMenu").addEventListener('click', () => refreshMenu())
    document.getElementById("addMenu").addEventListener('click', () => addMenu())

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
    editedContent = [...content]
    refreshMenu()
    refreshMenuEdition()
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

function refreshMenu() {
    document.getElementById("meunlu").innerHTML = ''
    displayMenu()
}

function displayMenuEdition() {
    let main = document.getElementById("menuEditorContent")

    editedContent.forEach(menu => {
        let div = createInputText(menu, main)
        let del = document.createElement("button");
        del.innerText = '❌'
        del.setAttribute('title', "Supprimer le menu")
        del.classList.add('deleteMenu')
        del.classList.add('icon')
        div.appendChild(del)
        del.addEventListener('click', () => deleteAMenu(menu))

        let move = document.createElement("button");
        move.innerText = '↕'
        move.setAttribute('title', "Réordonner le menu")
        move.classList.add('moveMenu')
        move.classList.add('icon')
        div.insertBefore(move, div.firstChild)
        move.addEventListener('click', () => moveMenu(menu))

    })
    enableDragList('menuEditorContent')
}

function refreshMenuEdition() {
    document.getElementById("menuEditorContent").innerHTML = ''
    displayMenuEdition()
}

function deleteAMenu(menu) {
    editedContent = editedContent.filter(m => m != menu)
    refreshMenuEdition()
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

        return div
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


/* Made with love by @fitri
 This is a component of my ReactJS project
https://www.codehim.com/vanilla-javascript/javascript-drag-and-drop-reorder-list */


function enableDragList(id) {
    const list = document.getElementById(id)
    Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
}

function enableDragItem(item) {
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

function handleDrag(item) {
    const selectedItem = item.target,
        list = selectedItem.parentNode,
        x = event.clientX,
        y = event.clientY;
  
    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
  
    if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

function handleDrop(item) {
    item.target.classList.remove('drag-sort-active');
    updateMenuModelFromUI()
}

/* end of @fitri */

function updateMenuModelFromUI() {
    const items = document.getElementById('menuEditorContent').children
    let newEditedContent = []
    Array.prototype.map.call(items, i => {
        let correspondingMenu = editedContent.filter(m => m.texteFR == i.children[1].value && m.texteEN == i.children[2].value)
        newEditedContent.push(correspondingMenu[0])
    })
    editedContent = newEditedContent
}

function addMenu() {
    let newMenu =     {
        "type":"menu",
        "texteFR": document.getElementById("newMenuFR").value,
        "texteEN": document.getElementById("newMenuEN").value,
        "contenu": []
    }

    document.getElementById("newMenuFR").value = ''
    document.getElementById("newMenuEN").value = ''

    editedContent.push(newMenu)
    refreshMenuEdition()
}