document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast-message show";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("show");
      toast.remove();
    }, 2500);
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = `${item.name} - $${item.price}`;

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "×";
      removeBtn.title = "Remove from cart";
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });

      li.appendChild(nameSpan);
      li.appendChild(removeBtn);
      cartItemsEl.appendChild(li);

      total += item.price;
    });

    cartTotalEl.textContent = total.toFixed(2);
  }

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.dataset.name.trim();
      const price = parseFloat(product.dataset.price);

      cart.push({ name, price });
      saveCart();
      renderCart();
      showToast(`Added "${name}" to cart`);
    });
  });

  document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Chuyển hướng hoặc xử lý thanh toán thật ở đây
    alert("Thank you for your purchase!");
    cart = [];
    saveCart();
    renderCart();
  });

  renderCart(); // Initial load
});