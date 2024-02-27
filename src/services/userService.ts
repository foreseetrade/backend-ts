// userService.ts

import prisma from "../database/prisma";

export const findUserByEmailOrPhone = async (email: string, phone: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            userEmail: email,
          },
          {
            userPhone: phone,
          },
        ],
      },
    });

    return user;
  } catch (error) {
    throw new Error("Error finding user by email or phone");
  }
};

export const createUser = async (
  userName: string | null,
  userEmail: string,
  userPhone: string
): Promise<any> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        userName,
        userEmail,
        userPhone,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID");
  }
};

export const updateUser = async (userId: number, updatedUserData: any) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: updatedUserData,
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};
