import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: string[];
  location?: string;                 //? to show that these can be undefined or have a value
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: undefined,
    },
    occupation: {
      type: String,
      default: undefined,
    },
    viewedProfile: {
      type: Number,
      default: undefined,
    },
    impressions: {
      type: Number,
      default: undefined,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
