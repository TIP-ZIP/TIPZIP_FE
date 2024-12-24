import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@api/axios';
import * as S from './ProfileSection.Styled';

interface ProfileSectionProps {
  nickname: string; // 추가
  introduction: string; // 추가
  onNameClick: () => void; // 추가
  onIntroductionClick: () => void; // 추가
  isOwnProfile: boolean; // 추가
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
        const accessToken = localStorage.getItem('accessToken');
        const response = await axiosInstance.get('/mypage/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response.data);

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
    const MAX_FILE_SIZE_MB = 5; // 최대 파일 크기 (MB)
    const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 바이트 단위로 변환

    const file = e.target.files?.[0];
    const originalProfileImg = profileImg; // 기존 프로필 이미지 저장

    if (file) {
      // 파일 크기 초과 확인
      if (file.size > MAX_FILE_SIZE) {
        alert(`이미지 파일 크기는 최대 ${MAX_FILE_SIZE_MB}MB까지만 업로드 가능합니다.`);
        return; // 업로드 중단
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result) {
          const tempPreview = reader.result as string; // 임시 미리보기 이미지
          setProfileImg(tempPreview); // 미리보기 설정

          const formData = new FormData();
          formData.append('file', file);
          const token = localStorage.getItem('accessToken');

          try {
            const response = await axiosInstance.patch('/mypage/profileImage', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });

            if (response.data.profile_image) {
              setProfileImg(response.data.profile_image); // 서버에서 받은 프로필 이미지로 업데이트
            } else {
              throw new Error('Invalid response from server');
            }
          } catch (error) {
            console.error('Failed to update profile image:', error);
            alert('프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
            setProfileImg(originalProfileImg); // 기존 이미지로 복구
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
