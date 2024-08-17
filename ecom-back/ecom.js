async function fetchProducts() {
    const response = await fetch('http://localhost:5000/products');
    const products = await response.json();
    // Use products data to display in the frontend
}
fetchProducts();

async function submitCart() {
    const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: cart }),
    });
    const message = await response.text();
    alert(message);
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
    displayCart();
}

function displayCart() {
    const storedCart = localStorage.getItem('cart');
    const storedTotal = localStorage.getItem('total');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        total = parseFloat(storedTotal);
    }
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}
