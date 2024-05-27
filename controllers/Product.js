const Product = require("../model/Product");


exports.createProduct = async (req, res) => {
    try {
        const { name, desc, price, gender, color, size, discountPrice } = req.body;
        const images = req.files.images;
        const mainImages = req.files.mainImages;

        if (!name ||
            !desc ||
            !price ||
            !gender ||
            !color ||
            !size ||
            discountPrice ||
            !images ||
            !mainImages) {
            return res.status(500).json({
                success: false,
                message: "All filds are required"
            })
        }

        //upload image

        // create product
        const product = await Product.create({
            name:name,
            desc:desc,
            price:price,
            color:color,
            gender:gender,
            size:size,
            discountPrice:discountPrice,
            productImages:images,
            productMainImage:mainImages
        })

        return res.status(200).json({
            success:true,
            message:"product cretaed sucessfully",
            data : product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured in createing product"
        })
    }
}