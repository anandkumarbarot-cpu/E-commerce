import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
};

export const login = async (req, res) => {
    const user = await User.findOne({email:req.body.email});
    if(!user || !bcrypt.compareSync(String(req.body.password), user.password))
        return res.status(401).json({message: "Invalid credentials"});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({token, user, success: "true"});
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};