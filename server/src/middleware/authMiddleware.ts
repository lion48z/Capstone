import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user'; 

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) { 
       res.status(403).send('Access Denied');
       return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decodedToken) => {
      if (err) {
        console.error(err);
        res.sendStatus(403);
        return;
      }

      try {
        // Assuming decodedToken contains user information
        const user = await User.findById(decodedToken); 
        if (!user) {
          res.sendStatus(403); // Unauthorized
          return;
        }

        // Store the user in a property called user in the request object 
        (req as any).user = user;
        // Proceed to the next middleware in the chain 
        next();
      } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
      }
    });
};

export default authenticateToken;



