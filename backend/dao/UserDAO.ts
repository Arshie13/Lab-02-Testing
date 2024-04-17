import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserDAO {
  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username }
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async createUser(email: string, username: string, password: string) {
    return await prisma.user.create({
      data: {
        email,
        username,
        password
      }
    });
  }

  async updateUser(id: number, data: any) {
    return await prisma.user.update({
      where: { id },
      data
    });
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id }
    });
  }
}

export default new UserDAO();
