export const color = {
  // gray-scales
  black: '#000',
  dark: '#191a20',
  primary: '#3f4150',
  secondary: '#8c8d96',
  tertiary: '#757575',
  placeholder: '#BDBDBD',
  border: '#e0e2e7',
  background: '#f7f8fa',
  white: '#fff',

  // theme-colors
  blue: '#33C5EF',
  darkBlue: '#06ADDA',
  lightBlue: '#92DDF6',

  // other-colors
  red: '#FF617A',
};

export const fontSizes = {
  small: '30px',
  xl: '50px',
};

export const flexSet = (dire = 'column', just = 'center', align = 'center') => {
  return `display: flex;
  flex-direction: ${dire};
  justify-content: ${just};
  align-items: ${align};`;
};
export const backgroundSet = (size = 'cover') => {
  return `background-position: center;
  background-size: ${size};
  background-repeat: no-repeat;`;
};

const deviceSizes = {
  mobile: '360px',
  laptop: '1200px',
};

export const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};
