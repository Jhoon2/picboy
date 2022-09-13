import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import GlobalFonts from './styles/GlobalFonts';
import {
  color,
  fontSizes,
  device,
  flexSet,
  backgroundSet,
} from './styles/theme';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider
      theme={{ ...color, ...fontSizes, device, flexSet, backgroundSet }}
    >
      <GlobalStyle />
      <GlobalFonts />
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
