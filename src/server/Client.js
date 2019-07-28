// const EVENT = require { EVENT } from '../common/common';

const handleClient = (socket) => {
    console.log('connect', socket.id);

    // Examples
    client.on('event', data => { 
        console.log(data);
      });
      setTimeout(() => {
          console.log("Emit msg");
          client.emit("test_server", "Salut");
      },10000)


    //   client.on('', data => {

    //   }


    client.on('disconnect', () => {
        console.log('disconnect', socket.id);
    });
}

module.exports = { handleClient }