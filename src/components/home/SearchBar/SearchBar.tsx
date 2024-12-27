import React from 'react';
import * as S from './SearchBar.Styled';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSearchSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  handleSearchSubmit,
}) => {
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = () => {
    // '/search'로 이동하고, 쿼리 파라미터로 'tags' 값을 전달
    const tagsQuery = selectedTags.join(',');
    navigate(
      `/search?search=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(tagsQuery)}`,
    );
  };

  return (
    <S.SearchBar onClick={() => navigate('/search')} $hasTags={selectedTags.length > 0}>
      <S.SearchIcon onClick={handleSearchSubmit} />
      {selectedTags.length > 0 ? (
        <div>
          <S.Tags>
            {selectedTags.map((tag, index) => (
              <S.Tag key={index}>{tag}</S.Tag>
            ))}
          </S.Tags>
        </div>
      ) : (
        <S.SearchInput
          type='text'
          placeholder='어떤 꿀팁이 궁금하신가요?'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      )}
    </S.SearchBar>
  );
};

export default SearchBar;
