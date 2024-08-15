const Product=require('../models/products');

module.exports.getAdminHome=async(req,res,next)=>{
    res.render('admin/home');
}

module.exports.postProductAdd=async(req,res,next)=>{
    const {name,price,description,seller,imageUrl,category}=req.body;
    await Product.create({name,price,description,seller,imageUrl,category});
    res.redirect('/admin/products/all')
}
module.exports.getProductAll=async(req,res,next)=>{
    const products=await Product.find();
    let data={};
    products.forEach((product)=>{
        let arr=data[product.category]||[];
        arr.push(product);
        data[product.category]=arr;
    })
    res.render('admin/viewProduct',{products:data,isAdmin:true});
}
module.exports.getProductAdd=async(req,res,next)=>{
    res.render('admin/productAdd');
}
module.exports.getUpdateProduct=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const product=await Product.findById(id);
        res.render('admin/productUpdate',{product,isAdmin:true});
    } catch (error) {
        next(err);
    }
}
module.exports.postUpdateProduct=async(req,res,next)=>{
    const {name,price,description,seller,imageUrl,id,category}=req.body;
    try {
        const p=await Product.findById(id);
        p.name=name;
        p.price=price;
        p.description=description;
        p.seller=seller;
        p.imageUrl=imageUrl;
        p.category=category;
        await p.save();
        res.redirect('/admin/products/all');  
    } catch (error) {
        next(error)
    }
}
module.exports.getDeleteProduct=async(req,res,next)=>{
    const {id}=req.params;
    try {
        let p=await Product.deleteOne({_id:id});
        res.redirect('/admin/products/all');  
    } catch (error) {
        next(error)
    }
}