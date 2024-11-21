import styled from 'styled-components';

export const PostSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 2.2rem;
  padding-right: 0.9rem;
  gap: 2.4rem;
`;

export const PostText = styled.span`
  color: ${({ theme }) => theme.colors.TZ_Monochrome[700]};
  font-size: 1.1rem;
  ${({ theme }) => theme.fontStyles.Body2}
`;
export const PostCount = styled.span`
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  font-size: 1.1rem;
  ${({ theme }) => theme.fontStyles.Body5}
`;

export const PostInfo = styled.div`
  gap: 0.4rem;
  display: flex;
  align-self: flex-start;
  margin-top: 2rem;
`;
