import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

userSchema.pre("save", function(){
    if(this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

export default mongoose.model("User", userSchema);