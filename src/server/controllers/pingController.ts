import { type NextFunction, type Request, type Response } from "express";

const pingController = (req: Request, res: Response, _next: NextFunction) => {
  const message = "Pong 🏓";
  res.status(200).json({ message });
};

export default pingController;
