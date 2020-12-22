import { Request, Response } from 'express';

export type MyContext = {
  req: Request;
  res: Response;
};

export type UserInput = {
  email: string;
  username: string;
  password: string;
};
