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

export type TUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
