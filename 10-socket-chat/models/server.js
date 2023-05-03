const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { connect } = require('../database/config');
const { socketController } = require('../sockets/controller');

const PATH = '/api';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {
      auth: `${PATH}/auth`,
      categories: `${PATH}/categories`,
      products: `${PATH}/products`,
      searchs: `${PATH}/searchs`,
      uploads: `${PATH}/uploads`,
      users: `${PATH}/users`,
    };

    this.connectDB();
    this.middlewares();
    this.routes();
    this.sockets();
  }

  async connectDB() {
    await connect();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));

    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true, // only if we needs
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.searchs, require('../routes/searchs'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
    this.app.use(this.paths.users, require('../routes/users'));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    });
  }
};

module.exports = Server;