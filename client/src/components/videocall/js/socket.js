/* global SOCKET_HOST */
import io from 'socket.io-client';

const socket = io("/");
export default socket;
