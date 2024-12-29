import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '@api/axios';
import * as S from './ProfileSection.Styled';
import KAKAOICON from '@assets/svgs/kakaoIcon.svg';
import NAVERICON from '@assets/svgs/naverIcon.svg';
import GOOGLEICON from '@assets/svgs/googleIcon.svg';

interface ProfileSectionProps {
  username: string;
  message: string;
  onNameClick: (newName: string) => void;
  onIntroductionClick: (newMessage: string) => void;
  isOwnProfile: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  username: initialUsername,
  message: initialMessage,
  onNameClick,
  onIntroductionClick,
}) => {
  const { writerid } = useParams<{ writerid: string }>();
  const [isOwnProfile, setIsOwnProfile] = useState(true); // 자기 프로필 여부
  const [following, setFollowing] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [username, setUsername] = useState(initialUsername);
  const [message, setMessage] = useState(initialMessage);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [socialProvider, setSocialProvider] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        // URL에 writerid가 있으면 해당 writerid로, 없으면 자기 프로필
        const endpoint = writerid ? `/mypage/${writerid}` : `/mypage/`;
        const response = await axiosInstance.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response.data);

        const {
          profile_image,
          username,
          followerCount,
          followingCount,
          message,
          badge,
          following,
          social_provider,
          email,
        } = response.data;

        setProfileImg(profile_image);
        setUsername(username || '사용자');
        setMessage(message);
        setFollowerCount(followerCount);
        setFollowingCount(followingCount);
        setIsVerified(badge);
        setFollowing(following);
        setSocialProvider(social_provider);
        setEmail(email);
        setIsOwnProfile(!writerid);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, [writerid]);
  useEffect(() => {
    setUsername(initialUsername); // username 값이 변경되면 상태 업데이트
  }, [initialUsername]); // 초기값 변경 시에만 동작하도록 설정

  useEffect(() => {
    setMessage(initialMessage); // message 값이 변경되면 상태 업데이트
  }, [initialMessage]);
  const socialProviderIcons: { [key: string]: string } = {
    KAKAO: KAKAOICON,
    NAVER: NAVERICON,
    GOOGLE: GOOGLEICON,
  };

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const accessToken = localStorage.getItem('accessToken');

    try {
      const endpoint = `/follow/${writerid}`;
      if (!following) {
        // Follow the user
        await axiosInstance.post(endpoint, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFollowing(true);
        setFollowerCount(followerCount + 1);
      } else {
        // Unfollow the user
        await axiosInstance.delete(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFollowing(false);
        setFollowerCount(followerCount - 1);
      }
    } catch (error) {
      console.error('Error following/unfollowing', error);
      alert('팔로우 상태를 변경하는데 문제가 발생했습니다.');
    }
  };
  const handleNameClick = (newName: string) => {
    setUsername(newName); // 상태 업데이트
    onNameClick(newName); // 상위 컴포넌트에 변경 사항 전달
  };

  const handleIntroductionClick = (newMessage: string) => {
    setMessage(newMessage); // 상태 업데이트
    onIntroductionClick(newMessage); // 상위 컴포넌트에 변경 사항 전달
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

            // 서버에서 받은 프로필 이미지 URL 확인
            if (response.status === 200) {
              setProfileImg(response.data.imageUrl); // 서버에서 받은 프로필 이미지로 업데이트
            } else {
              throw new Error('Invalid response from server');
            }
          } catch (error) {
            console.error('Failed to update profile image:', error);
            alert('이미지 최대 크기를 초과하였습니다.');
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
      <S.ImgSection onClick={isOwnProfile ? handleImageClick : undefined}>
        {profileImg ? (
          <S.Profile src={profileImg} />
        ) : (
          <S.GrayCircle>
            <S.ProfileImg />
          </S.GrayCircle>
        )}
        {isOwnProfile && <S.plusBtn />}
        <input
          id='image-upload-input'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </S.ImgSection>
      <S.InfoSection>
        <S.NameSection $isOwnProfile={isOwnProfile}>
          <S.NameBox>
            <S.Name onClick={() => handleNameClick(username)}>{username}</S.Name>
            {isVerified && <S.Verfied />}
          </S.NameBox>
          {!isOwnProfile && (
            <S.FollowButtonContainer>
              <S.FollowButton onClick={handleFollowToggle} $isFollowing={following}>
                {following ? '팔로잉' : '팔로우'}
              </S.FollowButton>
            </S.FollowButtonContainer>
          )}
        </S.NameSection>{' '}
        <S.SocialSection>
          {socialProvider && (
            <S.SocialIcon
              src={socialProviderIcons[socialProvider]}
              alt={`${socialProvider} icon`}
            />
          )}
          {email && <S.Email>{email}</S.Email>}
        </S.SocialSection>
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
        <S.IntroduceSection onClick={() => handleIntroductionClick(message)}>
          {!message && <S.EditIcon />}
          <S.InputText $isFilled={!!message}>
            {message || '프로필에 자기 소개를 작성해주세요.'}
          </S.InputText>
        </S.IntroduceSection>
      </S.InfoSection>
    </S.ProfileContainer>
  );
};

export default ProfileSection;
