import io from 'socket.io-client';

const socketMiddleware = () => {
  const socket = io("http://localhost:3001");

  return ({ dispatch }) => next => (action) => {
    if (typeof action === 'function') {
      return next(action);
    } 

    // SI l'action ne doit pas passer par le serveur
    if (action.event == undefined)
      return next(action);

    let event = "test_server";

    /* let leave = false;
    if (leave) {
      socket.removeListener(event);
    } */
    console.log("SocketMiddlware");

    //  Type --> actionType
    let handle = "handle";
    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
        handleEvent = (result) => {
            console.log("Listenner", result);
            dispatch({ type: handle, result, test:"test"});
        }
    }
    return socket.on(event, handleEvent);
  };
}

export default socketMiddleware;