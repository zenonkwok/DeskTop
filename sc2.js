document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            renderProducts(data.categories);
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function renderProducts(categories) {
    const container = document.getElementById("product-sections");
    container.innerHTML = "";

    categories.forEach(category => {
        let section = document.createElement("div");
        section.classList.add("section");
        section.innerHTML = `
            <div class="header">
                <h2>${category.name}</h2>
                <a href="#" class="view-all">View All</a>
            </div>
            <div class="container">
                ${category.products.map(product => `
                    <div class="item">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function toggleSearch() {
    const searchBar = document.getElementById("search-bar");
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
}
