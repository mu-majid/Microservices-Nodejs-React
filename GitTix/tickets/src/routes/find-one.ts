import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError } from '@mmkgittix/common';
import { body, param } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get(
  '/api/tickets/:ticketId',
  requireAuth,
  [
    param('ticketId').not().isEmpty().withMessage('ticketId is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      throw new NotFoundError();
    }

    return res.status(200).send(ticket);
  }
);

export { router as showTicketRouter };