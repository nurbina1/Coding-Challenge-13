// Grabbing the container element where products will be displayed
const productContainer = document.getElementById('product-container');

/**
 * fetchProducts - Function to fetch product data from the API
 */
function fetchProducts() {
  fetch('https://www.course-api.com/javascript-store-products')
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON data from the response
      return response.json();
    })
    .then((data) => {
      // If successful, call displayProducts with the data
      displayProducts(data);
    })
    .catch((error) => {
      // Log the error for debugging
      console.error('There was a problem with the fetch operation:', error);
      // Call displayErrorMessage to show a friendly error message on the page
      displayErrorMessage();
    });
}

/**
 * displayProducts - Function to dynamically display each product on the webpage
 */
function displayProducts(products) {
  // Clear out any existing content in the container
  productContainer.innerHTML = '';

  // Loop through each product and create an HTML structure for it
  products.forEach((product) => {
    // Destructure product data from API fields
    const { fields } = product;
    const { name, company, price, image } = fields;
    const imgUrl = image[0].url;

    // Create a new div element to represent each product item
    const productItem = document.createElement('div');
    productItem.classList.add('product-item'); // Add class for styling

    // Set up HTML for each product item using template literals
    productItem.innerHTML = `
      <img src="${imgUrl}" alt="${name}" class="product-image">
      <h2 class="product-name">${name}</h2>
      <p class="product-company">${company}</p>
      <p class="product-price">$${(price / 100).toFixed(2)}</p>
    `;

    // Append the product item to the main container on the page
    productContainer.appendChild(productItem);
  });
}

/**
 * displayErrorMessage - Function to display an error message on the page
 */
function displayErrorMessage() {
  // Clear out any existing content
  productContainer.innerHTML = '';

  // Display an error message in a styled div
  productContainer.innerHTML = `
    <div class="error-message">
      <p>Failed to load products. Please try again later.</p>
    </div>
  `;
}

// Automatically call fetchProducts to load products when the page loads
fetchProducts();
