

const Product = require('../models/product');

exports.putProduct = async (req, res, next) => {

    try {

        const name = req.body.name;
        const price = req.body.price;
        const desc = req.body.desc;
        const quantity = req.body.quantity;
        const mobile = req.body.mobile;

        const newProduct = new Product({
            name: name,
            price: price,
            desc: desc,
            quantity: quantity,
            mobile: mobile
        });

        const product = await newProduct.save() ;

        res.status(201).json({
            status:1,
            product:product,
            message:'product created'
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.postEdit = async (req, res, next) => {

    try {

        const name = req.body.name;
        const price = req.body.price;
        const desc = req.body.desc;
        const quantity = req.body.quantity;
        const mobile = req.body.mobile;
        const id = req.body.id;

        const product = await Product.findById(id);
        if(!product){
            const err = new Error('product not found');
            err.statusCode = 404 ;
            throw err ;
        }

        product.name = name ;
        product.price = price ;
        product.desc = desc ;
        product.mobile = mobile ;
        product.quantity = quantity ;

        const updatedProduct = await product.save();

        res.status(200).json({
            status:1,
            product:updatedProduct,
            message:'product edited'
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}


exports.deleteProduct = async (req, res, next) => {

    try {

        const id = req.body.id;

        const product = await Product.findById(id);
        if(!product){
            const err = new Error('product not found');Product
            err.statusCode = 404 ;
            throw err ;
        }

        await Product.deleteOne({_id:id}) ;

        res.status(200).json({
            status:1,
            message:'product deleted'
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.getProducts = async (req, res, next) => {

    try {

        const products = await Product.find({});


        res.status(200).json({
            status:1,
            products:products,
            message:'all products'
        });


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}