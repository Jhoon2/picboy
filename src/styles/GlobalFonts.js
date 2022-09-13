import { createGlobalStyle } from 'styled-components';
import SilkBold from './Silkscreen-Bold.ttf';
import SilkLight from './Silkscreen-Regular.ttf';
import NotoBold from './NotoSansKR-Bold.otf';
import NotoLight from './NotoSansKR-Light.otf';
import PopLight from '../styles/Poppins-Regular.ttf';

export default createGlobalStyle`		      
  @font-face {
    font-family: 'SilkBold';
    src: local('SilkBold'),   
    url(${SilkBold}) format('woff');
		
    font-style: normal;
  }
  @font-face {
    font-family: 'SilkLight';
    src: local('SilkLight'),   
    url(${SilkLight}) format('woff');
	
    font-style: normal;
  }
  @font-face {
    font-family: 'NotoBold';
    src: local('NotoBold'),   
    url(${NotoBold}) format('woff');
		
    font-style: normal;
  }
  @font-face {
    font-family: 'NotoLight';
    src: local('NotoLight'),   
    url(${NotoLight}) format('woff');
		
    font-style: normal;
  }

  @font-face {
    font-family: 'PopLight';
    src: local('PopLight'),   
    url(${PopLight}) format('woff');
	
    font-style: normal;
  }
`;
