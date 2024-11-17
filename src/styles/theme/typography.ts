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
    line-height: 22px;
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
    line-height: 160%;
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
    font-size: 0.7rem;
    font-weight: 500;
    line-height: normal;
  `,
};
