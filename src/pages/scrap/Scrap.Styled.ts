import styled from 'styled-components';

// Container
export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
`;

// Header
export const Header = styled.div`
  width: 100%;
  height: 10rem;
  
  background: #ff4a22;
`;
export const Title = styled.div`
  margin-left: 2.3rem;
  padding-top: 2.2rem;
  color: white;
  ${({ theme }) => theme.fontStyles.Body1};
  word-wrap: break-word;
`;

// Tabs
export const TabContainer = styled.div`
  width: 12.5rem;
  height: 2.8rem;
  margin-left: 2rem;
  margin-top: 1rem;
  position: relative;
`;

export const TabBackground = styled.div`
  width: 12.5rem;
  height: 2.8rem;
  background: white;
  position: absolute;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
`;

export const ActiveTab = styled.div<{ isPersonal: boolean }>`
  height: 2.2rem;
  position: absolute;
  background: #ff4a22;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
  margin: 0.3rem 0.4rem;
  transition: all 0.3s ease-in-out;
  width: ${props => props.isPersonal ? '5.5rem' : '6.5rem'};
  transform: translateX(${props => props.isPersonal ? '6.25rem' : '0'});
`;

export const TabTextActive = styled.div<{ isActive: boolean }>`
  position: absolute;
  left: 1.1rem;
  top: 0.9rem;
  color: ${props => props.isActive ? 'white' : '#838991'};
  ${({ theme }) => theme.fontStyles.Caption4};
  word-wrap: break-word;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
`;

export const TabTextInactive = styled.div<{ isActive: boolean }>`
  position: absolute;
  left: 7.2rem;
  top: 0.9rem;
  color: ${props => props.isActive ? 'white' : '#838991'};
  ${({ theme }) => theme.fontStyles.Caption4};
  word-wrap: break-word;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
`;

