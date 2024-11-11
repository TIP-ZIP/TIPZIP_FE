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
    50: '#FEF9F5',
  },

  TZ_Monochrome: {
    1000: '#000000',
    900: '#2B2B2B',
    500: '#848891',
    300: '#CBD0D5',
    100: '#F3F4F8',
    0: '#FFFFFF',
  },
};
