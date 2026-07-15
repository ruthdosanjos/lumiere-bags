console.log("cart-page.js carregado");


/* ==========================================================
   Cart Page State
========================================================== */

let cart = JSON.parse(
    localStorage.getItem("lumiereCart")
) || [];



/* ==========================================================
   Cart Helpers
========================================================== */

function getCartProducts() {

    return cart.map(item => {

        const product = products.find(
            product => product.id === item.productId
        );


        if (!product) return null;


        return {
            ...product,
            quantity: item.quantity
        };

    }).filter(Boolean);

}



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
   Save Cart
========================================================== */

function saveCart() {

    localStorage.setItem(
        "lumiereCart",
        JSON.stringify(cart)
    );

}



/* ==========================================================
   Format Currency
========================================================== */

function formatCurrency(value) {

    if (value === undefined || value === null) {

        console.warn(
            "Preço inválido recebido:",
            value
        );

        return "R$ 0,00";

    }


    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}



/* ==========================================================
   Calculate Totals
========================================================== */

function calculateTotals() {

    const cartProducts = getCartProducts();


    const subtotal = cartProducts.reduce(
        (total, item) =>
            total + (
                item.price *
                item.quantity
            ),
        0
    );


    const shipping = subtotal > 0
        ? 25
        : 0;


    const total = subtotal + shipping;



    if (subtotalElement) {

        subtotalElement.textContent =
            formatCurrency(subtotal);

    }


    if (shippingElement) {

        shippingElement.textContent =
            formatCurrency(shipping);

    }


    if (totalElement) {

        totalElement.textContent =
            formatCurrency(total);

    }

}



/* ==========================================================
   Render Cart Page
========================================================== */

function renderCartPage() {


    if (!cartItemsContainer) return;


    cartItemsContainer.innerHTML = "";



    const cartProducts = getCartProducts();



    if (!cartProducts.length) {


        cartItemsContainer.innerHTML = `

            <p class="cart-empty">

                Seu carrinho está vazio.

            </p>

        `;


        calculateTotals();

        return;

    }



    cartProducts.forEach(item => {


        const cartItem = document.createElement(
            "article"
        );


        cartItem.classList.add(
            "cart-page-item"
        );



        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="Bolsa ${item.name}">


            <div class="cart-page-info">


                <h3>
                    ${item.name}
                </h3>


                <p>
                    ${item.collection}
                </p>


                <strong>
                    ${formatCurrency(item.price)}
                </strong>



                <div class="cart-page-actions">


                    <button
                        class="quantity-button"
                        data-action="decrease"
                        data-id="${item.id}">

                        -

                    </button>



                    <span>
                        ${item.quantity}
                    </span>



                    <button
                        class="quantity-button"
                        data-action="increase"
                        data-id="${item.id}">

                        +

                    </button>



                    <button
                        class="remove-item-button"
                        data-action="remove"
                        data-id="${item.id}">

                        Remover

                    </button>


                </div>


            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );


    });


    calculateTotals();

}



/* ==========================================================
   Cart Actions
========================================================== */

cartItemsContainer?.addEventListener(
    "click",
    event => {


        const button = event.target.closest(
            "button"
        );


        if (!button) return;



        const id = Number(
            button.dataset.id
        );


        const action =
            button.dataset.action;



        const item = cart.find(
            product =>
                product.productId === id
        );



        if (!item) return;



        if (action === "increase") {

            item.quantity++;

        }



        if (action === "decrease") {


            item.quantity--;



            if (item.quantity <= 0) {


                cart = cart.filter(
                    product =>
                        product.productId !== id
                );

            }

        }



        if (action === "remove") {


            cart = cart.filter(
                product =>
                    product.productId !== id
            );

        }



        saveCart();

        renderCartPage();


    }
);



/* ==========================================================
   Initial Render
========================================================== */

console.log(
    "Carrinho página:",
    cart
);


renderCartPage();