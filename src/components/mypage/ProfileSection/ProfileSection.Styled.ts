import styled from 'styled-components';
import grayprofile from '@assets/svgs/grayProfile.svg';
import changeImg from '@assets/svgs/Plus.svg';
import edit from '@assets/svgs/Edit.svg';
import shield from '@assets/svgs/shield.svg';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4.4rem;
  padding: 2.7rem 2.5rem 3.1rem 3.1rem;
  width: 100%;
`;

export const Profile = styled.img`
  width: 7.9rem;
  height: 7.9rem;
  border-radius: 100%;
`;
export const GrayCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
  width: 7.9rem;
  height: 7.9rem;
  border-radius: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
`;

export const ProfileImg = styled.div`
  background: url(${grayprofile});
  background-repeat: no-repeat;
  background-size: contain;
  width: 5.35rem;
  cursor: pointer;
  height: 5.35rem;
`;

export const plusBtn = styled.div`
  background: url(${changeImg});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  right: 0.001rem;
  bottom: 0;
  width: 1.6rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  height: 1.6rem;
  cursor: pointer;
`;

export const ImgSection = styled.div`
  position: relative;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameSection = styled.div`
  display: flex;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
  margin-bottom: 0.8rem;
  gap: 0.8rem;
  padding: 0.4rem 1rem;
  width: fit-content;
  text-align: center;
`;
export const Name = styled.span`
  ${({ theme }) => theme.fontStyles.Header2}
`;

export const Verfied = styled.span`
  background: url(${shield});
  background-repeat: no-repeat;
  background-size: contain;
  width: 1.6rem;
  height: 1.6rem;
`;

export const FollowerInfo = styled.div`
  display: flex;
  gap: 1.9rem;
  height: 1.8rem;
  margin-bottom: 0.6rem;
`;

export const FollowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
`;

export const Follow = styled.span`
  ${({ theme }) => theme.fontStyles.Capiton1}
  color: ${({ theme }) => theme.colors.TZ_Monochrome[700]};
  font-size: 1.1rem;
`;

export const FollowCount = styled.span`
  ${({ theme }) => theme.fontStyles.Capiton1}
  color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  font-size: 1.1rem;
`;

export const IntroduceSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 19.7rem;
  padding: 0.7rem 0;
  padding-left: 0.8rem;
  gap: 0.6rem;
  height: 2.2rem;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
`;

export const InputText = styled.div<{ $isFilled: boolean }>`
  ${({ theme }) => theme.fontStyles.Capiton4}
  color: ${(props) =>
    props.$isFilled
      ? props.theme.colors.TZ_Monochrome[1000]
      : props.theme.colors.TZ_Monochrome[500]};
  font-size: 0.7rem;
`;

export const EditIcon = styled.div`
  background: url(${edit});
  background-repeat: no-repeat;
  background-size: contain;
  width: 0.675rem;
  cursor: pointer;
  height: 0.675rem;
  transform: scale(1.4);
`;

export const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const FollowButtonContainer = styled.div`
  display: flex;
`;

export const FollowButton = styled.button<{ $isFollowing: boolean }>`
  ${({ theme }) => theme.fontStyles.Caption4}
  background-color: ${(props) =>
    props.$isFollowing
      ? props.theme.colors.TZ_Monochrome[1000]
      : props.theme.colors.TZ_Monochrome[300]};
  color: ${(props) =>
    props.$isFollowing
      ? props.theme.colors.TZ_Monochrome[0]
      : props.theme.colors.TZ_Monochrome[1000]};
  border-radius: 1rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
`;
