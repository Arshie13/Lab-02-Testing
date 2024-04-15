import { PrismaClient } from "@prisma/client";
import PogsDAO from "./PogsDAO";

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

// const userdao = new UserDAO();

// async function log() {
//   const createUser = await userdao.createUser({
//     email: 'email@email.com',
//     password: 'password',
//     username: 'Username',
//   });
//   console.log('UserDao test:', createUser);

  // const users = await userdao.getAllUsers();
  // console.log('UserDao test:', users.forEach(user => console.log(user)));

  // const user = await userdao.getUserById(users[0].id);
  // console.log('UserDao test:', user);

  // const userByEmail = await userdao.getUserByEmail(users[0].email);
  // console.log('UserDao test:', userByEmail);

  // const updateUser = await userdao.updateUser(users[0].id, {
  //   email: 'updated@email.com',
  //   password: 'updatedpassword',
  //   username: 'UpdatedUsername',
  // });
  // console.log('UserDao test:', updateUser);

  // const deleteUser = await userdao.deleteUser(users[0].id);
  // console.log('UserDao test:', deleteUser);
// }

// log();