export const cart=[];
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

}