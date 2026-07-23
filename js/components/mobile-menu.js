const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");


if (menuToggle && navMenu) {


    menuToggle.addEventListener("click", () => {


        navMenu.classList.toggle("active");


        const isOpen = navMenu.classList.contains("active");


        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );


        menuToggle.innerHTML = isOpen
            ? '<i class="bi bi-x-lg"></i>'
            : '<i class="bi bi-list"></i>';


    });



    navLinks.forEach(link => {


        link.addEventListener("click", () => {


            navMenu.classList.remove("active");


            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );


            menuToggle.innerHTML =
                '<i class="bi bi-list"></i>';


        });


    });


}

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        navMenu.classList.remove("active");

        menuToggle.innerHTML =
            '<i class="bi bi-list"></i>';

    }

});