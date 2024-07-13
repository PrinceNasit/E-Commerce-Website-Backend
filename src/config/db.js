import mongoose from "mongoose"

const mongodbUrl ="mongodb+srv://princenasit371:MTJ5n85n5jdaau9m@cluster0.bypcwf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectDb=()=>{
    return mongoose.connect(mongodbUrl);
}

export default connectDb;