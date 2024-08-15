const path=require('path');
const express=require('express');
const router=express.Router();

const shopController=require('../controller/shop');
router.get('/products/all',shopController.getProductsAll)
router.get('/',shopController.home);
router.get('/product/details/:id',shopController.getProductsDetails);
router.get('/cart/add/:id',shopController.getAddToCart);
router.get('/cart',shopController.getCart);
router.get('/cart/increment/:id',shopController.incrementCart)
router.get('/cart/decrement/:id',shopController.decrementCart)
router.get('/orders',shopController.getOrders)
module.exports=router;