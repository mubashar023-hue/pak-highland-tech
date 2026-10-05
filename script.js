const products = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 2500,
        image: "images/earbuds.jpg"
    },
    {
        id: 2,
        name: "Kitchen Chopper",
        price: 1800,
        image: "images/chopper.jpg"
    },
    {
        id: 3,
        name: "Mobile Charger",
        price: 1200,
        image: "images/charger.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem("pakHighlandCart")) || [];


/* =========================
   CART FUNCTIONS
========================= */

function saveCart() {
    localStorage.setItem("pakHighlandCart", JSON.stringify(cart));
    updateCart();
}


function addToCart(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    alert(product.name + " has been added to your cart.");
}


function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += 1;
        saveCart();
        showCart();
    }
}


function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    saveCart();
    showCart();
}


function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);

    saveCart();
    showCart();
}


function updateCart() {
    const count = document.getElementById("cart-count");

    if (count) {
        const totalItems = cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        count.textContent = totalItems;
    }
}


/* =========================
   SHOW CART
========================= */

function showCart() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    let cartHTML = `
        <div class="cart-box">
            <div class="cart-header">
                <h2>Shopping Cart</h2>
                <button onclick="closeCart()">×</button>
            </div>
    `;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">
                    <h3>${item.name}</h3>

                    <p>Rs. ${item.price}</p>

                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${item.id})">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>

                    <strong>
                        Rs. ${itemTotal}
                    </strong>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });


    cartHTML += `
            <div class="cart-total">
                <h3>Total: Rs. ${total}</h3>

                <button
                    class="checkout-button"
                    onclick="placeWhatsAppOrder()">
                    Order on WhatsApp
                </button>

                <button
                    class="continue-button"
                    onclick="closeCart()">
                    Continue Shopping
                </button>
            </div>
        </div>
    `;


    let overlay = document.getElementById("cart-overlay");

    if (!overlay) {

        overlay = document.createElement("div");

        overlay.id = "cart-overlay";

        document.body.appendChild(overlay);
    }

    overlay.innerHTML = cartHTML;

    overlay.style.display = "flex";
}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    const overlay = document.getElementById("cart-overlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}


/* =========================
   WHATSAPP ORDER
========================= */

function placeWhatsAppOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    let message =
        "Assalam-o-Alaikum! I want to place an order:\n\n";


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            `${index + 1}. ${item.name}\n` +
            `Quantity: ${item.quantity}\n` +
            `Price: Rs. ${item.price}\n` +
            `Subtotal: Rs. ${itemTotal}\n\n`;
    });


    message += `Total: Rs. ${total}\n\n`;
    message += "Please confirm my order.";


    const phone = "923018317217";

    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);


    window.open(url, "_blank");
}


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts() {

    const productList =
        document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = "";


    products.forEach(product => {

        productList.innerHTML += `
            <div class="product-card">

                <h3>${product.name}</h3>

                <p>Price: Rs. ${product.price}</p>

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <button
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}


/* =========================
   CART STYLE
========================= */

const cartStyle = document.createElement("style");

cartStyle.textContent = `

#cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: none;
    justify-content: center;
    align-items: center;
    padding: 20px;
    z-index: 9999;
}

.cart-box {
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.25);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 12px;
    margin-bottom: 15px;
}

.cart-header h2 {
    margin: 0;
    font-size: 24px;
}

.cart-header button {
    border: none;
    background: transparent;
    font-size: 30px;
    cursor: pointer;
}

.cart-item {
    display: flex;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid #eeeeee;
}

.cart-item img {
    width: 85px;
    height: 85px;
    object-fit: contain;
    border-radius: 10px;
    background: #f7f7f7;
}

.cart-info {
    flex: 1;
}

.cart-info h3 {
    margin: 0 0 5px;
    font-size: 17px;
}

.cart-info p {
    margin: 4px 0;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 8px 0;
}

.quantity-controls button {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: #0b5ed7;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.quantity-controls span {
    font-weight: 600;
}

.remove-item {
    border: none;
    background: transparent;
    color: #d00000;
    cursor: pointer;
    padding: 5px 0;
}

.cart-total {
    padding-top: 18px;
}

.cart-total h3 {
    font-size: 21px;
    margin-bottom: 15px;
}

.checkout-button,
.continue-button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
}

.checkout-button {
    background: #0b5ed7;
    color: white;
}

.continue-button {
    background: #eeeeee;
    color: #222222;
}

@media (max-width: 500px) {

    #cart-overlay {
        padding: 10px;
    }

    .cart-box {
        max-height: 94vh;
        padding: 16px;
        border-radius: 16px;
    }

    .cart-item img {
        width: 70px;
        height: 70px;
    }

    .cart-header h2 {
        font-size: 21px;
    }
}

`;

document.head.appendChild(cartStyle);


/* =========================
   START STORE
========================= */

displayProducts();
updateCart();
