import { css, CSSProp } from 'styled-components';

type typography = {
  [key: string]: CSSProp;
};

export const fontStyles: typography = {
  Header1: css`
    font-style: normal;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: normal;
  `,
  Header2: css`
    font-style: normal;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.1931rem;
  `,
  Body1: css`
    font-style: normal;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.1187rem;
  `,
  Body2: css`
    font-style: normal;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: normal;
  `,
  Body3: css`
    font-style: normal;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.375rem;
  `,
  Body4: css`
    font-style: normal;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: normal;
  `,
  Caption1: css`
    font-style: normal;
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1.1rem;
  `,
  Caption2: css`
    font-style: normal;
    font-size: 0.625rem;
    font-weight: 500;
    line-height: 0.7456rem;
  `,
  Caption3: css`
    font-style: normal;
    font-size: 0.5625rem;
    font-weight: 500;
    line-height: 0.6713rem;
  `,
  Caption4: css`
    font-style: normal;
    font-size: 0.5rem;
    font-weight: 500;
    line-height: 0.5969rem;
  `,
  Caption5: css`
    font-style: normal;
    font-size: 0.4375rem;
    font-weight: 500;
    line-height: 0.5219rem;
  `,
  Caption6: css`
    font-style: normal;
    font-size: 0.5rem;
    font-weight: 400;
    line-height: 0.5969rem;
  `,
  Caption7: css`
    font-style: normal;
    font-size: 0.5625rem;
    font-weight: 400;
    line-height: 0.6713rem;
  `,
  Caption8: css`
    font-style: normal;
    font-size: 0.625rem;
    font-weight: 400;
    line-height: 0.7456rem;
  `,
  Caption9: css`
    font-style: normal;
    font-size: 0.6875rem;
    font-weight: 400;
    line-height: 1.1rem;
  `,
  Caption10: css`
    font-style: normal;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 0.895rem;
  `,
};
