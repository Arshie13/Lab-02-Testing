import UserService from "../service/UserService";
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {
  async getUserById(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);
    try {
      const user = await UserService.getUserById(id);
      if ('error' in user) {
        res.status(404).send(user.error);
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getUserByEmail(req: express.Request, res: express.Response) {
    const { email } = req.body;
    try {
      const user = await UserService.getUserByEmail(email);
      if ('error' in user || !user) {
        res.status(404).send("User not found.");
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async userLogin(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.userLogin(email, password);
      if (typeof user === "string" || !user) res.status(404).send(user);
      else {
        const userId = user.id;
        const token = jwt.sign(user, 'super secret key here');
        const send = { userId, token };
        res.status(200).send(send);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async userRegister(req: express.Request, res: express.Response) {
    const data = req.body;
    const email = data.email;
    const username = data.username;
    const password = data.password;
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await UserService.userRegister(email, username, hashedPassword);
      res.status(201).send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async buyPogs(req: express.Request, res: express.Response) {
    const { user_id, pog_id, quantity } = req.body;
    try {
      const user = await UserService.buyPogs(user_id, pog_id, quantity);
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async sellPogs(req: express.Request, res: express.Response) {
    const { user_id, pog_id, quantity } = req.body;
    try {
      const user = await UserService.sellPogs(user_id, pog_id, quantity);
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async increaseBalance(req: express.Request, res: express.Response) {
    const { user_id, balance } = req.body;
    try {
      const user = await UserService.increaseBalance(user_id, balance);
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getAllUsers(req: express.Request, res: express.Response) {
    try {
      const users = await UserService.getAllUsers();
      if ('error' in users) {
        res.status(404).send(users.error);
      } else {
        res.status(200).send(users);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getCurrentUser(req: express.Request, res: express.Response) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Access Denied');
    try {
      await UserService.getCurrentUser(authHeader).then((user) => {
        if (typeof user === "string" || !user) res.status(404).send(user);
        else res.status(200).send(user);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async createUser(req: express.Request, res: express.Response) {
    const data = req.body;
    const email = data.email;
    const username = data.username;
    const password = data.password;
    try {
      const newUser = await UserService.createUser(email, username, password);
      res.status(201).send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async updateUser(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);
    const data = req.body;
    try {
      const updatedUser = await UserService.updateUser(id, data);
      res.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async deleteUser(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);
    try {
      const deletedUser = await UserService.deleteUser(id);
      res.status(200).send(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }
}

export default new UserController();