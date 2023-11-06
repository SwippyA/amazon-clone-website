import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { d_option } from "../data/deleri_option.js";









function order_page() {
  let html = '';

  html += `  
              ${generateOrderHeader()}
              <div class="order-details-grid js_order">
              ${generateOrderDetails()}
              </div>
              
        `;

  document.querySelector('.js_date1').innerHTML = html;
  

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
function order_qu() {
  let i = 0;
  cart.forEach((cartItem) => {
    const product = products.find((productItem) => productItem.id === cartItem.productid);
    i += cartItem.quantity;
    // console.log(i);
  });
  return i;
}
document.querySelector('.cart-quantity').innerHTML = order_qu();



let cart1_order;


if (cart1_order !== cart) {
  cart1_order = JSON.parse(localStorage.getItem('cart1'))
  localStorage.setItem('cart2', JSON.stringify(cart1_order));
  cart1_order = JSON.parse(localStorage.getItem('cart2'))

  console.log(cart1_order);
  console.log(cart);
}

else{
  let cart1 = cart;
  localStorage.setItem('cart1', JSON.stringify(cart1));
  cart1 = null;
}
  
  

 



let html_last_order = '';

html_last_order += `

          ${last_order_head(cart1_order)}
          ${last_order_info(cart1_order)};
    `;
document.querySelector('.js_last_order').innerHTML = html_last_order;







function last_order_head(cart1_order) {
  let sum = 0;
  let sum1 = 0;

  cart1_order.forEach((cartItem) => {

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
  let html_last_order_head = '';

  // let after_tax = tax + tax_before;
  let date1 = dayjs();
  let now_date = date1.format('MMMM D');

  html_last_order_head += `
        <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${now_date}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${(after_tax).toFixed(2)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
        </div>
      </div>
        
  `;
  return html_last_order_head;
}

function last_order_info(cart1_order) {
  let html_last_order_info = '';



  let shubham;
  let shubham1;

  cart1_order.forEach((item) => {

    products.forEach((item2) => {
      if (item.productid === item2.id) {
        shubham = item2;
        shubham1 = item;
      }


    });

    const productid = item.productid;
    const product = products.find((item2) => item2.id === productid);
    const date1 = item.d_opt;
    const mat_id = d_option.find((option) => option.id === date1);

    const date = dayjs();
    const add_date = date.add(mat_id.day_add, 'day');
    const now_date = add_date.format('MMMM D');
    html_last_order_info += `
  
  <div class="order-details-grid ">
            <div class="product-image-container">
              <img src="${shubham.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${shubham.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${now_date}
              </div>
              <div class="product-quantity">
                Quantity: ${shubham1.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary js-bu" data-product-id="${shubham.id}">
                  Track package
                </button>
              </a>
            </div>
          </div>

  `;


  });


  return html_last_order_info;
}
