import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
   userId: mongoose.Schema.Types.ObjectId,
   items:Array,
   totalAmount: Number,
   Status: {type: String, default: "Pending"}
});



export default mongoose.model("Order", orderSchema);