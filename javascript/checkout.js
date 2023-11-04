import { cart,remove_to_cart, updatethecart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { d_option } from "../data/deleri_option.js";

function rendercartsummy() {

  let cart_html = '';
  let i = 0;


  cart.forEach((item) => {
    const productid = item.productid;
    let match;

    products.forEach((item2) => {
      if (item2.id === productid) {
        match = item2;
        // console.log(match);
      }

    });

    let date1 = item.d_opt;
    let mat_id;
    d_option.forEach((option) => {
      if (option.id === date1) {
        mat_id = option;
      }
    });

    let date = dayjs();
    let add_date = date.add(mat_id.day_add, 'day');
    let now_date = add_date.format('dddd,MMMM D');
    cart_html += `<div class="cart-item-container js-${match.id}">
    <div class="delivery-date">
      Delivery date:   ${now_date}
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
        ${date_summy(item, match)}
        
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
      count_price();
      rendercartsummy();


      document.querySelector(`.js-${pro_id}`).remove();


    });
  });

  function date_summy(cart_item, product_item) {
    let match;
    let match1;
    let html = '';

    d_option.forEach((item) => {
      if (item.id === cart.d_opt) {
        match = item;
      }
      if (cart.productid === products.id) {
        match1 = products;
        //  let  match3=cart;


      }
      let date = dayjs();
      let add_date = date.add(item.day_add, 'day');
      let now_date = add_date.format('dddd,MMMM D');
      const check = cart_item.d_opt === item.id;
      html += `
      <div class="delivery-option  js_up " data-product-id="${product_item.id}" 
      data-da-id="${item.id}">
      <input type="radio"
        ${check ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${i}">
      <div>
        <div class="delivery-option-date js_order_date">
          ${now_date}
        </div>
        <div class="delivery-option-price">
         ${(item.shipping) / 100} Shipping
        </div>
      </div>
    </div>
      `;

    });
    return html;
  }




  document.querySelectorAll('.js_up').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, daId } = element.dataset;

      updatethecart(productId, daId);
      rendercartsummy();
      count_price();

    });
  });

  function count_price() {
    let sum = 0;
    let sum1 = 0;
    let sum2=0;
    let payment_html = '';


    cart.forEach((cartItem) => {
      // Find the corresponding product based on the product ID in the cart
      const product = products.find((productItem) => productItem.id === cartItem.productid);
      


      if (product) {
        sum += (((product.priceCents) / 100) * cartItem.quantity);
      }

      let product1;
      d_option.forEach((option) => {
        if (option.id === cartItem.d_opt) {
          product1 = option
        }

      });
      sum1 += product1.shipping / 100;
      sum2 += cartItem.quantity;
      console.log(sum2);
    });


    

    // console.log(sum1);
    let tax_before_ = sum + sum1;
    // console.log((tax_before_).toFixed(2));
    let tax = (tax_before_) * 0.1
    // console.log(tax.toFixed(2));
    let after_tax_ = tax + tax_before_;
    // console.log(after_tax_.toFixed(2));


    payment_html += `
        <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${sum2}):</div>
        <div class="payment-summary-money">$${sum.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${sum1.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${tax_before_.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${tax.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${after_tax_.toFixed(2)}</div>
      </div>

      <a href="orders.html"><button class="place-order-button button-primary js_placeorder">
      Place your order
       
      </button></a>
      
  
      `;

    return payment_html;


  }
  document.querySelector('.js-payment').innerHTML = count_price();


  // rendercartsummy();
  count_price();

  

}
rendercartsummy();



