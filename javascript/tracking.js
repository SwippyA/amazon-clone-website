import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { d_option } from "../data/deleri_option.js";

let html_track = '';

cart.forEach((item) => {
    let match; // Initialize 'match' for each cart item
    const pro_id = item.productid;

    // Find the product in the 'products' array based on the 'productid'
    const matchingProduct = products.find((product) => product.id === pro_id);

    if (matchingProduct) {
        match = matchingProduct;
    } else {
        // Handle the case where no matching product is found (optional)
        console.error(`Product with ID ${pro_id} not found.`);
        return;
    }

    let match2;

    const date1 = item.d_opt;

    // Find the delivery option in the 'd_option' array based on 'd_opt'
    const matchingDeliveryOption = d_option.find((option) => option.id === date1);

    if (matchingDeliveryOption) {
        match2 = matchingDeliveryOption;
    } else {
        // Handle the case where no matching delivery option is found (optional)
        console.error(`Delivery option with ID ${date1} not found.`);
        return;
    }

    const date = dayjs();
    const add_date = date.add(match2.day_add, 'day');
    const now_date = add_date.format('dddd, MMMM D');

    html_track += `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${now_date}
        </div>

        <div class="product-info">
          ${match.name}
        </div>

        <div class "product-info">
          Quantity: ${item.quantity}
        </div>

        <img class="product-image" src="${match.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
});

// Set the HTML content to the '.js-tracking' element
document.querySelector('.js-tracking').innerHTML = html_track;
