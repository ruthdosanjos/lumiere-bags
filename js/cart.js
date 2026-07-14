/* ==========================================================
   Cart State
========================================================== */

const CART_STORAGE_KEY = "lumiereCart";

let cart = JSON.parse(
    localStorage.getItem(CART_STORAGE_KEY)
) || [];


/* ==========================================================
   DOM Elements
========================================================== */

const cartCounter = document.querySelector(".cart-count");

const cartButton = document.querySelector(".cart-button");

const miniCart = document.querySelector(".mini-cart");

const cartOverlay = document.querySelector(".cart-overlay");

const closeCartButton = document.querySelector(".close-cart-button");

const miniCartContent = document.querySelector(".mini-cart-content");

const cartTotal = document.querySelector(".cart-total strong");


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

function formatPrice(value) {

    return value.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


/* ==========================================================
   Cart Helpers
========================================================== */

function getCartItemsCount() {

    return cart.reduce((total, item) => {

        return total + item.quantity;

    }, 0);

}

function getCartTotal() {

    return cart.reduce((total, item) => {

        const product = getProduct(item.productId);

        if (!product) {

            return total;

        }

        return total + (product.price * item.quantity);

    }, 0);

}

function updateCartCounter() {

    if (!cartCounter) return;

    cartCounter.textContent = getCartItemsCount();

}

function updateCartTotal() {

    if (!cartTotal) return;

    cartTotal.textContent = formatPrice(
        getCartTotal()
    );

}

function syncCart() {

    saveCart();

    updateCartCounter();

    renderMiniCart();

}


/* ==========================================================
   Cart Actions
========================================================== */

function addToCart(productId) {

    const cartItem = getCartItem(productId);

    if (cartItem) {

        cartItem.quantity++;

    } else {

        cart.push({

            productId,

            quantity: 1

        });

    }

    syncCart();

}

function removeFromCart(productId) {

    // Implementaremos futuramente.

}

function updateQuantity(productId, quantity) {

    // Implementaremos futuramente.

}


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
   Mini Cart
========================================================== */

function openMiniCart() {

    if (!miniCart || !cartOverlay) return;

    miniCart.classList.add("open");

    cartOverlay.classList.add("show");

    document.body.classList.add("cart-open");

}

function closeMiniCart() {

    if (!miniCart || !cartOverlay) return;

    miniCart.classList.remove("open");

    cartOverlay.classList.remove("show");

    document.body.classList.remove("cart-open");

}


/* ==========================================================
   Mini Cart Rendering Helpers
========================================================== */

function renderEmptyCart() {

    if (!miniCartContent || !cartTotal) return;

    miniCartContent.innerHTML = `

        <p class="cart-empty">

            Seu carrinho está vazio.

        </p>

    `;

    cartTotal.textContent = formatPrice(0);

}

function createMiniCartItem(item) {

    const product = getProduct(item.productId);

    if (!product) {

        return "";

    }

    return `

        <article class="mini-cart-item">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="mini-cart-image">

            <div class="mini-cart-info">

                <h3 class="mini-cart-name">

                    ${product.name}

                </h3>

                <span class="mini-cart-collection">

                    ${product.collection}

                </span>

                <p class="mini-cart-price">

                    ${formatPrice(product.price)}

                </p>

                <div class="mini-cart-actions">

                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-button decrease"
                            data-product-id="${product.id}">

                            <i class="bi bi-dash"></i>

                        </button>

                        <span class="quantity">

                            ${item.quantity}

                        </span>

                        <button
                            type="button"
                            class="quantity-button increase"
                            data-product-id="${product.id}">

                            <i class="bi bi-plus"></i>

                        </button>

                    </div>

                    <button
                        type="button"
                        class="remove-item-button"
                        data-product-id="${product.id}"
                        aria-label="Remover ${product.name} do carrinho">

                        <i class="bi bi-trash3"></i>

                    </button>

                </div>

            </div>

        </article>

    `;

}

/* ==========================================================
   Mini Cart Rendering
========================================================== */

function renderMiniCart() {

    if (!miniCartContent) return;

    if (!cart.length) {

        renderEmptyCart();

        return;

    }

    miniCartContent.innerHTML = cart
        .map(createMiniCartItem)
        .join("");

    updateCartTotal();

}


/* ==========================================================
   Events
========================================================== */

function handleCartClick(event) {

    const button = event.target.closest(".add-to-cart-button");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    addToCart(productId);

    const product = getProduct(productId);

    if (product) {

        showToast(
            `${product.name} adicionada ao carrinho.`
        );

    }

}


/* ==========================================================
   Event Listeners
========================================================== */

document.addEventListener(
    "click",
    handleCartClick
);

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openMiniCart
    );

}

if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        closeMiniCart
    );

}

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeMiniCart
    );

}


/* ==========================================================
   Initialization
========================================================== */

updateCartCounter();

renderMiniCart();