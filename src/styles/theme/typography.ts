import { css, CSSProp } from 'styled-components';

type typography = {
  [key: string]: CSSProp;
};

export const fontStyles: typography = {
  Header1: css`
    font-style: normal;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
  `,
  Header2: css`
    font-style: normal;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
  `,
  Body1: css`
    font-style: normal;
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
  `,
  Body2: css`
    font-style: normal;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
  `,
  Body3: css`
    font-style: normal;
    font-size: 13px;
    font-weight: 500;
    line-height: 22px;
  `,
  Body4: css`
    font-style: normal;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  `,
  Caption1: css`
    font-style: normal;
    font-size: 11px;
    font-weight: 500;
    line-height: 160%;
  `,
  Caption2: css`
    font-style: normal;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
  `,
  Caption3: css`
    font-style: normal;
    font-size: 9px;
    font-weight: 500;
    line-height: normal;
  `,
  Caption4: css`
    font-style: normal;
    font-size: 7px;
    font-weight: 500;
    line-height: normal;
  `,
};
