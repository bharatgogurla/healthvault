import { User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  verification_status?: string;
  profile: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

