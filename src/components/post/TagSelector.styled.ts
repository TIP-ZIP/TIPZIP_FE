import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@styles/theme/colors';

export const CategorySelector = styled.div<{ $showTags: boolean; $category?: string }>`
    display: flex;
    gap: 0.8rem;
    overflow-x: auto;
    margin-bottom: ${({ $showTags, $category }) => $showTags && $category ? '1.2rem' : '3.2rem'};
    
    /* 스크롤바 숨기기 */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const CategoryChip = styled.div<{ $active?: boolean }>`
    padding: 0.8rem 1rem;
    border-radius: 4px;
    background-color: ${({ $active }) => ($active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[100])};
    color: ${({ $active }) => ($active ? colors.TZ_Monochrome[0] : colors.TZ_Monochrome[500])};
    font-size: ${({ theme }) => theme.fontStyles.Caption8};
    white-space: nowrap;
    cursor: pointer;
`;

export const TagContainer = styled(motion.div)`
    margin-top: 0;
    margin-bottom: 3.2rem;
    overflow: hidden;
`;

export const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
`;

export const TagChip = styled.div<{ $active?: boolean }>`
    padding: 0.8rem 1rem;
    border-radius: 4px;
    color: ${({ $active }) => 
        $active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[300]};
    border: 0.6px solid ${({ $active }) => 
        $active ? colors.TZ_Signature[500] : colors.TZ_Monochrome[300]};
    font-size: ${({ theme }) => theme.fontStyles.Caption8};
    cursor: pointer;
    transition: all 0.2s ease;
`; 