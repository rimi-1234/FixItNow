import { Role } from "@prisma/client";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role?: Role;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  bio?: string;
  location?: string;
  imageUrl?: string | null;
}

export interface IUpdateProfilePayload {
  name?: string;
  phone?: string;
  imageUrl?: string | null;
}

export interface IGoogleLoginPayload {
  idToken?: string;
  code?: string;
  redirectUri?: string;
  role?: Role;
}
