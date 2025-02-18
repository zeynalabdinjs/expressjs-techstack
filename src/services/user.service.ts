import { User } from "@prisma/client";
import prisma from "../lib/prisma";

export const createUser = async (data: { firstName: string; lastName: string; email: string; username: string; password: string }) => {
  return await prisma.user.create({
    data: {
      ...data,
      password: data.password, // Şifreyi hash'lemeden kaydediyoruz
    },
  });
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const findUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
