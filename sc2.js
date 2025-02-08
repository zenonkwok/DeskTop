document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

// Toggle Sidebar Menu
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

// Toggle Search Bar
function toggleSearch() {
    let searchBar = document.getElementById("search-bar");
    searchBar.classList.toggle("active");
}

// Load Products from JSON
async function loadProducts() {
    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to load products.");

        const data = await response.json();
        const sections = document.getElementById("product-sections");

        data.categories.forEach((category) => {
            let section = document.createElement("div");
            section.classList.add("section");

            // Header with View More Button
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

            // Display only the first 3 products (image + name only)
            category.products.slice(0, 3).forEach(product => {
                let card = document.createElement("div");
                card.classList.add("product-card");
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                `;

                card.addEventListener('click', () => {
                    localStorage.setItem('cardclicked', product .id); // Save product ID to localStorage
                    window.location.href = 'itemdetail.html'; // Navigate to card.html
                });

                container.appendChild(card);
            });

            section.appendChild(headerContainer);
            section.appendChild(container);
            sections.appendChild(section);
        });
    } catch (error) {
        console.error("Error loading products:", error);

        const sections = document.getElementById("product-sections");
        sections.innerHTML = `<p style="color: red;">Failed to load products. Please try again later.</p>`;
    }
    category.products.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
        `;
    
        // Redirect to itemdetail.html with product id in the URL
        card.addEventListener('click', () => {
            window.location.href = `itemdetail.html?id=${product.id}`;  // Pass product id as query parameter
        });
    
        container.appendChild(card);
    });
}

// Call the function to load products
loadProducts();


document.addEventListener('DOMContentLoaded', async () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.querySelector('.product-detail').innerHTML = '<p>Product not found.</p>';
        return;
    }

    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error("Failed to load product data.");

        const data = await response.json();
        let product = null;

        // Search for the product by ID in all categories
        for (const category of data.categories) {
            product = category.products.find(p => p.id == productId);
            if (product) break;
        }

        if (product) {
            // Populate the HTML with product details
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `Price: $${product.price}`;
            document.getElementById('product-description').textContent = product.description || product.discribtion;

            document.getElementById('add-to-cart').addEventListener('click', () => {
                alert(`${product.name} has been added to your cart!`);
                // Add cart functionality here
            });
        } else {
            document.querySelector('.product-detail').innerHTML = '<p>Product not found.</p>';
        }
    } catch (error) {
        console.error("Error loading product details:", error);
        document.querySelector('.product-detail').innerHTML = '<p>Error loading product details. Please try again later.</p>';
    }
});

