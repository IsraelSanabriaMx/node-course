import express, { Application } from 'express';
import cors from 'cors';

import * as userRouter from '../routes/users';
import db from '../database/connection';

class Server {
  private app: Application;
  private port: String;
  private paths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  routes() {
    this.app.use(this.paths.users, userRouter.default);
  }

  middlewares() {
    // Enable cors
    this.app.use(cors());
    // Enable pars body to Json
    this.app.use(express.json());
    // Enable public page
    this.app.use(express.static('public'));
  }

  async connectDB() {
    try {
      await db.authenticate();
      console.log('DB online');

    } catch (error: any) {
      throw new Error(error);
    }
  }
}

// 198620202
export default Server;
