import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js'
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        username,
        password,
      } = req.body;
      console.log(req.body)
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newAdmin = new Admin({
        firstName,
        lastName,
        username,
        password: passwordHash,
      });
      const savedAdmin = await newAdmin.save();
      res.status(201).json(savedAdmin);
    } catch (err){
      res.status(500).json({ error: err.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body)
      const admin = await Admin.findOne({ username: username });
      if (!admin) return res.status(400).json({ message: "Invalid Username" });
      const isMatch = await bcrypt.compare(password, admin.password);
      console.log(isMatch)
      if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
      let token = jwt.sign({id: admin._id},process.env.SECRET_KEY,{expiresIn:10000})
      console.log(token)
      res.status(200).json({message:"Success",payload:{token, username}})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const scan = async (req, res) => {

    try{
        const { text } = req.body;
        console.log("Scanned Text:",typeof text, text);
        const user = await User.findOne({roll:text});
        if (user == null) {
        return res.status(200).json({ msg: "invalid" });
        }
        console.log("User Found:", user);
        if (user.flag === false) {
            await User.updateOne({ _id: user._id }, { $set: { flag: true } });
            return res.status(200).json({ msg: "success" });
        } else {
            return res.status(200).json({ msg: "fail" });
        }} catch (error) {
            console.error("Error updating user:", error);
            return res.status(400).json({ msg: "error" });
        }
  };

  export const reset = async (req, res) => {
    try {
    await User.updateMany({}, { $set: { flag: false } });
    res.status(200).json({ msg: 'Flags reset successfully' });
    } catch (error) {
    console.error('Error resetting flags:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  };