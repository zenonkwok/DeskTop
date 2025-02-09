function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
}

// Enable horizontal scroll using mouse wheel
const containers = document.querySelectorAll(".container");

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("product-sections")) {
        loadProducts();
    } else if (document.querySelector(".product-detail")) {
        loadProductDetails();
    } else if (document.querySelector(".product-grid")) {
        loadCategoryPage();
    }
    loadCart();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products on the main page
async function loadProducts() {
    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to load products.");

        const data = await response.json();
        const sections = document.getElementById("product-sections");
        sections.innerHTML = ""; 

        data.categories.forEach(category => {
            let section = createSection(category);
            sections.appendChild(section);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Create a product section
function createSection(category) {
    let section = document.createElement("div");
    section.classList.add("section");

    let headerContainer = document.createElement("div");
    headerContainer.classList.add("header-container");

    let header = document.createElement("h2");
    header.innerText = category.name;

    let viewMoreBtn = document.createElement("a");
    viewMoreBtn.classList.add("view-more-button");
    viewMoreBtn.innerText = "View All →";
    viewMoreBtn.href = `category.html?category=${encodeURIComponent(category.name)}`;

    headerContainer.appendChild(header);
    headerContainer.appendChild(viewMoreBtn);

    let container = document.createElement("div");
    container.classList.add("product-container");

    category.products.slice(0, 3).forEach(product => {
        let card = createProductCard(product);
        container.appendChild(card);
    });

    section.appendChild(headerContainer);
    section.appendChild(container);
    return section;
}

// Create a product card
function createProductCard(product) {
    let card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price.toFixed(2)}</p>
    `;
    card.addEventListener('click', () => {
        window.location.href = `itemdetail.html?id=${product.id}`;
    });
    return card;
}

// Load product details
async function loadProductDetails() {
    const productDetailContainer = document.querySelector('.product-detail');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        productDetailContainer.innerHTML = '<p>Product not found.</p>';
        return;
    }

    try {
        const response = await fetch("products.json");
        const data = await response.json();

        let product = findProductById(data.categories, productId);

        if (product) {
            displayProductDetails(product);
        } else {
            productDetailContainer.innerHTML = '<p>Product not found.</p>';
        }
    } catch (error) {
        console.error("Error loading product details:", error);
    }
}

// Find a product by ID
function findProductById(categories, productId) {
    for (const category of categories) {
        const product = category.products.find(p => p.id == productId);
        if (product) return product;
    }
    return null;
}

// Display product details
function displayProductDetails(product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `Price: $${product.price.toFixed(2)}`;
    document.getElementById("product-description").textContent = product.description || "No description available.";

    document.getElementById("add-to-cart").addEventListener("click", () => {
        addProductToCart(product);
        alert(`${product.name} has been added to your cart!`);
    });
}

// Load category page
async function loadCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    if (!categoryName) {
        document.querySelector('.category-title').textContent = "Category not specified.";
        return;
    }

    try {
        const response = await fetch("products.json");
        const data = await response.json();
        const categoryData = data.categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());

        if (categoryData) {
            displayCategoryProducts(categoryData);
        } else {
            document.querySelector('.category-title').textContent = "Category Not Found";
        }
    } catch (error) {
        console.error("Error loading category products:", error);
    }
}

// Display products in the category
function displayCategoryProducts(categoryData) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; 

    categoryData.products.forEach(product => {
        let productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });

    document.querySelector('.category-title').textContent = categoryData.name;
}

// Load cart and render it on page load
function loadCart() {
    renderCart();
}

// Add product to cart
function addProductToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateLocalStorage();
    renderCart();
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = ''; 

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = `Total: $0.00`;
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.appendChild(createCartItem(item));
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Create cart item element
function createCartItem(item) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="remove-item-btn" onclick="removeProduct(${item.id})">Remove</button>
    `;
    return cartItem;
}

// Update product quantity
function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (!product) return;

    product.quantity += change;
    if (product.quantity <= 0) removeProduct(productId);

    updateLocalStorage();
    renderCart();
}

// Remove product from cart
function removeProduct(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateLocalStorage();
    renderCart();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
