import express, { Request, Response } from 'express';
import { requireAuth } from '@mmkgittix/common';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  async (req: Request, res: Response) => {

    return res.sendStatus(200);
  }
);

export { router as createTicketsRouter }