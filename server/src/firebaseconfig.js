import admin from "firebase-admin";

// Firebase Initialization
const serviceAccount = require("./path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com" // Your Firebase Storage bucket URL
});
const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/posts", verifyToken, upload.single("picture"), async (req, res) => {
    try {
      const file = req.file;
      const postId = req.body.postId; // Assuming postId is present in the request body
      const firebaseFileName = `${postId}_${file.originalname}`;
      const fileUpload = bucket.file(firebaseFileName);
  
      // Create write stream for uploading the file
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
  
      // Handle stream events
      stream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Unable to upload image.' });
      });
  
      stream.on('finish', async () => {
        // The file upload is complete.
        const firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseFileName}`;
        
        // Now, you can save the firebaseUrl to MongoDB or perform any other actions.
        // Example MongoDB save:
        // const post = new Post({
        //   title: req.body.title,
        //   imageUrl: firebaseUrl,
        //   // Other fields...
        // });
        // await post.save();
  
        res.status(200).json({ imageUrl: firebaseUrl });
      });
  
      // Pipe the file data to the stream
      stream.end(file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
})


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import admin from "firebase-admin";

const serviceAccount = require("../path/to/serviceAccountKey.json"); // Replace with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com" // Replace with your Firebase Storage bucket URL
});
const bucket = admin.storage().bucket();

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picture, // Assuming 'picture' is the field for the uploaded image
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Upload picture to Firebase Storage
    const firebaseFileName = `${Date.now()}_${picture.originalname}`;
    const fileUpload = bucket.file(firebaseFileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: picture.mimetype
      }
    });

    stream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Unable to upload image.' });
    });

    stream.on('finish', async () => {
      const firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseFileName}`;

      // Create new user with Firebase URL for picture
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath: firebaseUrl, // Save Firebase URL to MongoDB
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    });

    stream.end(picture.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
