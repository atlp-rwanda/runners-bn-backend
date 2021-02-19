import 'dotenv/config';
import sockets from 'socket.io';

const io = sockets();
const socketFunction = {};
let newClient = null;
socketFunction.socketStartUp = (server) => {
  io.attach(server);
  io.on('connection', async (client) => {
    console.log('New client successfully connected!');
    newClient = client;
    client.on('disconnect', () => {
      console.log('Client disconnected....');
    });
  });
};

export default { socketFunction, io, newClient };
