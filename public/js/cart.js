
let cartList=document.querySelector('.cart-list');
function update(cart){
    cartList.innerHTML="";
    cart.forEach((c,indx) => {
        let li=document.createElement('li');
        li.innerHTML=
        `
        {{#each cart as |c|}}
            <li>
                <img src=${c.id.imageUrl}>
                <h4>name:${c.id.name}</h4>
                <h4>price:${c.id.price}</h4>
                <h4>Quantity:</h4>
                    <div class="qty">
                        <a href='shop/cart/increment'>
                            <button class="increment">+</button>
                        </a>
                        <div>${c.quantity}</div>
                        <a href='shop/cart/decrement'>
                            <button class="decrement">-</button>
                        </a>   
                        <div id=${c.id._id}></div>             
                    </div>
            </li>
        {{/each}}
        `
        cartList.appendChild(li);
    });

}

cartList.addEventListener('click',(ev)=>{
    ev.preventDefault();
    let item=ev.target;
    item=item.parentElement.parentElement;
    id=item.getAtrribute('id');
    if(item.classList.contains('increment')){
        axios(`shop/cart/increment/${id}`).then((data)=>{
            let {cart,totalPrice}=data;
            update(cart);
        })
        .catch((err)=>{
            next(err);
        })
    }
    else if(item.classList.contains('decrement')){
        axios(`/shop/cart/decrement/${id}`).then(({data})=>{
            let cart=data;
            update(cart);
        })
        .catch((err)=>{
            next(err);
        })
    }
})