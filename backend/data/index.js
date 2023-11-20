import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];


export const users = [
  {
    _id: userIds[0],
    "name": "Chandrakethan",
    "flag": false,
    "roll": "21071A1255"
  },
  {
    _id: userIds[1],
    "name": "John Doe",
    "flag": true,
    "roll": "21071A1260"
  },
  {
    _id: userIds[2],
    "name": "Alice Smith",
    "flag": false,
    "roll": "21071A1245"
  },
  {
    _id: userIds[3],
    "name": "Bob Johnson",
    "flag": true,
    "roll": "21071A1275"
  }
]
