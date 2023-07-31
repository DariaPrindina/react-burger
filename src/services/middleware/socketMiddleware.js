export const socketMiddleware = (wsUrl, wsActions, auth = false) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const accessToken = localStorage.getItem('accessToken')

      if (type === wsInit) {
        if (auth) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (type === onClose) {
        socket.close(1000, 'CLOSE_NORMAL')
      }
      
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};