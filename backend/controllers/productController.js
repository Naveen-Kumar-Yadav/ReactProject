const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

//get all product

exports.getAllProducts =catchAsyncErrors( async (req, res) => {
    resultPerPage=5;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query).search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,

    });
});

//get products details

exports.getproductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found",404))
    }
    res.status(200).json({
        success: true,
        product,
        productCount
    })
});


// update product --admin

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
});

exports.deleteProducts =catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found",404))
    }
    await Product.remove();

    res.status(200).json({
        success: true,
        message: "product delete successfully"
    })
});



