import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/api/orders',
  async (req: Request, res: Response) => {

    return res.send({});
  }
);

export { router as createOrderRouter }