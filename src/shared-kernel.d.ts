declare namespace Express {
  export interface Request {
    user?: string;
    accessLevel?: number;
  }
}
