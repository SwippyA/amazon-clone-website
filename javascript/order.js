import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { d_option } from "../data/deleri_option.js";


function order_page(){
    let html='';

    html+=`  
              ${generateOrderHeader()}
              <div class="order-details-grid js_order">
              ${generateOrderDetails()}
              </div>
              
        `;

     document.querySelector('.js_date1').innerHTML=html;

}
order_page();




// Function to generate order header HTML
function generateOrderHeader() {
  let sum = 0;
  let sum1 = 0;

  cart.forEach((cartItem) => {
    const product = products.find((productItem) => productItem.id === cartItem.productid);

    if (product) {
      sum += ((product.priceCents / 100) * cartItem.quantity);
    }

    let product1;
    d_option.forEach((option) => {
      if (option.id === cartItem.d_opt) {
        product1 = option;
      }
    });

    sum1 += product1.shipping / 100;
  });

  let tax_before = sum + sum1;
  let tax = tax_before * 0.1;
  let after_tax = tax + tax_before;
  let date1 = dayjs();
  let now_date = date1.format('MMMM D');

  let order_header_html = `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${now_date}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${after_tax.toFixed(2)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
      </div>
    </div>
  `;

  return order_header_html;
}

// Function to generate order details HTML
function generateOrderDetails() {
  let order_html = '';

  cart.forEach((item) => {
    const productid = item.productid;
    const product = products.find((item2) => item2.id === productid);
    const date1 = item.d_opt;
    const mat_id = d_option.find((option) => option.id === date1);

    const date = dayjs();
    const add_date = date.add(mat_id.day_add, 'day');
    const now_date = add_date.format('MMMM D');

    let deliveryDate = now_date; // Replace with the actual delivery date based on the delivery option.

    order_html += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>
      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return order_html;
}

// Call the functions and update the HTML
// const orderHeader = generateOrderHeader();
// const orderDetails = generateOrderDetails();

