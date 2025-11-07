document.addEventListener('DOMContentLoaded', interact, false);

let activeLang = "english"
const allLangs = ["francais", "english"]

function interact() {
    enableCopyMail()
    enableToggleMenu()

    if (navigator.language == 'fr-FR') {
        activeLang = "francais"
    }

    switchLang(activeLang)

    document.getElementById("lang-switch-francais").addEventListener("click", () => {
        if (activeLang == "francais") {
            return
        }
        switchLang("francais")
    })
    document.getElementById("lang-switch-english").addEventListener("click", () => {
        if (activeLang == "english") {
            return
        }
        switchLang("english")
    })
}

function switchLang(lang) {
    activeLang = lang
    let unActiveLang = allLangs.filter(l => l != lang)[0]
    // hide elements with class unActiveLang
    let english = document.getElementsByClassName(unActiveLang)
    for (let el of english) {
        el.classList.add("hide")
    }

    // show elements with class activeLang
    let francais = document.getElementsByClassName(activeLang)
    for (let el of francais) {
        el.classList.remove("hide")
    }

    document.getElementById("lang-switch-" + activeLang).classList.add("active")
    document.getElementById("lang-switch-" + unActiveLang).classList.remove("active")
}

function enableCopyMail() {
    let els = document.getElementsByClassName("mail-copy")
    for (let el of els) {
        el.addEventListener("click", () => {
            builtEmail = "manon" + "@" + "myriadestudio" + ".com"
            navigator.clipboard.writeText(builtEmail)
            window.alert("Adresse e-mail copiée!")
        })
    }
}

function enableToggleMenu() {
    // click on burger icon
    document.getElementById("burger").addEventListener('click', () => {
        const list = document.getElementById('nav-mobile').classList
        if (list.contains("open")) {
            list.remove("open")
        } else {
            list.add("open")
        }
    })

    // close when clicking a menu item
    const menuItems = document.querySelectorAll("#nav-mobile a")
    for (let menuItem of menuItems) {
        menuItem.addEventListener("click", () => {
            const list = document.getElementById('nav-mobile').classList
            if (list.contains("open")) {
                list.remove("open")
            }
        })
    }
}