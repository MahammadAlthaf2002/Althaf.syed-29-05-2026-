const products = [
    {
        id: 1,
        name: "iPhone 16",
        category: "Mobiles",
        price: 59999,
        rating: 4.8,
        stock: 12,
        emoji: "📱"
    },
    {
        id: 2,
        name: "Samsung S24",
        category: "Mobiles",
        price: 64999,
        rating: 4.7,
        stock: 8,
        emoji: "📱"
    },
    {
        id: 3,
        name: "Sony Headphones",
        category: "Audio",
        price: 24990,
        rating: 4.6,
        stock: 15,
        emoji: "🎧"
    },
    {
        id: 4,
        name: "MacBook Air",
        category: "Laptops",
        price: 89999,
        rating: 4.9,
        stock: 5,
        emoji: "💻"
    },
    {
        id: 5,
        name: "Dell Inspiron",
        category: "Laptops",
        price: 64990,
        rating: 4.4,
        stock: 10,
        emoji: "💻"
    },
    {
        id: 6,
        name: "Apple Watch",
        category: "Wearables",
        price: 39999,
        rating: 4.5,
        stock: 7,
        emoji: "⌚"
    },
    {
        id: 7,
        name: "AirPods Pro",
        category: "Audio",
        price: 24900,
        rating: 4.8,
        stock: 20,
        emoji: "🎵"
    },
    {
        id: 8,
        name: "OnePlus 13",
        category: "Mobiles",
        price: 69999,
        rating: 4.6,
        stock: 9,
        emoji: "📱"
    }
];

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

let currentProducts = [...products];

const productContainer =
    document.getElementById("productContainer");

const searchInput =
    document.getElementById("searchInput");

const categorySelect =
    document.getElementById("categorySelect");

const sortSelect =
    document.getElementById("sortSelect");


// --------------------------------
// Categories
// --------------------------------

const categories = [
    ...new Set(
        products.map(product => product.category)
    )
];

categories.forEach(category => {

    const option =
        document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);
});


// --------------------------------
// Display Products
// --------------------------------

function displayProducts(list) {

    productContainer.innerHTML = "";

    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product";

        card.dataset.id = product.id;

        card.innerHTML = `
            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-body">

                <span class="category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="price">
                    ₹${product.price.toLocaleString()}
                </div>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <small>
                    ${product.stock} available
                </small>

                <div class="product-actions">

                    <button
                        class="view-btn"
                        data-action="view">
                        View
                    </button>

                    <button
                        class="add-btn"
                        data-action="add">
                        Add
                    </button>

                </div>

            </div>
        `;

        productContainer.appendChild(card);
    });

    document.getElementById("showingCount")
        .textContent = list.length;

    updateStats(list);
}


// --------------------------------
// Statistics
// --------------------------------

function updateStats(list) {

    if (list.length === 0) {

        document.getElementById("averagePrice")
            .textContent = "₹0";

        document.getElementById("topRated")
            .textContent = "-";

        return;
    }

    const total =
        list.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );

    const average =
        Math.round(total / list.length);

    const top =
        [...list].sort(
            (a, b) => b.rating - a.rating
        )[0];

    document.getElementById("averagePrice")
        .textContent =
        `₹${average.toLocaleString()}`;

    document.getElementById("topRated")
        .textContent = top.name;
}


// --------------------------------
// Search
// Debouncing
// --------------------------------

let searchTimer;

searchInput.addEventListener("input", () => {

    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {

        applyFilters();

    }, 400);
});


// --------------------------------
// Filter
// --------------------------------

categorySelect.addEventListener(
    "change",
    applyFilters
);


// --------------------------------
// Sort
// --------------------------------

sortSelect.addEventListener(
    "change",
    applyFilters
);


function applyFilters() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();

    const category =
        categorySelect.value;

    currentProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch &&
                   matchesCategory;
        });


    const sort = sortSelect.value;

    if (sort === "low") {

        currentProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (sort === "high") {

        currentProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (sort === "rating") {

        currentProducts.sort(
            (a, b) => b.rating - a.rating
        );

    } else if (sort === "name") {

        currentProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );
    }

    displayProducts(currentProducts);

    document.getElementById("emptyMessage")
        .classList.toggle(
            "hidden",
            currentProducts.length !== 0
        );
}


// --------------------------------
// Event Delegation
// --------------------------------

productContainer.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest("button");

        if (!button) return;

        const card =
            button.closest(".product");

        const id =
            Number(card.dataset.id);

        const product =
            products.find(
                product => product.id === id
            );

        const action =
            button.dataset.action;

        if (action === "add") {

            addToCart(product);

        } else if (action === "view") {

            showProduct(product);
        }
    }
);


// --------------------------------
// Cart
// --------------------------------

function addToCart(product) {

    const existing =
        cart.find(
            item => item.id === product.id
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    alert(`${product.name} added to cart`);
}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();
}


function updateCart() {

    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    document.getElementById("cartCount")
        .textContent = totalQuantity;

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <strong>${item.name}</strong>
            <br>
            ₹${item.price.toLocaleString()}
            × ${item.quantity}
        `;

        cartItems.appendChild(div);
    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    document.getElementById("cartTotal")
        .textContent =
        `₹${total.toLocaleString()}`;
}


// --------------------------------
// Product Modal
// --------------------------------

function showProduct(product) {

    const modal =
        document.getElementById("productModal");

    const content =
        document.getElementById("modalContent");

    content.innerHTML = `
        <div style="font-size:70px">
            ${product.emoji}
        </div>

        <h2>${product.name}</h2>

        <p>Category: ${product.category}</p>

        <p>Price:
            ₹${product.price.toLocaleString()}
        </p>

        <p>Rating: ⭐ ${product.rating}</p>

        <p>Stock: ${product.stock}</p>
    `;

    modal.classList.remove("hidden");
}


document.getElementById("closeModal")
    .addEventListener("click", () => {

        document.getElementById("productModal")
            .classList.add("hidden");

    });


// --------------------------------
// Cart panel
// --------------------------------

document.getElementById("cartBtn")
    .addEventListener("click", () => {

        document.getElementById("cartPanel")
            .classList.add("open");

    });


document.getElementById("closeCart")
    .addEventListener("click", () => {

        document.getElementById("cartPanel")
            .classList.remove("open");

    });


document.getElementById("clearCart")
    .addEventListener("click", () => {

        const confirmed =
            confirm("Clear the entire cart?");

        if (confirmed) {

            cart = [];

            saveCart();
        }
    });


// --------------------------------
// Dark Mode
// --------------------------------

document.getElementById("themeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "darkMode",
            isDark
        );
    });


if (
    localStorage.getItem("darkMode") === "true"
) {
    document.body.classList.add("dark");
}


// --------------------------------
// Clear filters
// --------------------------------

document.getElementById("clearBtn")
    .addEventListener("click", () => {

        searchInput.value = "";

        categorySelect.value = "all";

        sortSelect.value = "default";

        applyFilters();
    });


// --------------------------------
// BOM Examples
// --------------------------------

console.log("Browser width:", window.innerWidth);

console.log("Current URL:", location.href);

console.log("Online:", navigator.onLine);


// --------------------------------
// Initial UI
// --------------------------------

document.getElementById("totalProducts")
    .textContent = products.length;

displayProducts(products);

updateCart();