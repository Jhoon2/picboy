import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import GlobalFonts from './styles/GlobalFonts';
import { BrowserRouter } from 'react-router-dom';
import Scrolltop from './global/Scrolltop';
import {
  color,
  fontSizes,
  letters,
  lines,
  thickness,
  icons,
  device,
  flexSet,
  backgroundSet,
} from './styles/theme';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider
      theme={{
        ...color,
        ...fontSizes,
        ...letters,
        ...lines,
        ...thickness,
        ...icons,
        device,
        flexSet,
        backgroundSet,
      }}
    >
      <GlobalStyle />
      <GlobalFonts />
      <BrowserRouter>
        <Scrolltop />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
