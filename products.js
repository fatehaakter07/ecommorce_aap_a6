const categoryContainer = document.getElementById("categoryContainer");
const productContainer = document.getElementById("productContainer");

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");

let selectedProduct = null;

// =====================
// Load Categories
// =====================
fetch("https://fakestoreapi.com/products/categories")
  .then(res => res.json())
  .then(categories => {
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline btn-sm capitalize";
      btn.innerText = category;
      btn.onclick = () => loadProductsByCategory(category);
      categoryContainer.appendChild(btn);
    });
  });

// =====================
// Load Products by Category
// =====================
function loadProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(products => displayProducts(products));
}

// =====================
// Display Products
// =====================
function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm border";

    card.innerHTML = `
      <figure class="p-4">
        <img src="${product.image}" class="h-40 object-contain" />
      </figure>

      <div class="card-body p-4">
        <h2 class="card-title line-clamp-2">
          ${product.title}
        </h2>

        <p class="text-lg font-semibold">$${product.price}</p>

        <span class="badge badge-outline capitalize w-fit">
          ${product.category}
        </span>

        <p class="text-sm text-gray-500">
          ⭐ ${product.rating.rate}
        </p>

        <div class="card-actions mt-4 justify-between">
          <button class="btn btn-outline btn-sm" onclick="openModal(${product.id})">
            Details
          </button>
          <button class="btn btn-primary btn-sm" onclick='addToCart(${JSON.stringify(product)})'>
            Add to Cart
          </button>
        </div>
      </div>
    `;

    productContainer.appendChild(card);
  });
}

// =====================
// Modal Open
// =====================
function openModal(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      selectedProduct = product;

      modalImage.src = product.image;
      modalTitle.innerText = product.title;
      modalDescription.innerText = product.description;
      modalPrice.innerText = `$${product.price}`;
      modalRating.innerText = `⭐ ${product.rating.rate}`;

      modal.showModal();
    });
}

// =====================
// Cart Logic
// =====================
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart");
}

function addToCartFromModal() {
  if (selectedProduct) {
    addToCart(selectedProduct);
    modal.close();
  }
}

