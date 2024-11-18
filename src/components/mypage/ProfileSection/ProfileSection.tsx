import React, { useState } from 'react';
import * as S from './ProfileSection.Styled';

interface ProfileSectionProps {
  nickname: string;
  introduction: string;
  onNameClick: () => void;
  onIntroductionClick: () => void;
  isOwnProfile: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  nickname,
  introduction,
  onNameClick,
  onIntroductionClick,
  isOwnProfile,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 막음
    setIsFollowing((prev) => !prev);
  };

  return (
    <S.ProfileContainer>
      <S.ImgSection>
        <S.GrayCircle>
          <S.ProfileImg />
        </S.GrayCircle>
        <S.plusBtn />
      </S.ImgSection>
      <S.InfoSection>
        <S.NameSection onClick={onNameClick}>
          <S.NameBox>
            <S.Name>{nickname}</S.Name>
            <S.Verfied />
          </S.NameBox>
          {!isOwnProfile && (
            <S.FollowButtonContainer>
              <S.FollowButton onClick={handleFollowToggle} $isFollowing={isFollowing}>
                {isFollowing ? '팔로잉' : '팔로우'}
              </S.FollowButton>
            </S.FollowButtonContainer>
          )}
        </S.NameSection>
        <S.FollowerInfo>
          <S.FollowBox>
            <S.Follow>팔로워</S.Follow>
            <S.FollowCount>70</S.FollowCount>
          </S.FollowBox>
          <S.FollowBox>
            <S.Follow>팔로잉</S.Follow>
            <S.FollowCount>50</S.FollowCount>
          </S.FollowBox>
        </S.FollowerInfo>
        <S.IntroduceSection onClick={onIntroductionClick}>
          {!introduction && <S.EditIcon />}
          <S.InputText $isFilled={!!introduction}>
            {introduction || '프로필에 자기 소개를 작성해주세요.'}
          </S.InputText>
        </S.IntroduceSection>
      </S.InfoSection>
    </S.ProfileContainer>
  );
};

export default ProfileSection;
