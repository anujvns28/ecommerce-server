const express = require('express');
const router = express.Router();

const {getSingleProduct, createProduct, userProduct, changeDiscount, updateProduct, deleteProduct} = require("../controllers/Product");
const { createRating, getRatingAndReview } = require('../controllers/ratingAndReview');

// ********************************************************************************************************
//                                      product routes
// ********************************************************************************************************

// Route for get single product information
router.post("/getSingleProduct",getSingleProduct)
// route for create product
router.post('/create-product',createProduct)
// get user products
router.post("/userProducts",userProduct);
// change discount
router.post("/changeDiscount",changeDiscount)
//edit product
router.post("/editProduct",updateProduct)
// delte product
router.post("/deleteProduct",deleteProduct)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating",  createRating)
router.post("/getRatingAndReview", getRatingAndReview)


module.exports = router