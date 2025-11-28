let cart = JSON.parse(localStorage.getItem('cart')) || {};

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalPrice = document.getElementById('totalPrice');
    
    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = 'Корзина пуста. <a href="catalog.html">Перейти в каталог</a>';
        cartTotal.style.display = 'none';
        return;
    }
    
    let html = '';
    let total = 0;
    
    for (const [productName, item] of Object.entries(cart)) {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${productName}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${productName}</div>
                    <div class="cart-item-price">${item.price} ₽ x ${item.qty}</div>
                    <div class="cart-item-total">${itemTotal} ₽</div>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn decrease" onclick="cartDecreaseQty('${productName}')">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn increase" onclick="cartIncreaseQty('${productName}')">+</button>
                </div>
            </div>
        `;
    }
    
    cartItems.innerHTML = html;
    totalPrice.textContent = total;
    cartTotal.style.display = 'block';
}

function cartIncreaseQty(productName) {
    if (!cart[productName]) {
        cart[productName] = { price: 0, qty: 0, image: '' };
    }
    cart[productName].qty++;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function cartDecreaseQty(productName) {
    if (cart[productName] && cart[productName].qty > 0) {
        cart[productName].qty--;
        if (cart[productName].qty === 0) {
            delete cart[productName];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function clearCart() {
    cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// ✅ НОВЫЕ ФУНКЦИИ ДЛЯ ОФОРМЛЕНИЯ ЗАКАЗА
function showOrderForm() {
    document.getElementById('orderModal').classList.remove('hidden');
}

function hideOrderForm() {
    document.getElementById('orderModal').classList.add('hidden');
    document.getElementById('orderForm').reset();
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const address = document.getElementById('deliveryAddress').value;
    const phone = document.getElementById('phoneNumber').value;
    
    if (address && phone) {
        hideOrderForm();
        document.getElementById('successModal').classList.remove('hidden');
    }
});

function completeOrder() {
    // Очищаем корзину после успешного заказа
    clearCart();
    document.getElementById('successModal').classList.add('hidden');
}

// Закрытие модальных окон по клику вне их
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === orderModal) {
        hideOrderForm();
    }
    if (event.target === successModal) {
        completeOrder();
    }
}

window.addEventListener('load', function() {
    setActiveMenu('cart.html');
    renderCart();
});
