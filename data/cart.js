export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2
        },
        {
            productid: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
            quantity:1
        }
    ];
    
}

function store_the_cart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(product_id){
    
    
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
    
    store_the_cart();

}

export function remove_to_cart(pro_id){
    let array =[];
    cart.forEach((item)=>{
        if(pro_id !== item.productid){
            array.push=item;
        }
    });
    cart=array;
    store_the_cart();
}