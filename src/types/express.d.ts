import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export {};
