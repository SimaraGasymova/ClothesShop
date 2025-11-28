let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addFirstItem(productName, price) {
    const productCard = document.querySelector(`[data-product-name="${productName}"]`).closest('.product-card');
    const imagePath = productCard.dataset.productImage;
    
    if (!cart[productName]) {
        cart[productName] = { 
            price: price, 
            qty: 1,
            image: imagePath 
        };
        saveCart();
        showQtyControls(productName);
        updateQtyDisplay(productName);
    }
}

function showQtyControls(productName) {
    const controls = document.getElementById(`controls-${productName}`);
    const btn = controls.previousElementSibling;
    if (controls && btn) {
        controls.classList.remove('hidden');
        btn.style.display = 'none';
    }
}

function increaseQty(productName, price) {
    if (!cart[productName]) {
        const productCard = document.querySelector(`[data-product-name="${productName}"]`).closest('.product-card');
        const imagePath = productCard.dataset.productImage;
        cart[productName] = { price: price, qty: 0, image: imagePath };
    }
    cart[productName].qty++;
    saveCart();
    updateQtyDisplay(productName);
}

function decreaseQty(productName) {
    if (cart[productName] && cart[productName].qty > 0) {
        cart[productName].qty--;
        if (cart[productName].qty === 0) {
            delete cart[productName];
            hideQtyControls(productName);
        }
        saveCart();
        updateQtyDisplay(productName);
    }
}

function hideQtyControls(productName) {
    const controls = document.getElementById(`controls-${productName}`);
    const btn = controls.previousElementSibling;
    if (controls && btn) {
        controls.classList.add('hidden');
        btn.style.display = 'block';
    }
}

function updateQtyDisplay(productName) {
    const qtySpan = document.getElementById(`qty-${productName}`);
    if (qtySpan) {
        const qty = cart[productName] ? cart[productName].qty : 0;
        qtySpan.textContent = qty;
    }
}

window.addEventListener('load', function() {
    setActiveMenu('catalog.html');
    const allProducts = ['Футболка розовая варенка', 'Джинсы синие', 'Платье с оборками'];
    allProducts.forEach(productName => {
        updateQtyDisplay(productName);
        if (cart[productName] && cart[productName].qty > 0) {
            showQtyControls(productName);
        }
    });
});
