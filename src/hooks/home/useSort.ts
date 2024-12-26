import { useState } from 'react';

const useSort = () => {
  const [sortOption, setSortOption] = useState('최신순');
  const sortOptionMap: Record<string, string> = {
    최신순: 'recent',
    '오래된 순': 'oldest',
    인기순: 'popular',
  };

  const [selectedSort, setSelectedSort] = useState('recent');

  const handleSortOptionClick = (option: string) => {
    setSortOption(option);
    const mappedOption = sortOptionMap[option] || 'recent';
    setSelectedSort(mappedOption);
  };

  return {
    sortOption,
    selectedSort,
    handleSortOptionClick,
  };
};

export default useSort;
