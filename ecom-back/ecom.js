let cart = [];
let total = 0;

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        // Use products data to display in the frontend
        console.log(products); // For example purposes
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Could not fetch products. Please try again later.');
    }
}

fetchProducts();

async function submitCart() {
    try {
        const response = await fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: cart }),
        });
        if (!response.ok) {
            throw new Error('Failed to submit cart');
        }
        const message = await response.text();
        alert(message);
    } catch (error) {
        console.error('Error submitting cart:', error);
        alert('Could not submit cart. Please try again later.');
    }
}

function addToCart(productName, price) {
    // Optional: Check if product is already in the cart
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        alert(`${productName} is already in the cart`);
        return;
    }

    cart.push({ name: productName, price: price });
    total += price;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
    displayCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
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

// Initialize cart and total from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedCart = localStorage.getItem('cart');
    const storedTotal = localStorage.getItem('total');
    cart = storedCart ? JSON.parse(storedCart) : [];
    total = storedTotal ? parseFloat(storedTotal) : 0;
    displayCart();
});
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 2000); // Remove popup after 2 seconds
}

// Function to add items to the cart
function addToCart(productName, productPrice, productImage) {
    // Show popup message
    showPopup(`${productName} added successfully!`);

    // Get cart items from local storage or create an empty array if none exist
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add new item to the cart
    cartItems.push({ name: productName, price: productPrice, image: productImage });

    // Save updated cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// 