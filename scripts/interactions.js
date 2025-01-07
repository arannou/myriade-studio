document.addEventListener('DOMContentLoaded', interact, false);

function interact() {
    enableCopyMail()
    enableToggleMenu()

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