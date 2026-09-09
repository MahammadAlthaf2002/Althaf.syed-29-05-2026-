// =====================================================
// 1. CREATING ARRAYS
// =====================================================

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        category: "Electronics",
        stock: 5,
        details: {
            brand: "Dell",
            color: "Black"
        }
    },

    {
        id: 2,
        name: "Phone",
        price: 20000,
        category: "Electronics",
        stock: 10,
        details: {
            brand: "Samsung",
            color: "Blue"
        }
    },

    {
        id: 3,
        name: "Shoes",
        price: 3000,
        category: "Fashion",
        stock: 0,
        details: {
            brand: "Nike",
            color: "White"
        }
    },

    {
        id: 4,
        name: "Watch",
        price: 5000,
        category: "Fashion",
        stock: 7,
        details: {
            brand: "Titan",
            color: "Black"
        }
    },

    {
        id: 5,
        name: "Tablet",
        price: 15000,
        category: "Electronics",
        stock: 3,
        details: {
            brand: "Apple",
            color: "Silver"
        }
    }
];


// =====================================================
// 2. CREATING AN ARRAY
// =====================================================

const categories = [
    "Electronics",
    "Fashion",
    "Home"
];


// =====================================================
// 3. ACCESSING ARRAYS
// =====================================================

console.log("First product:", products[0]);

console.log("First product name:", products[0].name);

console.log("Second product:", products[1]);


// =====================================================
// 4. ADDING ELEMENTS
// =====================================================

categories.push("Sports");

console.log("After push:", categories);


// =====================================================
// 5. REMOVING ELEMENTS
// =====================================================

categories.pop();

console.log("After pop:", categories);


// =====================================================
// 6. UNSHIFT
// =====================================================

categories.unshift("Beauty");

console.log("After unshift:", categories);


// =====================================================
// 7. SHIFT
// =====================================================

categories.shift();

console.log("After shift:", categories);


// =====================================================
// 8. SEARCHING - includes()
// =====================================================

console.log(
    "Electronics exists:",
    categories.includes("Electronics")
);


// =====================================================
// 9. FIND()
// =====================================================

const foundProduct = products.find(
    product => product.name === "Watch"
);

console.log("Found product:", foundProduct);


// =====================================================
// 10. FINDINDEX()
// =====================================================

const productIndex = products.findIndex(
    product => product.name === "Watch"
);

console.log("Watch index:", productIndex);


// =====================================================
// 11. FILTER()
// =====================================================

const electronics = products.filter(
    product => product.category === "Electronics"
);

console.log("Electronics:", electronics);


// =====================================================
// 12. FILTER AVAILABLE PRODUCTS
// =====================================================

const availableProducts = products.filter(
    product => product.stock > 0
);

console.log(
    "Available products:",
    availableProducts
);


// =====================================================
// 13. MAP()
// =====================================================

const productNames = products.map(
    product => product.name
);

console.log("Product names:", productNames);


// =====================================================
// 14. MAP() - MODIFY DATA
// =====================================================

const productWithTax = products.map(
    product => ({
        ...product,
        priceWithTax: product.price * 1.18
    })
);

console.log("Products with tax:", productWithTax);


// =====================================================
// 15. REDUCE()
// =====================================================

const totalValue = products.reduce(
    (total, product) => {
        return total + product.price;
    },
    0
);

console.log("Total price:", totalValue);


// =====================================================
// 16. REDUCE() - TOTAL STOCK
// =====================================================

const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
);

console.log("Total stock:", totalStock);


// =====================================================
// 17. SOME()
// =====================================================

const hasOutOfStock = products.some(
    product => product.stock === 0
);

console.log(
    "Any product out of stock:",
    hasOutOfStock
);


// =====================================================
// 18. EVERY()
// =====================================================

const allProductsHavePrice = products.every(
    product => product.price > 0
);

console.log(
    "Every product has price:",
    allProductsHavePrice
);


// =====================================================
// 19. FOREACH()
// =====================================================

products.forEach(product => {
    console.log(
        product.name,
        product.price
    );
});


// =====================================================
// 20. SORT()
// =====================================================

const sortedProducts = [...products].sort(
    (a, b) => a.price - b.price
);

console.log(
    "Low to high:",
    sortedProducts
);


// =====================================================
// 21. SORT HIGH TO LOW
// =====================================================

const highToLow = [...products].sort(
    (a, b) => b.price - a.price
);

console.log(
    "High to low:",
    highToLow
);


// =====================================================
// 22. JOIN()
// =====================================================

const names = products.map(
    product => product.name
);

const namesString = names.join(", ");

console.log(
    "Product names:",
    namesString
);


// =====================================================
// 23. FLATTENING ARRAYS
// =====================================================

const nestedCategories = [
    ["Electronics", "Mobile"],
    ["Fashion", "Shoes"],
    ["Home", "Furniture"]
];

const flatCategories =
    nestedCategories.flat();

console.log(
    "Flattened:",
    flatCategories
);


// =====================================================
// 24. REMOVE DUPLICATES
// =====================================================

const duplicateCategories = [
    "Electronics",
    "Fashion",
    "Electronics",
    "Home",
    "Fashion",
    "Home"
];

const uniqueCategories = [
    ...new Set(duplicateCategories)
];

console.log(
    "Unique categories:",
    uniqueCategories
);


// =====================================================
// 25. CREATING OBJECT
// =====================================================

const user = {
    name: "Althaf",
    age: 25,
    role: "Developer"
};

console.log("User:", user);


// =====================================================
// 26. ACCESSING OBJECT PROPERTIES
// =====================================================

console.log("User name:", user.name);

console.log("User age:", user.age);


// =====================================================
// 27. UPDATING OBJECT PROPERTY
// =====================================================

user.age = 26;

console.log(
    "Updated age:",
    user.age
);


// =====================================================
// 28. ADDING OBJECT PROPERTY
// =====================================================

user.city = "Anantapur";

console.log(
    "Updated user:",
    user
);


// =====================================================
// 29. NESTED OBJECT
// =====================================================

console.log(
    "Laptop brand:",
    products[0].details.brand
);

console.log(
    "Laptop color:",
    products[0].details.color
);


// =====================================================
// 30. OBJECT METHOD
// =====================================================

const customer = {

    name: "Althaf",

    greet() {
        return `Hello ${this.name}`;
    }
};

console.log(
    customer.greet()
);


// =====================================================
// 31. OBJECT.KEYS()
// =====================================================

const userKeys = Object.keys(user);

console.log(
    "Object keys:",
    userKeys
);


// =====================================================
// 32. OBJECT.VALUES()
// =====================================================

const userValues = Object.values(user);

console.log(
    "Object values:",
    userValues
);


// =====================================================
// 33. OBJECT.ENTRIES()
// =====================================================

const userEntries = Object.entries(user);

console.log(
    "Object entries:",
    userEntries
);


// =====================================================
// 34. SHALLOW COPY
// =====================================================

const shallowCopy = {
    ...products[0]
};

console.log(
    "Shallow copy:",
    shallowCopy
);


// =====================================================
// 35. DEEP COPY
// =====================================================

const deepCopy =
    structuredClone(products[0]);

deepCopy.details.brand = "HP";

console.log(
    "Original:",
    products[0]
);

console.log(
    "Deep copy:",
    deepCopy
);


// =====================================================
// 36. DESTRUCTURING
// =====================================================

const firstProduct = products[0];

const {
    name,
    price,
    category
} = firstProduct;

console.log("Name:", name);
console.log("Price:", price);
console.log("Category:", category);


// =====================================================
// 37. NESTED DESTRUCTURING
// =====================================================

const {
    details: {
        brand,
        color
    }
} = firstProduct;

console.log("Brand:", brand);
console.log("Color:", color);


// =====================================================
// 38. SPREAD OPERATOR
// =====================================================

const newProduct = {
    ...products[0],
    name: "Gaming Laptop",
    price: 70000
};

console.log(
    "New product:",
    newProduct
);


// =====================================================
// 39. SPREAD ARRAY
// =====================================================

const moreProducts = [
    ...products,
    {
        id: 6,
        name: "Headphones",
        price: 3000,
        category: "Electronics",
        stock: 8
    }
];

console.log(
    "More products:",
    moreProducts
);


// =====================================================
// 40. REST OPERATOR
// =====================================================

function calculateTotal(...prices) {

    return prices.reduce(
        (total, price) =>
            total + price,
        0
    );
}

console.log(
    "Total:",
    calculateTotal(
        1000,
        2000,
        3000
    )
);


// =====================================================
// 41. OPTIONAL CHAINING
// =====================================================

const productBrand =
    products[0]?.details?.brand;

console.log(
    "Brand:",
    productBrand
);


// =====================================================
// 42. NULLISH COALESCING
// =====================================================

const productColor =
    products[0]?.details?.color ?? "Unknown";

console.log(
    "Color:",
    productColor
);


// =====================================================
// 43. NULLISH COALESCING WITH MISSING DATA
// =====================================================

const discount =
    products[0].discount ?? 0;

console.log(
    "Discount:",
    discount
);


// =====================================================
// DOM ELEMENTS
// =====================================================

const productContainer =
    document.getElementById(
        "productContainer"
    );

const totalProductsElement =
    document.getElementById(
        "totalProducts"
    );

const totalValueElement =
    document.getElementById(
        "totalValue"
    );

const availableProductsElement =
    document.getElementById(
        "availableProducts"
    );

const outOfStockElement =
    document.getElementById(
        "outOfStock"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );

const sortSelect =
    document.getElementById(
        "sortSelect"
    );


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(productList) {

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.className =
            "product";

        const stockText =
            product.stock > 0
                ? `Available: ${product.stock}`
                : "Out of Stock";

        const stockClass =
            product.stock > 0
                ? "available"
                : "out";

        productCard.innerHTML = `

            <h3>${product.name}</h3>

            <p>
                Category:
                ${product.category}
            </p>

            <p>
                Brand:
                ${product.details?.brand ?? "Unknown"}
            </p>

            <p>
                Color:
                ${product.details?.color ?? "Unknown"}
            </p>

            <p class="price">
                ₹${product.price.toLocaleString()}
            </p>

            <p class="${stockClass}">
                ${stockText}
            </p>

        `;

        productContainer.appendChild(
            productCard
        );
    });
}


// =====================================================
// UPDATE STATISTICS
// =====================================================

function updateStatistics(productList) {

    const total =
        productList.length;

    const value =
        productList.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );

    const available =
        productList.filter(
            product => product.stock > 0
        ).length;

    const outOfStock =
        productList.filter(
            product => product.stock === 0
        ).length;


    totalProductsElement.textContent =
        total;

    totalValueElement.textContent =
        `₹${value.toLocaleString()}`;

    availableProductsElement.textContent =
        available;

    outOfStockElement.textContent =
        outOfStock;
}


// =====================================================
// FILTER + SEARCH + SORT
// =====================================================

function updateProducts() {

    let result = [...products];


    // SEARCH

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    if (searchText !== "") {

        result = result.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchText)
        );
    }


    // CATEGORY FILTER

    const selectedCategory =
        categoryFilter.value;

    if (selectedCategory !== "all") {

        result = result.filter(
            product =>
                product.category ===
                selectedCategory
        );
    }


    // SORT

    const sortValue =
        sortSelect.value;

    if (sortValue === "priceLow") {

        result.sort(
            (a, b) =>
                a.price - b.price
        );
    }

    else if (sortValue === "priceHigh") {

        result.sort(
            (a, b) =>
                b.price - a.price
        );
    }

    else if (sortValue === "name") {

        result.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );
    }


    displayProducts(result);

    updateStatistics(result);
}


// =====================================================
// EVENTS
// =====================================================

searchInput.addEventListener(
    "input",
    updateProducts
);

categoryFilter.addEventListener(
    "change",
    updateProducts
);

sortSelect.addEventListener(
    "change",
    updateProducts
);


// =====================================================
// INITIAL DISPLAY
// =====================================================

displayProducts(products);

updateStatistics(products);