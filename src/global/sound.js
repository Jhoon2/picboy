import up from '../sound/up.wav';
import error from '../sound/error.wav';
import error1 from '../sound/error1.wav';
import error2 from '../sound/error2.wav';
import error3 from '../sound/error3.mp3';
import button from '../sound/button.mp3';
import headerbutton from '../sound/headerbutton.mp3';
import menu from '../sound/menu.wav';
import pop1 from '../sound/pop1.wav';
import start from '../sound/start.wav';
import coin from '../sound/coin.wav';
import coin1 from '../sound/coin1.wav';

const upPB = new Audio(up);
const errorPB = new Audio(error);
const error1PB = new Audio(error1);
const error2PB = new Audio(error2);
const error3PB = new Audio(error3);
const buttonPB = new Audio(button);
const headerPB = new Audio(headerbutton);
const pop1PB = new Audio(menu);
const popPB = new Audio(pop1);
const startPB = new Audio(start);
const coinPB = new Audio(coin);
const coin1PB = new Audio(coin1);

export {
  upPB,
  errorPB,
  error1PB,
  error2PB,
  error3PB,
  buttonPB,
  headerPB,
  pop1PB,
  popPB,
  startPB,
  coinPB,
  coin1PB,
};
