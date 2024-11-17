import React, { useState } from 'react';
import * as S from './Mypage.Styled';
import PostList from '@components/home/PostList/PostList';
import { postsData } from '@constants/PostData';

const Mypage: React.FC = () => {
  const [posts, setPosts] = useState(postsData);

  const handleBookmarkClick = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isFilled: !post.isFilled,
              bookmarks: post.isFilled ? post.bookmarks - 1 : post.bookmarks + 1,
            }
          : post,
      ),
    );
  };

  return (
    <S.Container>
      <S.Zip>
        <S.ZipShape>마이 페이지</S.ZipShape>
        <S.ZipLine />
      </S.Zip>
      <S.ProfileContainer>
        <S.ImgSection>
          <S.GrayCircle>
            <S.ProfileImg />
          </S.GrayCircle>
          <S.plusBtn />
        </S.ImgSection>
        <S.InfoSection>
          <S.NameSection>
            <S.Name>아기 사자 🦁</S.Name>
            <S.Verfied />
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
          <S.IntroduceSection>
            <S.EditIcon />
            <S.InputText>프로필에 자기 소개를 작성해주세요.</S.InputText>
          </S.IntroduceSection>
        </S.InfoSection>
      </S.ProfileContainer>
      <S.GrayLine />
      <S.PostSection>
        <S.PostInfo>
          <S.PostText>게시물</S.PostText>
          <S.PostCount>6개</S.PostCount>
        </S.PostInfo>
        <PostList
          posts={posts}
          handleBookmarkClick={handleBookmarkClick}
          $isMypage={window.location.pathname === '/mypage'}
        />
      </S.PostSection>
      <S.Text>아기 사자 🦁 님만의 꿀팁을 공유해주세요!</S.Text>
    </S.Container>
  );
};
export default Mypage;
