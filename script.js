const SUPABASE_URL = "https://bjcjpmnafceabtxwmxcp.supabase.co";
NEXT_PUBLIC_SUPABASE_URL=https://bjcjpmnafceabtxwmxcp.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_9Gn0lqTp2Cb6SPHuG7SLCw_yhe56YS7
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
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
    },{
    id: 4,
    name: "Smart LED Light",
    price: 1500,
    image: "images/led-light.jpg"
},
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
            </div>
    `;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>Price: Rs. ${item.price}</p>
                </div>

                <div class="quantity-control">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <div>
                    <strong>Subtotal: Rs. ${subtotal}</strong>
                </div>
            </div>
        `;
    });

    cartHTML += `
            <div class="cart-total">
                <strong>Total: Rs. ${total}</strong>
            </div>

            <button onclick="checkoutWhatsApp()" class="checkout-btn">
                Order on WhatsApp
            </button>

            <button onclick="closeCart()" class="close-cart-btn">
                Continue Shopping
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", cartHTML);
}function displayProducts() {
  const productList = document.getElementById("product-list");

  if (!productList) return;

  productList.innerHTML = "";

  products.forEach((product) => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-price">Rs. ${product.price}</p>
          <button onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
    showCart();
}

function closeCart() {
    const cartBox = document.querySelector(".cart-box");

    if (cartBox) {
        cartBox.remove();
    }
}

function checkoutWhatsApp() {
    const cartBox = document.querySelector(".cart-box");
    const form = document.getElementById("checkout-form");

    if (cartBox) {
        cartBox.remove();
    }

    if (form) {
        form.classList.add("show");
    }
}

function closeCheckout() {
  const form = document.getElementById("checkout-form");

  if (form) {
    form.classList.remove("show");
  }
}

function submitWhatsAppOrder() {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("Please enter your name, mobile number and complete address.");
        return;
    }

  let message = "PAK HIGHLAND TECH\n";
message += "========================\n";
message += "NEW ORDER\n";
message += "========================\n\n";
message += "CUSTOMER DETAILS\n";
message += `Name: ${name}\n`;
message += `Mobile: ${phone}\n`;
message += `Address: ${address}\n\n`;

let total = 0;

cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    message += `${item.name}\n`;
    message += `Quantity: ${item.quantity}\n`;
    message += `Price: Rs. ${item.price}\n`;
    message += `Subtotal: Rs. ${subtotal}\n\n`;
});

message += "========================\n";
message += `TOTAL: Rs. ${total}\n`;
message += "========================\n\n";


message += "Please confirm my order.";
    const phoneNumber = "923018317217";

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}
/* =========================
   START STORE
========================= */

displayProducts();
updateCart();
