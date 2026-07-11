import prisma from '../../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';
import { Prisma, Role } from '@prisma/client';
import { ILoginPayload, IRegisterPayload } from './auth.interface';

const registerUser = async (payload: IRegisterPayload) => {
  if (!payload) throw new Error('Request payload is required');
  const { email, password, role, ...profileData } = payload;
  if (!email || !password) throw new Error('Email and password are required');
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds) || 12);

  const technicianProfileCreate = {
    skills: profileData.skills || [],
    experience: profileData.experience || 0,
    hourlyRate: profileData.hourlyRate || 0,
    bio: profileData.bio || null,
    location: profileData.location || null,
  } as Prisma.TechnicianProfileCreateWithoutUserInput;

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || Role.CUSTOMER,
      technicianProfile: role === Role.TECHNICIAN ? {
        create: technicianProfileCreate,
      } : undefined
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      technicianProfile: true,
    }
  });

  return user;
};

const loginUser = async (payload: ILoginPayload) => {
  if (!payload) throw new Error('Request payload is required');
  const { email, password } = payload;
  if (!email || !password) throw new Error('Email and password are required');


  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');
  if (user.status === 'BANNED') throw new Error('User is banned');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error('Incorrect password');

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
      status: user.status
    }
  };
};

const getMeFromDB = async (email: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      technicianProfile: true,
    }
  });
  return result;
};

export const AuthServices = {
  registerUser,
  loginUser,
  getMeFromDB,
};
