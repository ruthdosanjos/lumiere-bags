/* ==========================================================
   Newsletter
========================================================== */

const NEWSLETTER_STORAGE_KEY = "lumiereNewsletter";

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterInput = document.querySelector("#newsletter-email");



/* ==========================================================
   Storage Helpers
========================================================== */

function getSubscribers() {

    return JSON.parse(
        localStorage.getItem(NEWSLETTER_STORAGE_KEY)
    ) || [];

}


function saveSubscribers(subscribers) {

    localStorage.setItem(
        NEWSLETTER_STORAGE_KEY,
        JSON.stringify(subscribers)
    );

}



/* ==========================================================
   Validation
========================================================== */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



/* ==========================================================
   Events
========================================================== */

if (newsletterForm) {

    newsletterForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = newsletterInput.value
            .trim()
            .toLowerCase();



        if (!isValidEmail(email)) {

         showToast("Digite um e-mail válido.");

            return;

        }



        const subscribers = getSubscribers();



        if (subscribers.includes(email)) {

            showToast("Este e-mail já está cadastrado.");

            return;

        }



        subscribers.push(email);

        saveSubscribers(subscribers);

        newsletterForm.reset();

        showToast("Cadastro realizado com sucesso!");

    });

}