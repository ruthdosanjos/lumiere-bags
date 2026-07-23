/* ==========================================================
   Toast
========================================================== */

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "cart-toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

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