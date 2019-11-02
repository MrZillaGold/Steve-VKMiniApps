import { useEffect } from 'react';

function useSockets(socket, channels) {
  useEffect(() => {
    if (socket && socket.connected) {
      channels.forEach(channel => {
        socket.on(channel.name, channel.handler);
      });
    }
  });

  useEffect(() => {
    return () => {
      if (socket && socket.connected) {
        channels.forEach(channel => {
          socket.off(channel.name, channel.handler);
        });
      }
    }
  });
}

export default useSockets;
