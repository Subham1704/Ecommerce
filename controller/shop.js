const Product=require('../models/products');
const user=require('../models/user');
module.exports.getProductsAll=async(req,res,next)=>{
    try {
        let products=await Product.find({});
        let {getProductCategoryWise}=require('../utils/library');
        let ProductCategoryWise=getProductCategoryWise(products);
        res.render('shop/home',{
            products:ProductCategoryWise
        })
    } catch (error) {
        next(error);
    }
}
module.exports.home=async(req,res,next)=>{
    try {
        let products=await Product.find({});
        let {getProductCategoryWise}=require('../utils/library');
        let ProductCategoryWise=getProductCategoryWise(products);
        console.log(req.user);
        res.render('shop/home',{
            products:ProductCategoryWise
        })
    } catch (error) {
        next(error);
    }
}
module.exports.getProductsDetails=async(req,res,next)=>{
    let {id}=req.params;
    try {
        let products=await Product.findById(id);
        res.render('shop/productDetails',{
            products:products
        })
    } catch (error) {
        next(error);
    }
}
module.exports.getAddToCart=async(req,res,next)=>{
    try {
        let {id}=req.params;
        let cart=req.user.cart;
        let indx=-1;
        cart.forEach((item,i)=> {
            if(item.id==id){
                indx=i;
            }
        });
        if(indx==-1){
            cart.unshift({
                id:id,
                quantity:1
            })
        }
        else{
            cart[indx].quantity++;
        }

        req.user.save();
        res.redirect('/shop/cart')
    } 
    catch (error) {
        next(error);
    }
}

module.exports.getCart=async(req,res,next)=>{
    try {
        const {id}=req.params;
        let user1=await user.findOne({_id:req.user._id}).populate('cart.id')
        let totalPrice=0;
        user1.cart.forEach((item)=>{
            totalPrice+=item.id.price*item.quantity;
        })
        res.render('shop/cart',{cart:user1.cart,totalPrice});
    } catch (error) {
        next(error);
    }
}
module.exports.incrementCart=async(req,res,next)=>{
    try {
        const {id}=req.params;
        console.log(id);
        let cart=req.user.cart;
        let indx;
        cart.forEach((item,i)=>{
            if(item.id==id){
                indx=i
                item.quantity++;
            }
        })
        // cart[indx].quantity+=1;
        console.log(indx);
        req.user.save();
        let user1=await user.findOne({_id:req.user._id}).populate('cart.id');
        console.log(user1);
        let totalPrice=0;
        user1.cart.forEach((item)=>{
            totalPrice+=item.id.price*item.quantity;
        })  
        console.log(user1.cart); 
        return({
            cart:user.cart,
            totalPrice
        })
    } catch (error) {
        next(error);
    }
}
module.exports.decrementCart=async(req,res,next)=>{
    try {
        const {id}=req.params;
        let cart=req.user.cart;
        let indx;
        cart.forEach((item,i)=>{
            if(item.id==id){
                indx=i
            }
        })
        cart[indx].quantity--;
        req.user.save();
        let user1=await user.findOne({_id:req.user._id}).populate('cart.id');
        let totalPrice=0;
        user1.cart.forEach((item)=>{
            totalPrice+=item.id.price*item.quantity;
        })   
        res.send({
            cart:user.cart,
            totalPrice
        })
    } catch (error) {
        next(error);
    }
}
module.exports.getOrders=async(req,res,next)=>{
    try {
        let user1=await user.findOne({_id:req.user._id}).populate('cart.id');
        let cart1=user1.cart;
        let newOrder=[];
        cart1.forEach((item)=>{
            let obj={};
            obj.product=item.id;
            obj.quantity=item.quantity;
            newOrder.push(obj);
        })
        user1.orders=newOrder;
        user1.cart=[];
        await user1.save();
        console.log(newOrder);
        res.send({
            msg:"order successfully placed"
        })
    } catch (error) {
        next(error);
    }
}
