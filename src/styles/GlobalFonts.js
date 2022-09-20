import { createGlobalStyle } from 'styled-components';
import NotoBold from '../styles/NotoSansKR-Bold.woff';
import NotoLight from '../styles/NotoSansKR-Light.woff';
import PopBold from '../styles/Poppins-Bold.woff';
import PopMedium from '../styles/Poppins-Medium.woff';
import PopLight from '../styles/Poppins-Regular.woff';
import SilkBold from './Silkscreen-Bold.woff';
import SilkLight from './Silkscreen-Regular.woff';

export default createGlobalStyle`		      
  @font-face {
    font-family: 'SilkBold';
    src: local('SilkBold'),   
    url(${SilkBold}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'SilkLight';
    src: local('SilkLight'),   
    url(${SilkLight}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'NotoBold';
    src: local('NotoBold'),   
    url(${NotoBold}) format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'NotoLight';
    src: local('NotoLight'),   
    url(${NotoLight}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'PopBold';
    src: local('PopBold'),   
    url(${PopBold}) format('woff');
    font-display: swap;
  }  

  @font-face {
    font-family: 'PopMedium';
    src: local('PopMedium'),   
    url(${PopMedium}) format('woff');
    font-display: swap;
  }  

  @font-face {
    font-family: 'PopLight';
    src: local('PopLight'),   
    url(${PopLight}) format('woff');
    font-display: swap;
  }
`;
