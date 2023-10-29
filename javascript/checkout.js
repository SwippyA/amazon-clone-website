import { cart, remove_to_cart } from "../data/cart.js";
import { products } from "../data/products.js";

let cart_html = '';
let i = 0;


cart.forEach((item) => {
  const productid = item.productid;
  let match;

  products.forEach((item2) => {
    if (item2.id === productid) {
      match = item2;
      console.log(match);
    }

  });
  cart_html += `<div class="cart-item-container js-${match.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${match.image}">

      <div class="cart-item-details">
        <div class="product-name">
         ${match.name}
        </div>
        <div class="product-price">
          $${(match.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary" data-product-id="${match.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${i}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${i}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${i}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;


  i++;
});
// console.log(cart_html);
document.querySelector('.js-cart-html').innerHTML = cart_html;

document.querySelectorAll('.link-primary').forEach((link) => {
  link.addEventListener('click', () => {
    const pro_id = link.dataset.productId;
    // console.log(pro_id);
    remove_to_cart(pro_id);

    document.querySelector(`.js-${pro_id}`).remove();


  });
});

