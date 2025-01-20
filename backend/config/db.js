import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://harshshah123346:1234@cluster0.dh9ps.mongodb.net/food-del')
        .then(() => console.log("Database connected"))
}