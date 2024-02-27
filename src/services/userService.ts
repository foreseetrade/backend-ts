// src/services/userService.ts
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  // Assuming you have a Prisma client instance named 'prisma' imported at the top of your file
  // Example: import { PrismaClient } from '@prisma/client'; const prisma = new PrismaClient();

  // Function to find a user by email or phone
  findUserByEmailOrPhone = async (
    ipEmail: string | "",
    ipPhone: string | ""
  ) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            userEmail: ipEmail,
          },
          {
            userPhone: ipPhone,
          },
        ],
      },
    });

    return user;
  };

  // Function to create a new user
  createUser = async (
    ipName: string,
    ipEmail: string | "",
    ipPhone: string | ""
  ) => {
    const newUser = await prisma.user.create({
      data: {
        userName: ipName,
        userEmail: ipEmail,
        userPhone: ipPhone,
      },
    });

    return newUser;
  };

  // Function to update user details
  updateUser = async (
    userId: number,
    updatedData: { name?: string; email?: string; phone?: string }
  ) => {
    const updatedUser = await prisma.user.update({
      where: {
        userId,
      },
      data: updatedData,
    });

    return updatedUser;
  };
}
