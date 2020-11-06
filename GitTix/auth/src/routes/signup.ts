import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

// remember in async we should try/catch and pass error in next function
// but here we used `express-async-errors` that allow us to throw inside handlers
router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email is already in use.');
    }

    // step must be done (HASH THE PASSWORD)
    const newUser = User.build({ email, password });
    await newUser.save();

    const userJWT = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_KEY!);
    req.session = {
      jwt: userJWT
    };

    return res.status(201).send(newUser);
    
  }
);

export { router as signupRouter };
