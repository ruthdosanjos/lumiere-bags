/* ==========================================================
   Toast
========================================================== */

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "cart-toast";

    toast.setAttribute("role", "status");

    toast.setAttribute("aria-live", "polite");

    toast.setAttribute("aria-atomic", "true");

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.textContent = message;

        toast.classList.add("show");

    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

/* ==========================================================
   Global
========================================================== */

window.showToast = showToast;
