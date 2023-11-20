import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    flag: {
      type: Boolean,
      default: false,
    },
    roll: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    }
  },
);

const User = mongoose.model("User", UserSchema);
export default User;