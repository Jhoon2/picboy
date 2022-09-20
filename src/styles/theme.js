// *사용 설명서

//color : ${(props) => props.theme.placeholder}

//background : ${({ theme }) => theme.backgroundSet('contain')};

//flex : ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}

//  1200px
//  @media ${({ theme }) => theme.device.laptop} {
//  top: 90%;
//  left: 48.6%;
// }

export const color = {
  //Brand Color
  PrimaryColor: '#000000',
  SecondaryColor: '#FFFFFF',
  ShadeBold: '#868686',
  ShadeRegular: '#A3A3A3',
  ShadeLight: '#F8F8F8',

  //State Color
  SuccessColor: '#2F80ED',
  secondary: '#ED3A3A',

  //Text Color
  basic: '#000000',
  lowrank: '#868686',
  inactive: '#A3A3A3',

  //Background Color
  Background: '#F8F8F8',
};

export const fontSizes = {
  //국문

  Display: '56px',
  Headline: '42px',
  SubTitle: '24px',
  Body: '18px',
  Caption1: '16px',
  Caption2: '14px',
  Caption3: '12px',
  //영문

  HEADLINE1: '15px',
  HEADLINE2: '14px',
  HEADLINE3: '12px',
  //컨셉

  HEADLINECONCEPT1: '65px',
  HEADLINECONCEPT2: '19px',
  HEADLINECONCEPT3: '16px',
};

//자간
export const letters = {
  //국문
  Display: '-0.04em',
  Headline: '-0.04em',
  SubTitle: '-0.04em',
  Body: '-0.04em',
  Caption: '-0.02em',

  //컨셉
  HEADLINE: ' -0.1em',
};

//행간
export const lines = {
  //국문
  Display: '150%',
  Headline: '150%',
  SubTitle: '150%',
  Body: '200%',
  Caption: '180%',

  //컨셉
  HEADLINE: '280%',
};

//텍스트 두께 BD: bold , RG: regular
export const thickness = {
  //국문
  Display: '700',
  HeadlineBD: '700',
  HeadlineRG: '400',
  SubTitleBD: '700',
  SubTitleRG: '400',
  BodyBD: '700',
  BodyRG: '400',
  CaptionBD: '700',
  CaptionRG: '400',

  //영문
  HEADLINEBD: '700',
  HEADLINERG: '400',
};

export const icons = {
  paintIcon: '24px',
  funButton: '32px',
  proFile: '32px',
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
  laptop: '1200px',
  mobile: '360px',
  pc: '1920px',
};

export const device = {
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  pc: `screen and (max-width: ${deviceSizes.pc})`,
};
