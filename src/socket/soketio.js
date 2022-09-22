import { getCookieToken, getRefreshToken } from '../shared/Cookie';
import { Server } from 'socket.io';

const myToken = getCookieToken();
const refreshToken = getRefreshToken();
const baseURL = process.env.REACT_APP_API_KEY;

export const io = new Server({
  cors: {
    origin: `${baseURL}`,
  },
});

export default io;
