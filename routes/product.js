const express = require('express');
const router = express.Router();

const {getSingleProduct} = require("../controllers/Product")

// ********************************************************************************************************
//                                      product routes
// ********************************************************************************************************

// Route for get single product information
router.post("/getSingleProduct",getSingleProduct)

module.exports = router