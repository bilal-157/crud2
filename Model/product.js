import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    email:String,
    password:String
})

export default mongoose.models.Products || mongoose.model("Products", productSchema);
