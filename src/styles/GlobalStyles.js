import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; //브라우저 마다 기본적으로 설치되어있는 스타일을 지워주는 패키지

const GlobalStyle = createGlobalStyle`
${reset}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {

margin: 0;
padding: 0;
border: 0;
font-size: 62.5%;
font: inherit;
vertical-align: baseline;
}

.slick-slide {
	  display: inline-block;
  }

* {
box-sizing: border-box;
}

button {
cursor: pointer;
outline: none;
border: none;
}


html, body {
max-width: 100%;
height: 100vh;
line-height: 1.285;
}


body {
font-weight: 300;
font-family: 'Source Sans Pro', sans-serif;

}
a {
text-decoration:none;
color:inherit;
}`;

export default GlobalStyle;
