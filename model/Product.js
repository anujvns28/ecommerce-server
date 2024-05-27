const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    naem:{
      type: String,
      required: true
    },
    desc:{
        type: String,
        required: true   
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    size:[{
      type: String,
      required: true
    }],
    discountPrice:{
        type:Number,
        required:true  
    },
    productImages:[{
    type: String,
      required: true 
    }],
    productMainImage:{
        type: String,
        required: true
    },
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }]
    
  });
  
  const Product = mongoose.model('Product', productSchema);

module.exports = Product;
  
  
  