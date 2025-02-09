function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function toggleSearch() {
    let searchBar = document.getElementById("search-bar");
    searchBar.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to load products.");

        const data = await response.json();
        console.log("Products Loaded:", data);

        const sections = document.getElementById("product-sections");
        if (!sections) {
            console.error("Error: #product-sections not found in the DOM.");
            return;
        }
        
        sections.innerHTML = ""; // Clear existing content
        
        data.categories.forEach((category) => {
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
                let card = document.createElement("div");
                card.classList.add("product-card");
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                `;

                card.addEventListener('click', () => {
                    window.location.href = `itemdetail.html?id=${product.id}`;
                });

                container.appendChild(card);
            });

            section.appendChild(headerContainer);
            section.appendChild(container);
            sections.appendChild(section);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Load product details if available
async function loadProductDetails() {
    const productDetailContainer = document.querySelector('.product-detail');
    if (!productDetailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        productDetailContainer.innerHTML = '<p>Product not found.</p>';
        return;
    }

    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to load product data.");

        const data = await response.json();
        let product = null;

        for (const category of data.categories) {
            product = category.products.find(p => p.id == productId);
            if (product) break;
        }

        if (product) {
            const productImage = document.getElementById("product-image");
            const productName = document.getElementById("product-name");
            const productPrice = document.getElementById("product-price");
            const productDescription = document.getElementById("product-description");
            const addToCart = document.getElementById("add-to-cart");

            if (!productImage || !productName || !productPrice || !productDescription || !addToCart) {
                console.error("Error: One or more product detail elements not found in the DOM.");
                return;
            }

            productImage.src = product.image;
            productName.textContent = product.name;
            productPrice.textContent = `Price: $${product.price}`;
            productDescription.textContent = product.description || "No description available.";

            addToCart.addEventListener("click", () => {
                alert(`${product.name} has been added to your cart!`);
            });
        } else {
            productDetailContainer.innerHTML = '<p>Product not found.</p>';
        }
    } catch (error) {
        console.error("Error loading product details:", error);
        productDetailContainer.innerHTML = '<p>Error loading product details. Please try again later.</p>';
    }
}

document.addEventListener("DOMContentLoaded", loadProductDetails);

async function loadCategoryProducts() {
    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to load products.");

        const data = await response.json();
        const category = "Keyboard";  // Set the current category name
        const productGrid = document.querySelector(".product-grid");

        const categoryData = data.categories.find(cat => cat.name === category);
        if (!categoryData) {
            productGrid.innerHTML = "<p>No products found in this category.</p>";
            return;
        }

        categoryData.products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
            `;

            productGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error loading category products:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadCategoryProducts);
