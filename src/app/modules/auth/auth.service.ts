import prisma from '../../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';
import { Prisma, Role } from '@prisma/client';
import { ILoginPayload, IRegisterPayload, IUpdateProfilePayload } from './auth.interface.js';

const httpError = (message: string, statusCode: number) =>
  Object.assign(new Error(message), { statusCode });

const registerUser = async (payload: IRegisterPayload) => {
  if (!payload) throw httpError('Request payload is required', 400);
  const { email, password, name, phone, role, ...profileData } = payload;
  if (!email || !password) throw httpError('Email and password are required', 400);
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds) || 12);

  const technicianProfileCreate = {
    skills: profileData.skills || [],
    experience: profileData.experience || 0,
    hourlyRate: profileData.hourlyRate || 0,
    bio: profileData.bio || null,
    location: profileData.location || null,
    imageUrl: profileData.imageUrl || null,
  } as Prisma.TechnicianProfileCreateWithoutUserInput;

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name ?? null,
      phone: phone ?? null,
      role: role || Role.CUSTOMER,
      technicianProfile:
        role === Role.TECHNICIAN
          ? {
              create: technicianProfileCreate,
            }
          : undefined,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      technicianProfile: true,
    },
  });

  // Issue a token immediately so the client can sign the user in and skip
  // the extra "log in again" step right after registering.
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: (config.jwt_access_expires_in || '1d') as any }
  );

  return { accessToken, user };
};

const loginUser = async (payload: ILoginPayload) => {
  if (!payload) throw httpError('Request payload is required', 400);
  const { email, password } = payload;
  if (!email || !password) throw httpError('Email and password are required', 400);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw httpError('User not found', 404);
  if (user.status === 'BANNED') throw httpError('User is banned', 403);

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw httpError('Incorrect password', 401);

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: (config.jwt_access_expires_in || '1d') as any }
  );

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
};

const getMeFromDB = async (email: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      imageUrl: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      technicianProfile: true,
    },
  });
  return result;
};

/** Seeded demo accounts — emails only; passwords never leave the server. */
const DEMO_EMAIL_BY_ROLE: Record<Role, string> = {
  CUSTOMER: 'customer@fixitnow.com',
  TECHNICIAN: 'technician@fixitnow.com',
  ADMIN: 'admin@fixitnow.com',
};

const demoLoginUser = async (role: Role) => {
  const email = DEMO_EMAIL_BY_ROLE[role];
  if (!email) throw httpError('Invalid demo role', 400);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw httpError(
      'Demo account is not available. Run database seed and try again.',
      404
    );
  }
  if (user.status === 'BANNED') throw httpError('User is banned', 403);
  if (user.role !== role) {
    throw httpError('Demo account role mismatch', 500);
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: (config.jwt_access_expires_in || '1d') as any }
  );

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
};

const updateProfile = async (userId: string, payload: IUpdateProfilePayload) => {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.name !== undefined ? { name: payload.name?.trim() || null } : {}),
      ...(payload.phone !== undefined ? { phone: payload.phone?.trim() || null } : {}),
      ...(payload.imageUrl !== undefined ? { imageUrl: payload.imageUrl?.trim() || null } : {}),
    },
    select: { id: true, email: true, name: true, phone: true, imageUrl: true, role: true, status: true, createdAt: true, updatedAt: true },
  });
  return updated;
};

export const AuthServices = {
  registerUser,
  loginUser,
  demoLoginUser,
  getMeFromDB,
  updateProfile,
};
