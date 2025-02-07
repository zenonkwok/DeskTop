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

        data.categories.forEach((category, index) => {
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
            let id=product.id
            card.addEventListener('click', function() {
                localStorage.setItem('cardclicked', id); //id=localstorage.getItem('cardclicked')
                window.location.href = 'card.html';
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
