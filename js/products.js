/* ==========================================================
   Products Data
========================================================== */

const products = [
    {
        id: 1,
        name: "Aurora",
        collection: "ÉTOILE",
        category: "shoulder",
        price: 489,
        image: "./assets/images/products/aurora.png"
    },
    {
        id: 2,
        name: "Celeste",
        collection: "ÉTOILE",
        category: "tote",
        price: 529,
        image: "./assets/images/products/celeste.png"
    },
    {
        id: 3,
        name: "Élise",
        collection: "ATELIER",
        category: "mini",
        price: 569,
        image: "./assets/images/products/elise.png"
    },
    {
        id: 4,
        name: "Noire",
        collection: "SIGNATURE",
        category: "crossbody",
        price: 619,
        image: "./assets/images/products/noire.png"
    },
    {
        id: 5,
        name: "Alba",
        collection: "ÉTOILE",
        category: "shoulder",
        price: 509,
        image: "./assets/images/products/alba.png"
    },
    {
        id: 6,
        name: "Serena",
        collection: "ATELIER",
        category: "tote",
        price: 589,
        image: "./assets/images/products/serena.png"
    },
    {
        id: 7,
        name: "Stella",
        collection: "SIGNATURE",
        category: "crossbody",
        price: 649,
        image: "./assets/images/products/stella.png"
    },
    {
        id: 8,
        name: "Vivienne",
        collection: "SIGNATURE",
        category: "mini",
        price: 679,
        image: "./assets/images/products/vivienne.png"
    }
];

/* ==========================================================
   Favorites State
========================================================== */

let favorites = JSON.parse(
    localStorage.getItem("lumiereFavorites")
) || [];


/* ==========================================================
   Favorites Storage
========================================================== */

function saveFavorites() {

    localStorage.setItem(
        "lumiereFavorites",
        JSON.stringify(favorites)
    );

}

/* ==========================================================
   DOM Elements
========================================================== */

const featuredProductsContainer = document.querySelector("#featured-products");

const productsCatalog = document.querySelector("#products-catalog");

const filterButtons = document.querySelectorAll(".filter-button");


/* ==========================================================
   Product Card
========================================================== */

function createProductCard(product) {

    return `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="Bolsa ${product.name} da coleção ${product.collection}"
                    loading="lazy"
                    decoding="async">

             <button
                   type="button"
                   class="favorite-button"
                   data-product-id="${product.id}"
                   aria-label="Adicionar bolsa ${product.name} aos favoritos">

             <i class="bi bi-heart"></i>

             </button>

            </div>

            <div class="product-info">

                <span class="product-collection">
                    ${product.collection}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

           <div class="product-actions">

    <p class="product-price">

        ${product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}

    </p>

    <button
        type="button"
        class="add-to-cart-button"
        data-product-id="${product.id}"
        aria-label="Adicionar bolsa ${product.name} ao carrinho">

        <i class="bi bi-bag-plus"></i>

    </button>

</div>

<a
    href="#"
    class="product-link"
    aria-label="Ver detalhes da bolsa ${product.name}">

    Ver detalhes

    <i class="bi bi-arrow-right"></i>

</a>
            </div>

        </article>

    `;

}


/* ==========================================================
   Featured Products
========================================================== */

function renderFeaturedProducts() {

    if (!featuredProductsContainer) return;


    const featuredProducts = products.slice(0, 4);


    featuredProductsContainer.innerHTML = featuredProducts
        .map(createProductCard)
        .join("");

}

/* ==========================================================
   Rendering
========================================================== */

function renderProducts(productsList) {

    if (!productsCatalog) return;


    if (!productsList.length) {

        productsCatalog.innerHTML = `

            <p class="products-empty">

                Nenhum produto encontrado.

            </p>

        `;

        return;

    }


    productsCatalog.innerHTML = productsList
        .map(createProductCard)
        .join("");

}

/* ==========================================================
   Filters
========================================================== */

function updateActiveFilter(activeButton) {

    filterButtons.forEach(button => {

        button.classList.remove("active");

    });

    activeButton.classList.add("active");

}



function filterProducts(category) {

    if (category === "all") {

        renderProducts(products);

        return;

    }

    const filteredProducts = products.filter(product => {

        return product.category === category;

    });

    renderProducts(filteredProducts);

}



/* ==========================================================
   Events
========================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        updateActiveFilter(button);

        filterProducts(category);

    });

});

function handleFavoriteClick(event) {

    const button = event.target.closest(".favorite-button");

    if (!button) return;


    const productId = Number(
        button.dataset.productId
    );


    if (favorites.includes(productId)) {

        favorites = favorites.filter(
            id => id !== productId
        );

    } else {

        favorites.push(productId);

    }


    saveFavorites();

    updateFavoriteButton(button, productId);

}

function updateFavoriteButton(button, productId) {

    const icon = button.querySelector("i");


    const isFavorite = favorites.includes(productId);


    icon.className = isFavorite
        ? "bi bi-heart-fill"
        : "bi bi-heart";


    button.classList.toggle(
        "active",
        isFavorite
    );

}

document.addEventListener(
    "click",
    handleFavoriteClick
);

function loadFavoriteState() {

    document
        .querySelectorAll(".favorite-button")
        .forEach(button => {

            const productId = Number(
                button.dataset.productId
            );


            updateFavoriteButton(
                button,
                productId
            );

        });

}


/* ==========================================================
   Initialization
========================================================== */

renderFeaturedProducts();

renderProducts(products);

loadFavoriteState();