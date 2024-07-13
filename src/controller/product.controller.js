import { createMultipleProducts, createProduct, deleteProduct, findProductbyId, getAllProducts, updateProduct } from "../services/product.service.js"

const createProducts=async(req,res)=>{
    try{
        console.log(req.body);
        const product=await createProduct(req.body);
       return res.status(201).send(product);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const deleteProducts=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await deleteProduct(productId);
       return res.status(201).send(product);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const updateProducts=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await updateProduct(productId,req.body);
       return res.status(201).send(product);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const findProductByIds=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await findProductbyId(productId);
       return res.status(201).send(product);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const getAllProductss=async(req,res)=>{
    try{
// console.log("dfjkngjerskdg");
        const products=await getAllProducts(req.query);
       return res.status(201).send(products);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const createMultipleProductss=async(req,res)=>{
    try{
        const products=await createMultipleProducts(req.body);
       return res.status(201).send({message:"Products created successfully"});
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}


export {
    createProducts,
    deleteProducts,
    updateProducts,
    getAllProductss,
    createMultipleProductss,
    findProductByIds
}