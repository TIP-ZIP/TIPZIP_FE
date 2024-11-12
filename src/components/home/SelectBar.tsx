import React from 'react';
import * as S from '@pages/home/Home.Styled';

interface SelectBarProps {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBar: React.FC<SelectBarProps> = ({ selectedItem, setSelectedItem }) => {
  return (
    <S.SelectBar>
      <S.SelectItem $selected={selectedItem === '전체'} onClick={() => setSelectedItem('전체')}>
        전체
      </S.SelectItem>
      <S.SelectItem $selected={selectedItem === '팔로잉'} onClick={() => setSelectedItem('팔로잉')}>
        팔로잉
      </S.SelectItem>
    </S.SelectBar>
  );
};

export default SelectBar;
