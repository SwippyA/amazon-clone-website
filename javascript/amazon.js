// import {cart} from '../data/cart';
// import {products} from '../data/products';





let productHtml ='';

products.forEach((product)=>{
    productHtml += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
     ${product.name}
    </div>

    <div class="product-rating-container">
    <img class="product-rating-stars"
    src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
      ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button js-button button-primary" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;

});
document.querySelector('.js-product-grid').innerHTML= productHtml;

document.querySelectorAll('.js-button').forEach((button) => {
    button.addEventListener('click',()=>{
         const product_id= button.dataset.productId;
        //  console.log(product_id);
         let match;
        cart.forEach((item) => {
            if(product_id === item.productid){
                match=item;
            }

        });
        if(match){
            match.quantity += 1;
        }
        else{
            cart.push({
                productid : product_id,
                quantity :1

            });
            // console.log(cart);
        }

        let count =  0;
        cart.forEach((item1) =>{
            count += item1.quantity;
            
        });
        document.querySelector('.js-count').innerHTML=count;
    });
    
});




