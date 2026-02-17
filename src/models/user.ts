import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
