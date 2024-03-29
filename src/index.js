import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import passport from 'passport';
import path from 'path';
import http from 'http';
import routes from './routes';
import db from './database/models/index';
import './helpers/EventEmitters/eventEmitter';
import './helpers/EventEmitters/eventListener';
import socket from './helpers/sockets';
import Passport from './config/localpassportConfig';

Passport(passport);

config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(path.join(__dirname, '../public')));

routes(app);

app.use('/*', (_req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

const port = process.env.PORT || 4000;
const { sequelize, dbUrl } = db;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...', dbUrl);
    socket.socketFunction.socketStartUp(server);
    server.listen(port, console.log(`Listening on port ${port}...`));
  })
  .catch((err) => console.log(`Error: ${err}`));

export default app;
