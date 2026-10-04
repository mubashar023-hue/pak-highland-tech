const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 2500
  },
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

  alert("Total: Rs. " + total);
}
