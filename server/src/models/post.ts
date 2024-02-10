import mongoose, { Document, Model } from "mongoose";
interface IPost extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    picturePath: string;
    userPicturePath: string;
    friends: string[];
    description?:string;
    location?: string;                 //? to show that these can be undefined or have a value
    occupation?: string;
    viewedProfile?: number;
    impressions?: number;
    likes: Map<string, boolean>;
    comments?: string[];

}
const postSchema =  new mongoose.Schema<IPost>(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.model("Post", postSchema);

export default Post ;