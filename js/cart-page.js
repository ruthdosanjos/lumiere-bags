(function initializeCartPage() {

/* ==========================================================
   DOM Elements
========================================================== */

const cartItemsContainer = document.querySelector(
    ".cart-page-list"
);

const subtotalElement = document.querySelector(
    ".summary-subtotal"
);

const shippingElement = document.querySelector(
    ".summary-shipping"
);

const totalElement = document.querySelector(
    ".summary-total strong"
);

const checkoutPageButton = document.querySelector(
    ".cart-summary .checkout-button[data-checkout-url]"
);


/* ==========================================================
   Cart Summary
========================================================== */

function updateSummary(cartProducts) {

    const subtotal = getCartSubtotal(
        cartProducts
    );

    const shipping = getShippingCost(
        subtotal
    );

    const total = getOrderTotal(
        subtotal,
        shipping
    );

    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(
                subtotal
            );

    }

    if (shippingElement) {

        shippingElement.textContent =
            formatPrice(
                shipping
            );

    }

    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                total
            );

    }

}

function updateCheckoutButtonState(cartProducts) {

    if (!checkoutPageButton) return;

    const hasValidProducts = cartProducts.length > 0;

    checkoutPageButton.disabled = !hasValidProducts;

    if (hasValidProducts) {

        checkoutPageButton.removeAttribute(
            "aria-disabled"
        );

        return;

    }

    checkoutPageButton.setAttribute(
        "aria-disabled",
        "true"
    );

}


/* ==========================================================
   Rendering Helpers
========================================================== */

function renderEmptyCart() {

    cartItemsContainer.innerHTML = `

        <p class="cart-empty">

            Seu carrinho está vazio.

        </p>

    `;

}


function createCartItem(item) {

    return `

        <article class="cart-item">

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image">

            <div class="cart-item-info">

                <span class="cart-item-collection">

                    ${item.collection}

                </span>

                <h2 class="cart-item-name">

                    ${item.name}

                </h2>

                <p class="cart-item-price">

                    ${formatPrice(item.price)}

                </p>

                <div class="cart-item-footer">

                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-button decrease"
                            data-product-id="${item.id}">

                            -

                        </button>

                        <span class="quantity">

                            ${item.quantity}

                        </span>

                        <button
                            type="button"
                            class="quantity-button increase"
                            data-product-id="${item.id}">

                            +

                        </button>

                    </div>

                    <button
                        type="button"
                        class="remove-item-button"
                        data-product-id="${item.id}">

                        Remover

                    </button>

                </div>

            </div>

        </article>

    `;

}


/* ==========================================================
   Rendering
========================================================== */

function renderCartPage() {

    if (!cartItemsContainer) return;

    const cartProducts = getCartProducts();

    updateCheckoutButtonState(cartProducts);

    if (!cartProducts.length) {

        renderEmptyCart();

        updateSummary(cartProducts);

        return;

    }

    cartItemsContainer.innerHTML = cartProducts
        .map(createCartItem)
        .join("");

    updateSummary(cartProducts);

}


/* ==========================================================
   Events
========================================================== */

function handleCartPageClick(event) {

    const increaseButton = event.target.closest(".increase");

    if (increaseButton) {

        const productId = Number(
            increaseButton.dataset.productId
        );

        increaseQuantity(productId);

        renderCartPage();

        return;

    }

    const decreaseButton = event.target.closest(".decrease");

    if (decreaseButton) {

        const productId = Number(
            decreaseButton.dataset.productId
        );

        decreaseQuantity(productId);

        renderCartPage();

        return;

    }

    const removeButton = event.target.closest(".remove-item-button");

    if (removeButton) {

        const productId = Number(
            removeButton.dataset.productId
        );

        removeFromCart(productId);

        renderCartPage();

    }

}

function handleCartPageStorage(event) {

    if (
        event.key !== CART_STORAGE_KEY
        && event.key !== null
    ) return;

    renderCartPage();

}

function handleCheckoutNavigation() {

    const cartProducts = getCartProducts();

    updateCheckoutButtonState(cartProducts);

    if (!cartProducts.length) return;

    const checkoutUrl = checkoutPageButton.dataset.checkoutUrl;

    if (!checkoutUrl) return;

    window.location.href = checkoutUrl;

}


cartItemsContainer?.addEventListener(

    "click",

    handleCartPageClick

);

window.addEventListener(

    "storage",

    handleCartPageStorage

);

checkoutPageButton?.addEventListener(

    "click",

    handleCheckoutNavigation

);


/* ==========================================================
   Initialization
========================================================== */

renderCartPage();

})();
