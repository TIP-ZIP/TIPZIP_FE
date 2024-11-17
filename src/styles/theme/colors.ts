type ColorShades = {
  [key: number]: string;
};

type Colors = {
  TZ_Signature: ColorShades;
  TZ_Monochrome: ColorShades;
};

export const colors: Colors = {
  TZ_Signature: {
    500: '#FF4A22',
    300: '#FF896F',
    100: '#FFEDE9',
    50: '#FDF9F4',
  },

  TZ_Monochrome: {
    1000: '#000000',
    900: '#192028',
    700: '#565C64',
    500: '#838991',
    300: '#CBD0D5',
    100: '#F2F4F6',
    0: '#FFFFFF',
  },
};
