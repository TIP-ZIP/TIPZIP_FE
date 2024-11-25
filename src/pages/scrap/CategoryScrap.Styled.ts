import styled from 'styled-components';


// Categories
export const CategoriesContainer = styled.div`
  margin: 2.1rem 3.4rem;
  display: grid;
  /* 
    - 최소 너비 13.56rem 보장
    - 남는 공간은 1fr로 균등 분배    
    - 카드 최소 너비 13.56rem 유지
  */
  grid-template-columns: repeat(auto-fit, minmax(13.56rem, 1fr));
  gap: 3.5rem;
  justify-items: center;
`;

export const CategoryCard = styled.div`
  width: 13.56rem;
  height: 10.097rem;
  position: relative;
  cursor: pointer;
`;

export const CardBackground = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.15));
`;

export const CategoryName = styled.div`
  position: absolute;
  width: 100%;
  top: 5.1rem;
  text-align: center;
  color: #ff4a22;
  ${({ theme }) => theme.fontStyles.Caption2};
  word-wrap: break-word;
`;

export const Badge = styled.div`
  position: absolute;
  bottom: 0.39rem;
  right: 0.36rem;
  width: 2.2rem;
  height: 2.2rem;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const BadgeIcon = styled.img`
  width: 1.424rem;
  height: 1.773rem;
`;

export const BadgeText = styled.div`
  position: absolute;
  ${({ theme }) => theme.fontStyles.Caption5};
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  word-wrap: break-word;
  margin-bottom: 0.2rem;
`;
