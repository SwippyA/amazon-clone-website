import {cart,remove_to_cart,updatethecart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { d_option } from "../data/deleri_option.js";


 
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

  let date1 =item.d_opt;
  let mat_id;
  d_option.forEach((option) =>{
    if(option.id===date1){
      mat_id=option;
    }
  });

      let date = dayjs();
      let add_date=date.add(mat_id.day_add,'day');
      let now_date= add_date.format('dddd,MMMM D');
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
        ${date_summy(item)}
        
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

 export function date_summy(cart_item){
  let match ;
  let match1 ;
  let html='';

  d_option.forEach((item)=>{
    if(item.id===cart.d_opt){
      match=item;
    }
  if(cart.productid===products.id){
        match1=products;
      //  let  match3=cart;

        
      }    
      let date = dayjs();
      let add_date=date.add(item.day_add,'day');
      let now_date= add_date.format('dddd,MMMM D');
      const check =cart_item.d_opt===item.id;
      html +=`
      <div class="delivery-option  js_up " data-product-id="${match1.id}" 
      data-da-id="${item.id}">
      <input type="radio"
        ${check ? 'checked':'' }
        class="delivery-option-input"
        name="delivery-option-${i}">
      <div>
        <div class="delivery-option-date">
          ${now_date}
        </div>
        <div class="delivery-option-price">
         ${(item.shipping)/100} Shipping
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
    
  });
});


