document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

// Toggle Sidebar Menu
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

// Toggle Search Bar
function toggleSearch() {
    let searchBar = document.getElementById("search-bar");
    searchBar.style.display = searchBar.style.display === "block" ? "none" : "block";
}

// Load Products from JSON
async function loadProducts() {
    const response = await fetch("products.json"); // Ensure this file is correctly placed
    const data = await response.json();
    const sections = document.getElementById("product-sections");

    data.categories.forEach(category => {
        let section = document.createElement("div");
        section.classList.add("section");

        let header = document.createElement("div");
        header.classList.add("header");
        header.innerHTML = `<h2>${category.name}</h2>`;

        let container = document.createElement("div");
        container.classList.add("product-container");

        category.products.forEach(product => {
            let card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.discribtion}</p>
                <span class="price">$${product.price}</span>
                <br>
                <a href="#" class="buy-button">Buy Now</a>
            `;
            container.appendChild(card);
        });

        section.appendChild(header);
        section.appendChild(container);
        sections.appendChild(section);
    });
}
