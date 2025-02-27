import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const OptionHeaderContainer = styled.div`
  width: 100%;
  padding: 2.2rem 3.4rem 0.1rem;
`;

export const FoldersContainer = styled.div<{ type: 'category' | 'personal' }>`
  padding: 2.1rem 3.4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13.56rem, 1fr));
  gap: ${({ type }) => type === 'category' ? '1.3rem 3.5rem' : '2rem 3.5rem'};
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

export const NewFolderCard = styled.div`
  width: 13.56rem;
  height: 10.097rem;
  position: relative;
  cursor: pointer;
`;

export const NewFolderBackground = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.15));
`;

export const PlusIcon = styled.img`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: calc(100% - 4rem);
  margin: 0 2rem 2rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.TZ_Monochrome[200]};
  border-radius: 0.8rem;
  ${({ theme }) => theme.fontStyles.Body2};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.TZ_Monochrome[400]};
  }
`;

export const EditorBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 0.3rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
`;

export const EditorContainer = styled.div`
  position: relative;
`;

export const InputBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-self: baseline;
`;

export const EditorInput = styled.input`
  ${({ theme }) => theme.fontStyles.Caption1}
  height: 10.2rem;
  width: 100%;
  padding-left: 2.8rem;
  text-align: left;
  outline: none;
  border: none;
  padding-bottom: 1.1rem;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
  box-sizing: border-box;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.TZ_Monochrome[400]};
  }
`;

export const CharCount = styled.div`
  ${({ theme }) => theme.fontStyles.Caption4}
  position: absolute;
  bottom: 4.6rem;
  right: 2.7rem;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
`;