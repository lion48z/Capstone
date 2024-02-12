import express, { Express } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import { register } from "./controllers/auth";
import { createPost } from "./controllers/posts";
import authenticateToken from "./middleware/authenticateToken";

//import User from "./models/user";
//import Post from "./models/post";
//import { users, posts } from "./data/index";
dotenv.config();

const app: Express = express();

app.use(cors({
  credentials: true,
}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT= process.env.PORT ? Number(process.env.PORT): 6001;
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.5yfcerx.mongodb.net/?retryWrites=true&w=majority`
//Multer for storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", authenticateToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);






mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
   //User.insertMany(users); for one time load of data
   //Post.insertMany(posts); for one time load of data
  })
  .catch((error) => console.log(`${error} did not connect`));


