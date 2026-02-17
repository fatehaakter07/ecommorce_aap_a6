const loadAllProducts = async () => {
    const url ="https://fakestoreapi.com/products";
    fetch(url)
    .then(res => res.json())
    .then(data => displayProducts(data));

}

const displayProducts = products => {
    const allProducts = document.getElementById('all-products');    
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${product.image}" alt="Shoes" class="rounded-xl w-full h-48 object-contain" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${product.title}</h2>
                    <p>$${product.price}</p>
                    <div class="card-actions">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        allProducts.appendChild(div);
    });
}


loadAllProducts();