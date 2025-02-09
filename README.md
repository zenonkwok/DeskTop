# DeskTop
Integrated Studio Project
\S
Product Store
A fully functional Product Store web application that allows users to browse categories, view product details, manage their cart, and sign up for an account. The project focuses on dynamic content rendering using JSON, local storage for cart management, and basic API interaction for user registration and authentication.

Features
Home Page: Displays featured products categorized into sections (e.g., Deals, Mouse, Keyboard, etc.).
Product Categories: Dynamically loads products based on categories.
Product Details: Shows detailed information about a specific product when clicked.
Cart System:
Add products to the cart.
Adjust product quantity or remove items.
Cart data is saved using localStorage.
User Authentication:
Sign-up page to create a new user.
Login system that checks user credentials from the RestDB API.
Dynamic Search: A search bar to filter products by name.
Technologies Used
Frontend: HTML, CSS, JavaScript
API: RestDB for user authentication and data storage
Data Management: products.json for product details
Local Storage: For persistent cart data across sessions
Icons & Styling: Font Awesome for icons and modern responsive CSS
Project Structure
nginx
Copy
Edit
Product Store/
│
├── index.html          # Home page
├── category.html       # Category-specific product listing
├── itemdetail.html     # Product detail page
├── login.html          # User login page
├── signup.html         # User sign-up page
├── kart.html           # Shopping cart page
├── style.css           # Main CSS file
├── sc2.js              # JavaScript for functionality
├── products.json       # Sample product data
└── README.md           # Project documentation (this file)
Setup Instructions
1. Clone the repository:
bash
Copy
Edit
git clone https://github.com/yourusername/product-store.git
cd product-store
2. Open the project in a web browser:
No additional setup is required. Simply open index.html in a web browser to run the application.

3. Product Data (products.json):
Ensure that products.json is placed in the root directory.
The structure of the JSON file should follow this example:
json
Copy
Edit
{
  "categories": [
    {
      "name": "Mouse",
      "products": [
        {
          "id": 1,
          "name": "Wireless Mouse",
          "price": 25.99,
          "image": "mouse.jpg",
          "description": "A high-quality wireless mouse."
        }
      ]
    }
  ]
}
How It Works
Home Page (index.html):

Loads product categories dynamically from products.json.
Each category displays up to three products with a "View All" button linking to the full category page.
Category Page (category.html):

Displays all products in a specific category using URL parameters (?category=Mouse).
Product Detail Page (itemdetail.html):

Fetches and displays detailed information for a product using the id parameter (?id=1).
Cart Management (kart.html):

Add items to the cart.
Adjust quantity or remove items.
Displays total price and updates the cart in real-time.
User Registration & Login:

Sign up and log in using the RestDB API for storing user information.
Validates input fields before sending the data.
Future Improvements
Enhanced Security: Hash user passwords and validate data on the server side.
Pagination: Add pagination or infinite scroll for large product lists.
Advanced Search: Improve search functionality with filters (e.g., price range, rating).
Checkout Process: Integrate a secure checkout process with payment gateway support.
Mobile Responsiveness: Fully optimize for mobile devices.
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License. You are free to use, modify, and distribute this project