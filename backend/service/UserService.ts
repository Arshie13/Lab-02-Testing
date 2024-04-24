import PogsDAO from "../dao/PogsDAO";
import UserDAO from "../dao/UserDAO";
import WalletDAO from "../dao/WalletDAO";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserService {

  async getUserById(id: number) {
    if (!id) {
      return { error: 'Bad Request.' };
    }
    try {
      const user = await UserDAO.getUserById(id);
      if (!user) {
        return { error: 'User not found.' };
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getUserByUsername(username: string) {
    if (!username) {
      return { error: `Bad Request.` };
    }
    try {
      const user = await UserDAO.getUserByUsername(username);
      if (!user) {
        return { error: 'User not found.' };
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getUserByEmail(email: string) {
    if (!email || email === '') {
      return { error: `Bad Request.` };
    }
    try {
      const user = await UserDAO.getUserByEmail(email);
      if (user === undefined || user === null) {
        return { error: 'User not found.' };
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getCurrentUser(token: string) {
    try {
      const user = jwt.verify(token, 'super secret key here');
      return user;
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getAllUsers() {
    try {
      let users = await UserDAO.getAllUsers();
      if (users.length === 0) {
        return { error: 'No users found.' };
      } else {
        return users;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async userLogin(email: string, password: string) {
    const user = await this.getUserByEmail(email)
    if ("error" in user) return user.error;
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  async userRegister(email: string, username: string, password: string) {
    const user = await this.getUserByEmail(email);
    if ("error" in user) {
      return await this.createUser(email, username, password);
    } else {
      return { error: 'User already exists.' };
    }
  }

  async createUser(email: string, username: string, password: string) {
    if (!email || !username || !password) {
      return { error: 'Bad Request.' };
    }
    try {
      const newUser = await UserDAO.createUser(email, username, password);
      return newUser;
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async updateUser(id: number, data: any) {
    if (!id || !data || Object.keys(data).length === 0) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkUser = await UserDAO.getUserById(id);
      if (!checkUser) {
        return { error: 'User not found.' };
      } else {
        const updatedUser = await UserDAO.updateUser(id, data);
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async buyPogs(user_id: number, pogs_id: number, quantity: number) {
    const user = await this.getUserById(user_id);
    const pog = await PogsDAO.getPogsById(pogs_id);
    if (!user || !pog) {
      return { error: 'User or Pog not found.' };
    } else {
      let wallet = await WalletDAO.getWalletByUserId(user_id, pogs_id);
      if (!wallet) {
        wallet = await WalletDAO.createWallet(user_id, pog.id);
        // might be an error
        await WalletDAO.updateWallet(user_id, pogs_id, { quantity: quantity });
        return { success: 'Pogs bought successfully.' };
      } else {
        await WalletDAO.updateWallet(user_id, pogs_id, { quantity: wallet.quantity + quantity });
        return { success: 'Pogs bought successfully.' };
      }
    }
  }

  async deleteUser(id: number) {
    if (!id) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkUser = await UserDAO.getUserById(id);
      if (!checkUser) {
        return { error: 'User not found.' };
      } else {
        const deletedUser = await UserDAO.deleteUser(id);
        return deletedUser;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }
}

export default new UserService();

// const userService = new UserService();

// async function log() {
//   console.log(userService.getCurrentUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoiYXJzaGVpMTNAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6IkFyc2hpZTEzIiwicGFzc3dvcmQiOiIkMmIkMTAkek1HSnFTbmY4UDY1Ni5QRk50TXMyLmdveENuSmpkaGxSWGtYNEp0a2Y4aXVLS2k2ZUQyRG0iLCJiYWxhbmNlIjo5ODU4ODAsInJvbGUiOiJhZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjQtMDQtMTZUMDg6NTQ6MTkuNzg2WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMTdUMTQ6NDY6MTEuODM1WiIsImlhdCI6MTcxMzkyNjQzNX0.kqx31QFQiEMBSfXYr3uQg2sik9dRlzsiXk-4Ady1oiA'))
// }

// log();