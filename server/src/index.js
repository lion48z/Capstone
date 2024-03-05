import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'; //MongoDB
import dotenv from 'dotenv';
import multer from "multer"; //middleware for handling multipart/form-data.
import helmet from "helmet"; //Helmet.js is an open source JavaScript library that helps you secure your Node.js application by setting several HTTP headers.
import morgan from "morgan"; //HTTP request logger middleware for node.js
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js"
import usersRoutes from "./routes/usersRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import verifyToken from "./middleware/verifyToken.js";
dotenv.config();
//import User from "./models/user";
//import Post from "./models/post";
//import { users, posts } from "./data/index";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));  

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "public/assets");

  },

  filename: function (req, file, cb) {

    cb(null, file.originalname);

  },

});
//Multer for storage
const upload = multer({ storage });


const PORT= process.env.PORT || 6001;

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.5yfcerx.mongodb.net/?retryWrites=true&w=majority`







app.post("/auth/register", upload.single("picture"), register);

app.post("/posts", verifyToken, upload.single("picture"), createPost);


app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);













mongoose.connect(MONGO_URL)

  .then(() => {

    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

   //User.insertMany(users); for one time load of data

   //Post.insertMany(posts); for one time load of data

  })

  .catch((error) => console.log(`${error} did not connect`));


