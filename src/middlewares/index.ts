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
      return res.status(403).send({ message: 'Not authorized.' }).end();
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).send({ message: 'Not authenticated.' }).end();
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
      return res.status(400).send({ message: 'Invalid data.' }).end();
    }

    if (currentUserId.toString() !== id) {
      return res.status(403).send({ message: 'Not authorized.' }).end();
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
