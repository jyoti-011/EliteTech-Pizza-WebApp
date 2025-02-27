import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Jyoti:jyoti2003@cluster0.8yltx.mongodb.net/food-final').then(()=>console.log("DB connected"));
}

// mongodb+srv://jyoti:jyoti2003@cluster0.u8wsx.mongodb.net/food-email