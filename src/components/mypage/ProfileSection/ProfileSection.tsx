import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@api/axios';
import * as S from './ProfileSection.Styled';

interface ProfileSectionProps {
  onNameClick: () => void;
  onIntroductionClick: () => void;
  isOwnProfile: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  onNameClick,
  onIntroductionClick,
  isOwnProfile,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/mypage');
        const { profile_image, username, followerCount, followingCount, message, badge } =
          response.data;

        setProfileImg(profile_image);
        setNickname(username);
        setIntroduction(message);
        setFollowerCount(followerCount);
        setFollowingCount(followingCount);
        setIsVerified(badge);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing((prev) => !prev);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result) {
          setProfileImg(reader.result as string);

          const formData = new FormData();
          formData.append('file', file);
          const token = localStorage.getItem('token');

          try {
            const response = await axiosInstance.patch('/mypage/profileImage', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });

            if (response.data.profile_image) {
              setProfileImg(response.data.profile_image);
            }
          } catch (error) {
            console.error('Failed to update profile image:', error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('image-upload-input')?.click();
  };

  return (
    <S.ProfileContainer>
      <S.ImgSection onClick={handleImageClick}>
        {profileImg ? (
          <S.Profile src={profileImg} />
        ) : (
          <S.GrayCircle>
            <S.ProfileImg />
          </S.GrayCircle>
        )}
        <S.plusBtn />
        <input
          id='image-upload-input'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </S.ImgSection>
      <S.InfoSection>
        <S.NameSection>
          <S.NameBox>
            <S.Name onClick={onNameClick}>{nickname}</S.Name>
            {isVerified && <S.Verfied />}
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
            <S.FollowCount>{followerCount}</S.FollowCount>
          </S.FollowBox>
          <S.FollowBox>
            <S.Follow>팔로잉</S.Follow>
            <S.FollowCount>{followingCount}</S.FollowCount>
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
