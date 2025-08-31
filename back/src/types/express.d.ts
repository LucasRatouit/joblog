declare global {
  namespace Express {
    interface Request {
      user?: { token: { id: string; email: string } } | null;
    }
  }
}

export {};
