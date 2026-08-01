/* ==========================================================
   Cart State
========================================================== */

const CART_STORAGE_KEY = "lumiereCart";

const SHIPPING_COST = 25;

function loadCart() {

    const storedCart = localStorage.getItem(
        CART_STORAGE_KEY
    );

    if (!storedCart) return [];

    try {

        const parsedCart = JSON.parse(storedCart);

        if (!Array.isArray(parsedCart)) return [];

        return parsedCart.filter(item => {

            return item
                && Number.isInteger(item.productId)
                && Number.isInteger(item.quantity)
                && item.quantity > 0;

        });

    } catch (error) {

        return [];

    }

}

let cart = loadCart();


window.cart = cart;
/* ==========================================================
   DOM Elements
========================================================== */

const cartCounter = document.querySelector(".cart-count");

const cartItemsCount = document.querySelector(".cart-items-count");

const cartButton = document.querySelector(".cart-button");

const miniCart = document.querySelector(".mini-cart");

const cartOverlay = document.querySelector(".cart-overlay");

const closeCartButton = document.querySelector(".close-cart-button");

const miniCartContent = document.querySelector(".mini-cart-content");

const checkoutButton = document.querySelector(
    ".mini-cart .checkout-button"
);

const cartTotal = document.querySelector(".cart-total strong");


/* ==========================================================
   Storage Helpers
========================================================== */

function saveCart() {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

    updateCartItemsCount();

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

            if (
                !item
                || !Number.isInteger(item.productId)
                || !Number.isInteger(item.quantity)
                || item.quantity <= 0
            ) {

                return null;

            }

            const product = getProduct(
                item.productId
            );

            if (!product) return null;

            return {

                ...product,

                quantity: item.quantity

            };

        })
        .filter(Boolean);

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

function getCartItemsCount(cartProducts = getCartProducts()) {

    return cartProducts.reduce((total, product) => {

        return total + product.quantity;

    }, 0);

}

function getCartSubtotal(cartProducts = getCartProducts()) {

    return cartProducts.reduce((total, item) => {

        return total + (
            item.price * item.quantity
        );

    }, 0);

}

function getShippingCost(subtotal) {

    return subtotal > 0
        ? SHIPPING_COST
        : 0;

}

function getOrderTotal(subtotal, shipping) {

    return subtotal + shipping;

}

function updateCartCounter() {

    if (!cartCounter) return;

    cartCounter.textContent = getCartItemsCount();

}

function updateCartTotal() {

    if (!cartTotal) return;

    cartTotal.textContent = formatPrice(
        getCartSubtotal()
    );

}

function syncCart() {

    saveCart();

    updateCartCounter();

    renderMiniCart();

}

/* ==========================================================
   Update Mini Cart Count
========================================================== */

function updateCartItemsCount() {

    if (!cartItemsCount) return;


    const totalItems = getCartItemsCount();


    if (totalItems === 0) {

        cartItemsCount.textContent = "0 itens";

        return;

    }


    if (totalItems === 1) {

        cartItemsCount.textContent = "1 item";

        return;

    }


    cartItemsCount.textContent = `${totalItems} itens`;

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

    openMiniCart();

}

function increaseQuantity(productId) {

    const cartItem = getCartItem(productId);

    if (!cartItem) return;

    cartItem.quantity++;

    syncCart();

}

function decreaseQuantity(productId) {

    const cartItem = getCartItem(productId);

    if (!cartItem) return;

    cartItem.quantity--;

    if (cartItem.quantity <= 0) {

        removeFromCart(productId);

        return;

    }

    syncCart();

}

function removeFromCart(productId) {

    const updatedCart = cart.filter(item => {

        return item.productId !== productId;

    });

    cart.splice(0, cart.length, ...updatedCart);

    syncCart();

}

function clearCart() {

    cart.splice(0, cart.length);

    syncCart();

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

function createMiniCartItem(product) {

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

                            ${product.quantity}

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

    const cartProducts = getCartProducts();

    if (!cartProducts.length) {

        renderEmptyCart();

        return;

    }

    miniCartContent.innerHTML = cartProducts
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

    if (product && typeof showToast === "function") {

        showToast(
            `${product.name} adicionada ao carrinho.`
        );

    }

}

function handleMiniCartClick(event) {

    const increaseButton = event.target.closest(".increase");

    if (increaseButton) {

        const productId = Number(
            increaseButton.dataset.productId
        );

        increaseQuantity(productId);

        return;

    }

    const decreaseButton = event.target.closest(".decrease");

    if (decreaseButton) {

        const productId = Number(
            decreaseButton.dataset.productId
        );

        decreaseQuantity(productId);

        return;

    }

    const removeButton = event.target.closest(".remove-item-button");

    if (removeButton) {

        const productId = Number(
            removeButton.dataset.productId
        );

        removeFromCart(productId);

    }

}

/* ==========================================================
   Checkout Redirect
========================================================== */

checkoutButton?.addEventListener(
    "click",
    () => {

        window.location.href = "./cart.html";

    }
);

/* ==========================================================
   Storage Events
========================================================== */

function handleCartStorage(event) {

    if (
        event.key !== CART_STORAGE_KEY
        && event.key !== null
    ) return;

    const storedCart = loadCart();

    cart.splice(0, cart.length, ...storedCart);

    updateCartCounter();

    renderMiniCart();

    updateCartItemsCount();

}


/* ==========================================================
   Event Listeners
========================================================== */

document.addEventListener(
    "click",
    handleCartClick
);

window.addEventListener(
    "storage",
    handleCartStorage
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

if (miniCartContent) {

    miniCartContent.addEventListener(
        "click",
        handleMiniCartClick
    );

}
/* ==========================================================
   Initialization
========================================================== */

updateCartCounter();

renderMiniCart();

updateCartItemsCount();
