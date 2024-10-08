let lang = 'FR'
document.addEventListener('DOMContentLoaded', main, false);

let editedContent = [...content]
function main() {
    editedContent = [...content]

    displayMenu()
    displayMenuEdition()

    //loadSaveIfExists() relou
    autoSave(60000) // save each minute to local storage

    displayPage(content[0]) // display first page by default


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
            displayPage(menu)
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
    let parentName = "main"
    displayFromContentParsing(page, main, parentName)
}

function displayFromContentParsing(content, parent, parentName) {
    let child;
    let childCount = 0
    content.contenu.forEach(item => {
        let childClass = parentName + '-' + childCount
        if (item.type == "texte") {
            child = displayText(item, parent)
        } else if (item.type == "image") {
            child = displayImage(item, parent)
        } else if (item.type == "section") {
            let div = document.createElement("div");
            div.classList.add('section-flex')
            displayFromContentParsing(item, div, childClass + "-section") 
            parent.appendChild(div)
            child = div
        }

        child.classList.add(childClass)
        child.classList.add('selectable')
        child.addEventListener('click', (e) => sendToCraftpad(e))
        childCount++
    })
}

function sendToCraftpad(e) {
    e.stopPropagation()
    console.log(e.target.tagName) // image, p, div ...
    console.log(e.target.classList) // image, p, div ...

    // get corresponding content_element
    if (e.target.tagName == "IMG") {
        // with filter of parse class ??
        let correspondingimage = editedContent.filter(m => m.texteFR == i.children[1].value && m.texteEN == i.children[2].value)
        
    }
    // fill form
    document.querySelector("#textEditor input[value="+content+"]")


    // make form visible
    document.getElementById("itemSelected").style.display = "block"

    
}

function displayText(item, parent) {
    let p = document.createElement("p");
    if (lang == 'FR') p.innerText = item.texteFR
    if (lang == 'EN') p.innerText = item.texteEN
    parent.appendChild(p)
    return p
}

function displayImage(media, parent) {
    let image = document.createElement("img");
    image.setAttribute("src", media.source);
    if (lang == 'FR') image.setAttribute("alt", media.texteFR);
    if (lang == 'EN') image.setAttribute("alt", media.texteEN);
    
    parent.appendChild(image)
    return image
}


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

/*

TODO: image picker
TODO: select item(s) and send to craftpad
    - get content element from click
    - update_item()
    - add_item()
    - remove_item()
    
TODO: choose to hide an item for a time
*/

function autoSave(interval) {
    setInterval(() => {
        localStorage.setItem('myriadeContent', JSON.stringify(editedContent))
        localStorage.setItem('myriadeTimeSaved', new Date())
    }, interval)
}

function loadSaveIfExists() {
    let save = localStorage.getItem('myriadeContent')
    let d = new Date(localStorage.getItem('myriadeTimeSaved'))
    if (save) {
        let doLoad = window.confirm('Des modifications ont été sauvegardées le : '+d.toLocaleDateString() + ' à '+ d.toLocaleTimeString() 
        + '. Les restaurer ? (sinon revenir à l\'état du site public)')
        if (doLoad) {
            editedContent = JSON.parse(save)
            refreshMenu()
            refreshMenuEdition()
        }
    }
}