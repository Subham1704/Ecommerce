const path=require('path');
const express=require('express');
const router=express.Router();

const adminController=require('../controller/admin');

router.get('/',adminController.getAdminHome);
router.get('/products/all',adminController.getProductAll);
router.get('/products/add',adminController.getProductAdd);
router.post('/products/add',adminController.postProductAdd);
router.post('/products/update',adminController.postUpdateProduct);
router.get('/products/update/:id',adminController.getUpdateProduct);
router.get('/products/delete/:id',adminController.getDeleteProduct);
module.exports=router;