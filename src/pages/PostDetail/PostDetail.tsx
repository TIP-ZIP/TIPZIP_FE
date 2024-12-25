import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorSection from '@components/mypage/EditorSection/EditorSection';
import axios from 'axios';

import * as S from './PostDetail.styled';
import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';

interface PostImage {
  image_id: number;
  image_url: string;
  insert_position: number;
}

interface PostDetail {
  post_id: number;
  profile_img?: string;
  author: string;
  certificated_user: boolean;
  created_at: string;
  title: string;
  category: string;
  content: string;
  images?: PostImage[];
  hashtags: string[];
  scrap_count: number;
  is_scrapped: boolean;
  link_url?: string;
  thumbnail_url: string;
}

//   type Params = {
//     id: string;
//   };

const PostDetail: React.FC = () => {
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);

  // const [scrapCount, setScrapCount] = useState<number | undefined>(postDetail?.scrap_count); // 추후 API 연동 시 사용
  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(postDetail?.is_scrapped);
  const [showEditor, setShowEditor] = useState(false);

  const navigate = useNavigate();

  //   const { id } = useParams<Params>();
  //   const numericId = parseInt(id || '', 10);

  const handleLinkClick = (url: string | undefined) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };

  const handleScrapClick = async () => {
    try {
      if (postDetail) {
        const updatedPostDetail = {
          ...postDetail,
          scrap_count: postDetail?.is_scrapped
            ? postDetail.scrap_count - 1
            : postDetail.scrap_count + 1,
          is_scrapped: !postDetail.is_scrapped,
        };

        setIsScrapped((prev) => !prev);
        setPostDetail(updatedPostDetail);

        if (!postDetail.is_scrapped) {
          setShowEditor(true);
        }
      }

      // // 추후 API 연동 시 사용할 logic
      // if (scrapCount) {
      //   const updatedCount = isScrapped ? scrapCount - 1 : scrapCount + 1;

      //   await axios.patch('/data/post-detail/post-detail.json', {
      //     scrap_count: updatedCount,
      //   });

      //   setIsScrapped((prev) => !prev);
      //   setScrapCount(updatedCount);
      // }

      // 일정 시간 후 모달 숨기기
      // setTimeout(() => setShowEditor(false), 3000);
    } catch (error) {
      console.error('Error updating scrap: ', error);
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        // 추후 API 연동 시 '/posts/${numericId}'로 GET 요청
        const response = await axios.get('/data/post-detail/post-detail.json');
        const postDetailData = response.data;
        console.log(postDetailData);

        setPostDetail(postDetailData);
      } catch (error) {
        console.error('Post detail fetching error: ', error);
      }
    };

    fetchPostDetail();
  }, []);

  const closeEditor = () => {
    setShowEditor(false);
  };

  return (
    <>
      <S.PostDetailWrapper>
        <S.PostDetailHeader>
          <S.LeftArrow onClick={() => navigate(-1)} />
          <S.HeaderTitle>{postDetail?.author}'s Post</S.HeaderTitle>
        </S.PostDetailHeader>
        <S.PostDetailMain>
          {/* Intro Section */}
          <S.PostIntroduction>
            <S.PostInfosContainer>
              <S.PostAuthorDate>
                <S.ProfileImage src={postDetail?.profile_img} />
                <S.NameBadgeContainer>
                  <S.AuthorName>{postDetail?.author}</S.AuthorName>
                  {postDetail?.certificated_user && <S.CertificationBadge />}
                </S.NameBadgeContainer>
                <span>•</span>
                <S.PostDate>{postDetail?.created_at}</S.PostDate>
              </S.PostAuthorDate>
              <S.AuthorProfileButton>프로필 보기</S.AuthorProfileButton>
            </S.PostInfosContainer>
            <S.PostTitle>{postDetail?.title}</S.PostTitle>
            <S.PostCategory>{postDetail?.category}</S.PostCategory>
          </S.PostIntroduction>

          {/* Content Section */}
          <S.PostContentWrapper>
            <S.PostContentContainer>
              <S.TextContent>{postDetail?.content}</S.TextContent>
              {postDetail?.images?.map((image) => (
                <S.ImageContent key={image.image_id} src={image.image_url} />
              ))}
            </S.PostContentContainer>
            <S.PostHastagContainer>
              {postDetail?.hashtags.map((tag, index) => (
                <S.HashtagButton key={index}>#{tag}</S.HashtagButton>
              ))}
            </S.PostHastagContainer>
          </S.PostContentWrapper>

          {/* Post Footer Section */}
          <S.PostDetailFooter>
            <S.BookmarkContainer>
              <S.BookmarkIcon $isScrapped={isScrapped} onClick={handleScrapClick} />
              <S.ScrapCount>{postDetail?.scrap_count}</S.ScrapCount>
            </S.BookmarkContainer>
            <S.PostLinkButton onClick={() => handleLinkClick(postDetail?.link_url)}>
              <S.LinkIcon />
              다른 플랫폼에 게시된 같은 컨텐츠도 보러가기
            </S.PostLinkButton>
          </S.PostDetailFooter>
        </S.PostDetailMain>
      </S.PostDetailWrapper>
      <ScrapEditorSection
        showEditor={showEditor}
        closeEditor={closeEditor}
        thumbnail={postDetail?.thumbnail_url}
        category={postDetail?.category}
        postid={postDetail?.post_id}
      />
    </>
  );
};

export default PostDetail;
