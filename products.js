const categoryContainer = document.getElementById("categoryContainer");
const productContainer = document.getElementById("productContainer");

// Modal elements
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");

let selectedProduct = null;

/* =========================
   CATEGORY BUTTON HANDLER
========================= */
function setActiveButton(activeBtn) {
  const buttons = categoryContainer.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  activeBtn.classList.remove("btn-outline");
  activeBtn.classList.add("btn-primary");
}

/* =========================
   LOAD ALL PRODUCTS
========================= */
function loadAllProducts(btn = null) {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
      displayProducts(products);
      if (btn) setActiveButton(btn);
    });
}

/* =========================
   LOAD CATEGORIES
========================= */
fetch("https://fakestoreapi.com/products/categories")
  .then(res => res.json())
  .then(categories => {

    // ---- ALL BUTTON ----
    const allBtn = document.createElement("button");
    allBtn.className = "btn btn-primary btn-sm capitalize";
    allBtn.innerText = "All";
    allBtn.onclick = () => loadAllProducts(allBtn);
    categoryContainer.appendChild(allBtn);

    // ---- CATEGORY BUTTONS ----
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline btn-sm capitalize";
      btn.innerText = category;

      btn.onclick = () => {
        setActiveButton(btn);
        loadProductsByCategory(category);
      };

      categoryContainer.appendChild(btn);
    });
  });

/* =========================
   LOAD PRODUCTS BY CATEGORY
========================= */
function loadProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(products => displayProducts(products));
}

/* =========================
   DISPLAY PRODUCTS
========================= */
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
        <h2 class="card-title line-clamp-2">${product.title}</h2>

        <p class="text-lg font-semibold">$${product.price}</p>

        <span class="badge badge-outline capitalize w-fit">
          ${product.category}
        </span>

        <p class="text-sm text-gray-500">
          ⭐ ${product.rating.rate}
        </p>

        <div class="card-actions mt-4 justify-between">
          <button class="btn btn-outline btn-sm details-btn">
            Details
          </button>
          <button class="btn btn-primary btn-sm add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    // Events (BEST PRACTICE)
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(product.id);
    });

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(product);
    });

    productContainer.appendChild(card);
  });
}

/* =========================
   MODAL OPEN
========================= */
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

/* =========================
   CART LOGIC
========================= */
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

/* =========================
   INITIAL LOAD
========================= */
loadAllProducts();
