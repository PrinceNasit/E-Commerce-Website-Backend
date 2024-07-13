import Category from '../models/category.model.js'
import Product from '../models/product.model.js';

const createProduct=async(data)=>{
    let tLevel=await Category.findOne({name:data.topLavelCategory});
    if(!tLevel){
        tLevel=new Category({
            name:data.topLavelCategory,
            level:1
        });
        await tLevel.save();
    }
    // console.log(tLevel);
    let sLevel=await Category.findOne({
        name:data.secondLavelCategory,
        parentCategory:tLevel._id
    });
    if(!sLevel){
        sLevel=new Category({
            name:data.secondLavelCategory,
            level:2,
            parentCategory:tLevel._id
        });
        await sLevel.save();
    }
    // console.log(sLevel);
    let thLevel=await Category.findOne({name:data.thirdLavelCategory,
        parentCategory:sLevel._id
    });
    if(!thLevel){
        thLevel=new Category({name:data.thirdLavelCategory,
            level:3,
            parentCategory:sLevel._id
        });
        await thLevel.save();
    }
    // console.log(thLevel);

    const product=new Product({
        title:data.title,
        description:data.description,
        color:data.color,
        discountedPrice:data.discountedPrice,
        discountedPercent:data.discountPersent,
        imageurl:data.imageUrl,
        brand:data.brand,
        price:data.price,
        sizes:data.size,
        quantity:data.quantity,
        category:thLevel._id
    })
    // console.log(product)
    return await product.save();
}

const deleteProduct=async(productId)=>{
    const product=await findProductbyId(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

const updateProduct=async(productId,data)=>{
    return await Product.findByIdAndUpdate(productId,data);
    
}

const findProductbyId=async(productId)=>{
    const product= await Product.findById(productId)
    .populate("category").exec();

    if(!product){
        throw new Error("Product not found with id: ",productId);
    }
    return product;
}

const getAllProducts=async(query)=>{
    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=query;

    pageSize=pageSize||10;
    // console.log(color);
    let newQuery= Product.find().populate("category");
    if(category){
        // console.log(category);
        const existCategory=await Category.findOne({name:category});
        // console.log(existCategory);
        if(existCategory){
            newQuery=newQuery.where("category").equals(existCategory._id);
        }
        else{
            console.log(color);
            return {content:[],currentPage:1,totalPages:0}
        }
    }

    if(color){
        // console.log(color)
        // console.log("hiii")

        const colorset=new Set(color.split(",").map(color=>color.trim().toLowerCase()));
        // console.log(colorset);
        const colorRegex = colorset.size>0?new RegExp([...colorset].join("|"),"i"):null;
        // console.log(colorRegex);
        newQuery=newQuery.where("color").regex(colorRegex);
        // const data=await newQuery.exec();
        // console.log(data);
    }

    if(minPrice && maxPrice){
        // console.log(minPrice,maxPrice);
        newQuery= newQuery.where("discountedPrice").gte(minPrice).lte(maxPrice);
        // const data=await newQuery.exec();
        // console.log(data);
    }
    if(sizes){
        // console.log("hiii")

        const sizesSet=new Set(sizes);
        newQuery= newQuery.where("sizes.name").in([...sizesSet]);

    }


    if(minDiscount){
        // console.log(minDiscount)

        newQuery=newQuery.where("discountedPercent").gte(minDiscount);
        // const data=await newQuery.exec();
        // console.log(data);
    }

    if(stock){
        
        if(stock==="in_stock"){
            console.log("hiii")
            newQuery=newQuery.where("quantity").gt(0);
        }
        else if(stock==="out_of_stock"){
            newQuery=newQuery.where("quantity").gt(1);
        }
    }

    if(sort){
        // console.log("hiii")

        const sortDirection=sort==="price_high"?-1:1;
        newQuery=newQuery.sort({discountedPrice:sortDirection});
        // const data=await newQuery.exec();
        // console.log(data);
    }

    const totalProducts=await Product.countDocuments(newQuery);
    // console.log(totalProducts);
    const skip=(pageNumber-1)*pageSize;
    // console.log(skip);
    newQuery=newQuery.skip(skip).limit(pageSize);

    const products=await newQuery.exec();
    // console.log(products);
    const totalPages=Math.ceil(totalProducts/pageSize);
    // console.log(products);
    return {content:products,currentPage:pageNumber,totalPages}
}

const createMultipleProducts=async(products)=>{
    for(let product of products){
        await createProduct(product);
    }
}

export {
 createProduct,
 deleteProduct,
 updateProduct,
 getAllProducts,
 findProductbyId,
 createMultipleProducts
}