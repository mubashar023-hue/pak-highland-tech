const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 2500,
 image:"images/earbuds.jpg" },
  {
    id: 2,
    name: "Kitchen Chopper",
    price: 1800
  },
  {
    id: 3,
    name: "Mobile Charger",
    price: 1200
  }
];

let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (product) {
    cart.push(product);
    updateCart();
  }
}

function updateCart() {
  const count = document.getElementById("cart-count");

  if (count) {
    count.textContent = cart.length;
  }
}

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    let message = "Assalam-o-Alaikum! I want to place an order:\n\n";

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Rs. ${item.price}\n`;
    });

    message += `\nTotal: Rs. ${total}`;
    message += "\n\nPlease confirm my order.";

    const phone = "923018317217";
    const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
function displayProducts() {
    const productList = document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>Price: Rs. ${product.price}</p>
               <img src="${product.image}" alt="${product.name}"> 
                <button onclick="addToCart(${product.id})">
                    Add to Cart
      </button>
            </div>
        `;
    });
}

displayProducts();
