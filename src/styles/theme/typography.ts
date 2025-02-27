import { css, CSSProp } from 'styled-components';

type typography = {
  [key: string]: CSSProp;
};

export const fontStyles: typography = {
  Header1: css`
    font-style: normal;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: normal;
  `,
  Header2: css`
    font-style: normal;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: normal;
  `,
  Body1: css`
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: normal;
  `,
  Body2: css`
    font-style: normal;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: normal;
  `,
  Body3: css`
    font-style: normal;
    font-size: 1.3rem;
    font-weight: 500;
    line-height: normal;
  `,
  Body4: css`
    font-style: normal;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: normal;
  `,
  Body5: css`
    font-style: normal;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 150%;
  `,
  Caption1: css`
    font-style: normal;
    font-size: 1.1rem;
    font-weight: 500;
    line-height: normal;
  `,
  Caption2: css`
    font-style: normal;
    font-size: 1rem;
    font-weight: 500;
    line-height: normal;
  `,
  Caption3: css`
    font-style: normal;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: normal;
  `,
  Caption4: css`
    font-style: normal;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: normal;
  `,
  Caption5: css`
    font-style: normal;
    font-size: 0.7rem;
    font-weight: 500;
    line-height: normal;
  `,
  Caption6: css`
    font-style: normal;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: normal;
  `,
  Caption7: css`
    font-style: normal;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: normal;
  `,
  Caption8: css`
    font-style: normal;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2rem;
  `,
  Caption9: css`
    font-style: normal;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: normal;
  `,
  Caption10: css`
    font-style: normal;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: normal;
  `,
};
