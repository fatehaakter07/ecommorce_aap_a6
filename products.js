const loadAllProducts = async () => {
    const url ="https://fakestoreapi.com/products";
    fetch(url)
    .then(res => res.json())
    .then(data => displayProducts(data));

}

const loadProductCategory =  (category) => {

    const url = `https://fakestoreapi.com/products/category/${category}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayProductCategory(data));

}

const displayProductCategory = (products) => {
    const productContainer = document.getElementById("product-containers");
    productContainer.innerHTML = "";    
    for (const product of products) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = ` <button id ="product-btn-${product.id}" 
                                  onclick =  "loadProductCategory('${product.category}') 
                          " class="btn btn-outline btn-primary lesson-btn"> 
                            ${product.category} </button>`;
        productContainer.appendChild(productDiv);
}
}


const displayProducts = (products) => {  
    
            const productContainer = document.getElementById("product-containers");
                  productContainer.innerHTML = "";

            for (const product of products) {

             const productDiv = document.createElement("div");

              productDiv.innerHTML = ` <button id ="product-btn-${product.id}" 
                                        onclick =  "loadProductCategory('${product.category}') 
                                " class="btn btn-outline btn-primary lesson-btn">
                                 ${product.category} </button>`;

              productContainer.appendChild(productDiv);
    
             }
 }
            



loadAllProducts();