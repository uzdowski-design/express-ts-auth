import { Request, Response, NextFunction } from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['EXPRESS-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403).send({ message: 'Not authorized.' });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403).send({ message: 'Not authenticated.' });
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400).send({ message: 'Invalid data.' });
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403).send({ message: 'Not authorized.' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
