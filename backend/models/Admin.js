import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },

    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    username: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;