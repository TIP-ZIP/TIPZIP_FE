import styled from 'styled-components';
import ArrowDown from '@assets/svgs/ArrowDown.svg';

export const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 6.7rem;
`;

export const DropdownButton = styled.button`
  padding: 0.4rem;
  border-radius: 0.4rem;
  gap: 0.4rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  }

  span {
    margin-left: auto;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  }
`;

export const Arrow = styled.div<{ $isOpen: boolean }>`
  background: url(${ArrowDown});
  background-repeat: no-repeat;
  background-size: contain;
  width: 1rem;
  height: 0.6rem;
  ${({ $isOpen }) =>
    $isOpen &&
    `
      transform: rotate(180deg);
    `}
`;

export const DropdownList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  top: 100%;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  left: 0;
  right: 0;
  border: none;
  border-radius: 0.4rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 2;
  padding: 0.45rem;
  overflow-x: hidden;
`;

export const DropdownItem = styled.li<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  border-radius: 0.2rem;
  width: 5.8rem;
  height: 1.8rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[600]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
    color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
    background-color:#FFEDE9;
    color: ${theme.colors.TZ_Signature[500]};
  `}
`;
