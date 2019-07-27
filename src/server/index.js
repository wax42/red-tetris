
// TODO passer par des imports et non par des requires ?
// import {Socket} from 'socket.io';
// import {Server} from 'http';
import { HandleClient, handleClient } from './Client.js'

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => handleClient(client));

server.listen(3001);