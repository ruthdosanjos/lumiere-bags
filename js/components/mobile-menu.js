const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");


function setMobileMenuState(isOpen, restoreFocus = false) {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.toggle(
        "active",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
        : '<i class="bi bi-list" aria-hidden="true"></i>';

    if (restoreFocus) {
        menuToggle.focus();
    }

}


if (menuToggle && navMenu) {

    setMobileMenuState(false);

    menuToggle.addEventListener("click", () => {

        const isOpen = !navMenu.classList.contains(
            "active"
        );

        setMobileMenuState(isOpen);

    });



    navLinks.forEach(link => {


        link.addEventListener("click", () => {

            setMobileMenuState(false);

        });


    });


}

if (menuToggle && navMenu) {

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 768
            && navMenu.classList.contains("active")
        ) {
            setMobileMenuState(false);
        }

    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape"
            && navMenu.classList.contains("active")
        ) {
            setMobileMenuState(false, true);
        }

    });

}
