import styled from 'styled-components';


// Categories
export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const OptionHeaderContainer = styled.div`
    width: 100%;
    padding: 2.1rem 3.4rem 0;
`;

export const PersonalContainer = styled.div`
    padding: 2.1rem 3.4rem;
    display: grid;
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

export const DeleteIcon = styled.img`
    position: absolute;
    width: 1.3rem;
    height: 1.3rem;
    z-index: 1;
    top: 2.1rem;
    right: 0.56rem;
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

export const ScrapOption = styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
`;

export const ScrapOptionIcon = styled.img`
    width: 2.5rem;
    height: 0.7rem;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    margin-top: 0.3rem;
    top: 100%;
    z-index: 1;
`;

export const DropdownIcon = styled.img`
    width: 5.1rem;
    height: 2.95rem;
`;

export const IconLeft = styled.div`
    position: absolute;
    left: 0.9rem;
    top: 65%;
    transform: translateY(-50%);
`;

export const IconRight = styled.div`
    position: absolute;
    right: 0.9rem;
    top: 65%;
    transform: translateY(-50%);
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
`;

export const Icon = styled.img`
    width: 1rem;
    height: 1rem;
`;