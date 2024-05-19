const Categories = require("../model/Categories");

exports.createCategories = async(req,res) => {
    try{
        const {categoriesName,categoriesDesc} = req.body;

        if(!categoriesName || !categoriesDesc){
            return res.status(500).json({
                success:true,
                message:"All filds are required"
            })
        }

        const categorie = await Categories.create({
            categoriesName:categoriesName,
            categoriesDesc:categoriesDesc,
        })

        return res.status(200).json({
            success:true,
            message:"Categoreis created successfully",
            data : categorie
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occured in creatning categories"
        })
    }
}


exports.updateCategoreis = async(req,res) => {
    try{
        const {categorieId,categoriesName,categoriesDesc} = req.body;

        if(!categorieId || !categoriesName || !categoriesDesc){
            return res.status(500).json({
                success:true,
                message:"All filds are required"
            })
        }

    const categorie = await Categories.findByIdAndUpdate(categorieId,{
        categoriesName:categoriesName,
        categoriesDesc:categoriesDesc
    });  
    
    return res.status(200).json({
        success:true,
        message:"Categoreis updated successfully",
        data : categorie
    })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occured in updating categories"
        })
    }
}


exports.deleteCategorie = async(req,res) => {
    try{
    const {categorieId} = req.body;

    if(!categorieId){
        return res.status(500).json({
            success:false,
            message:"Categorie is required"
        })
    }

    await Categories.findByIdAndDelete(categorieId);


    return res.status(200).json({
        success:true,
        message:"Categoreis deleted successfully",
    })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occured in deleting categories"
        })
    }
}


exports.fetchCategories = async(req,res) =>{
    try{
        

       const subCategoreis = Categories.find().populate("SubCategories").exec();

       return res.status(200).json({
        success:true,
        message:"subCategoreis fetched successfully",
        data : subCategoreis
    })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occured in fetching all categories"
        })  
    }
}