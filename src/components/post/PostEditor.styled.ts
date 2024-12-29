import styled from 'styled-components';
import { colors } from '@styles/theme/colors';
import videoIcon from '@assets/svgs/video.svg';
import cameraIcon from '@assets/svgs/camera.svg';

export const ContentSection = styled.section`
  margin-bottom: 3.2rem;
`;

export const ContentLabel = styled.label`
  display: block;
  ${({ theme }) => theme.fontStyles.Body4};
  color: ${colors.TZ_Monochrome[1000]};
  margin-bottom: 1.2rem;
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 30rem;
  padding: 1.2rem 1.7rem;
  border: none;
  border-radius: 8px;
  background-color: ${colors.TZ_Monochrome[100]};
  ${({ theme }) => theme.fontStyles.Caption9};
  line-height: 1.6;
  outline: none;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    background-color: ${colors.TZ_Signature[50]};
  }

  &::placeholder {
    color: ${colors.TZ_Monochrome[300]};
  }
`;

export const MediaButtons = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const MediaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.2rem;
  border: 0.6px solid ${colors.TZ_Monochrome[500]};
  border-radius: 8px;
  background: none;
  ${({ theme }) => theme.fontStyles.Caption8};
  color: ${colors.TZ_Monochrome[500]};
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    ${({ theme }) => theme.fontStyles.Caption8};
    cursor: pointer;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const CameraIcon = styled.img.attrs({
  src: cameraIcon,
  alt: 'Camera',
})`
  width: 1.2rem;
  height: 1.1rem;
`;

export const VideoIcon = styled.img.attrs({
  src: videoIcon,
  alt: 'Video',
})`
  width: 1.2rem;
  height: 1.1rem;
`;

export const QuillWrapper = styled.div`
  .ql-container {
    min-height: 30rem;
    max-height: 60rem;
    background-color: ${colors.TZ_Monochrome[100]};
    border-radius: 0 0 8px 8px;
    font-family: inherit;
  }

  .ql-editor {
    min-height: 30rem;
    max-height: 60rem;
    ${({ theme }) => theme.fontStyles.Caption9};
    line-height: 1.6;

    &.ql-blank::before {
      color: ${colors.TZ_Monochrome[300]};
      font-style: normal;
    }

    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: auto;
    }
  }

  .ql-toolbar {
    border-radius: 8px 8px 0 0;
    background-color: ${colors.TZ_Monochrome[100]};
  }

  .ql-toolbar, .ql-container {
    border: none;
  }
`;
