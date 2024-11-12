import React from 'react';
import * as S from '@pages/home/Home.Styled';

interface DropdownProps {
  isOpen: boolean;
  sortOption: string;
  handleSortOptionClick: (option: string) => void;
  toggleDropdown: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  sortOption,
  handleSortOptionClick,
  toggleDropdown,
}) => {
  return (
    <S.DropdownContainer>
      <S.DropdownButton onClick={toggleDropdown}>
        {sortOption}
        <S.Arrow $isOpen={isOpen} />
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownList>
          {['최신순', '오래된 순', '인기순'].map((option) => (
            <S.DropdownItem
              key={option}
              selected={sortOption === option}
              onClick={() => handleSortOptionClick(option)}
            >
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
