import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './PostDetail.styled';
import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';
import Spinner from '@components/postdetail/Spinner';
import axiosInstance from '@api/axios';

interface PostImage {
  image_id: number;
  image_url: string;
  insert_position: number;
}

interface PostDetail {
  post_id: number;
  profile_img?: string;
  author: string;
  badge: boolean;
  created_at: string;
  title: string;
  categories: string;
  content: string;
  images?: PostImage[];
  tag: string[];
  scrapCount: number;
  scrap: boolean;
  link_url?: string;
  thumbnail_url: string;
}

interface Params {
  [key: string]: string | undefined;
}

const PostDetail: React.FC = () => {
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);
  const [showEditor, setShowEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const postId = id ? parseInt(id, 10) : null;

  const handleLinkClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener, noreferrer');
    }
  };

  const handleScrapClick = async () => {
    try {
      if (postDetail) {
        const updatedPostDetail = {
          ...postDetail,
          scrap_count: postDetail.scrap ? postDetail.scrapCount - 1 : postDetail.scrapCount + 1,
          is_scrapped: !postDetail.scrap,
        };

        setIsScrapped((prev) => !prev);
        setPostDetail(updatedPostDetail);

        if (!postDetail.scrap) {
          setShowEditor(true);
        }
      }
    } catch (error) {
      console.error('Error updating scrap: ', error);
    }
  };

  useEffect(() => {
    if (postId !== null) {
      const fetchPostDetail = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axiosInstance.get(`/posts/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const postDetailData = response.data;

          setPostDetail(postDetailData);
          setIsScrapped(postDetailData.is_scrapped);
        } catch (error) {
          console.error('Post detail fetching error: ', error);
        } finally {
          setIsLoading(false); // 로딩 종료
        }
      };

      fetchPostDetail();
    }
  }, [postId]);

  const closeEditor = () => {
    setShowEditor(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <S.PostDetailWrapper>
            <S.PostDetailHeader>
              <S.LeftArrow onClick={() => navigate(-1)} />
              <S.HeaderTitle>{postDetail?.author}'s Post</S.HeaderTitle>
            </S.PostDetailHeader>
            <S.PostDetailMain>
              <S.PostIntroduction>
                <S.PostInfosContainer>
                  <S.PostAuthorDate>
                    <S.ProfileImage src={postDetail?.profile_img} />
                    <S.NameBadgeContainer>
                      <S.AuthorName>{postDetail?.author}</S.AuthorName>
                      {postDetail?.badge && <S.CertificationBadge />}
                    </S.NameBadgeContainer>
                    <span>•</span>
                    <S.PostDate>{postDetail?.created_at}</S.PostDate>
                  </S.PostAuthorDate>
                  <S.AuthorProfileButton>프로필 보기</S.AuthorProfileButton>
                </S.PostInfosContainer>
                <S.PostTitle>{postDetail?.title}</S.PostTitle>
                <S.PostCategory>{postDetail?.categories}</S.PostCategory>
              </S.PostIntroduction>

              <S.PostContentWrapper>
                <S.PostContentContainer>
                  <S.TextContent>{postDetail?.content}</S.TextContent>
                  {postDetail?.images?.map((image) => (
                    <S.ImageContent key={image.image_id} src={image.image_url} />
                  ))}
                </S.PostContentContainer>
                <S.PostHastagContainer>
                  {postDetail?.tag.map((tagItem, index) => (
                    <S.HashtagButton key={index}>#{tagItem}</S.HashtagButton>
                  ))}
                </S.PostHastagContainer>
              </S.PostContentWrapper>

              <S.PostDetailFooter>
                <S.BookmarkContainer>
                  <S.BookmarkIcon $isScrapped={isScrapped} onClick={handleScrapClick} />
                  <S.ScrapCount>{postDetail?.scrapCount}</S.ScrapCount>
                </S.BookmarkContainer>
                <S.PostLinkButton onClick={() => handleLinkClick(postDetail?.link_url)}>
                  <S.LinkIcon />
                  다른 플랫폼에 게시된 같은 컨텐츠도 보러가기
                </S.PostLinkButton>
              </S.PostDetailFooter>
            </S.PostDetailMain>
          </S.PostDetailWrapper>

          {/* 조건부 렌더링으로 showEditor를 표시 */}
          {showEditor && (
            <ScrapEditorSection
              showEditor={showEditor}
              closeEditor={closeEditor}
              thumbnail={postDetail?.thumbnail_url}
              category={postDetail?.categories}
              postid={postDetail?.post_id}
            />
          )}
        </>
      )}
    </>
  );
};

export default PostDetail;
