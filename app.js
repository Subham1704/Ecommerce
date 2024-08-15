const express=require('express');
const app=express();
const path=require('path');
const PORT=3001;
const mongoose=require('mongoose');
const hbs = require('hbs');
const user=require('./models/user')
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(async(req,res,next)=>{
    let user1=await user.findOne({
        _id:"665b6e9a69bef4a6accdcdf7"
    });
    req.user=user1;
    next();
})

app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.json()); 

//ROUTES
// /admin /admin/add 
const adminRouter=require('./routes/admin');
app.use('/admin',adminRouter);
const shopRouter=require('./routes/shop');
// const user = require('./models/user');
app.use('/shop',shopRouter);
app.get('/',(req,res,next)=>{
    res.render('index')
})

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})