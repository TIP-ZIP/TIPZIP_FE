import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 768px;
  min-width: 375px;
  min-height: 100vh;
  padding: 2rem 0;
  padding-top: 1rem;
`;

export const Zip = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const ZipShape = styled.div`
  display: flex;
  flex: 0;
  align-items: center;
  justify-content: center;
  min-width: 10.12rem;
  width: 100%;
  height: 3.6rem;
  border-radius: 0px 15px 0px 0px;
  background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  ${({ theme }) => theme.fontStyles.Body1}
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  font-size: 1.5rem;
`;

export const ZipLine = styled.div`
  flex: 1;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
`;

export const Text = styled.div`
  ${({ theme }) => theme.fontStyles.Body4}
  text-align: center;
  margin-bottom: 3.9rem;
  margin-top: 6.4rem;
`;

export const ThickLine = styled.div`
  width: 100%;
  min-width: 3.75rem;
  height: 0.3rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
`;

export const GrayLine = styled.div`
  width: 100%;
  min-width: 3.75rem;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
`;

export const PostWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
