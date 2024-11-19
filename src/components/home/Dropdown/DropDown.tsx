import React, { useEffect, useRef } from 'react';
import * as S from './Dropdown.Styled';

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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleDropdown(); // 열려있을 때만 닫히도록 조건 추가
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownButton onClick={toggleDropdown}>
        {sortOption}
        <S.Arrow $isOpen={isOpen} />
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownList>
          {['최신순', '오래된 순', '인기순'].map((option) => (
            <S.DropdownItem
              key={option}
              $selected={sortOption === option}
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
