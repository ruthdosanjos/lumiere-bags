/* ==========================================================
   Cart Page State
========================================================== */

const SHIPPING_COST = 25;

const pageCart = window.cart;

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


/* ==========================================================
   Storage Helpers
========================================================== */

function saveCart() {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

}


/* ==========================================================
   Product Helpers
========================================================== */

function getProduct(productId) {

    return products.find(product => {

        return product.id === productId;

    });

}

function getCartItem(productId) {

    return cart.find(item => {

        return item.productId === productId;

    });

}

function getCartProducts() {

    return cart
        .map(item => {

            const product = getProduct(
                item.productId
            );

            if (!product) {

                return null;

            }

            return {

                ...product,

                quantity: item.quantity

            };

        })
        .filter(Boolean);

}

function formatPrice(value) {

    return value.toLocaleString(
        "pt-BR",
        {

            style: "currency",

            currency: "BRL"

        }
    );

}


/* ==========================================================
   Cart Helpers
========================================================== */

function getSubtotal() {

    return getCartProducts().reduce(
        (total, item) => {

            return total + (
                item.price *
                item.quantity
            );

        },
        0
    );

}

function getShipping() {

    return getSubtotal() > 0
        ? SHIPPING_COST
        : 0;

}

function getTotal() {

    return getSubtotal() + getShipping();

}

function updateSummary() {

    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(
                getSubtotal()
            );

    }

    if (shippingElement) {

        shippingElement.textContent =
            formatPrice(
                getShipping()
            );

    }

    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                getTotal()
            );

    }

}


/* ==========================================================
   Cart Actions
========================================================== */

function increaseQuantity(productId) {

    const item = getCartItem(
        productId
    );

    if (!item) return;

    item.quantity++;

    saveCart();

}

function decreaseQuantity(productId) {

    const item = getCartItem(
        productId
    );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }

    saveCart();

}

function removeFromCart(productId) {

    cart = cart.filter(item => {

        return item.productId !== productId;

    });

    saveCart();

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

    if (!cartProducts.length) {

        renderEmptyCart();

        updateSummary();

        return;

    }

    cartItemsContainer.innerHTML = cartProducts
        .map(createCartItem)
        .join("");

    updateSummary();

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


cartItemsContainer?.addEventListener(

    "click",

    handleCartPageClick

);


/* ==========================================================
   Initialization
========================================================== */

renderCartPage();