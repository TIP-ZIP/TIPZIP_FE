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
  profile_image?: string;
  author: string;
  badge: boolean;
  createdAt: string;
  title: string;
  category: string;
  content: string;
  images?: PostImage[];
  tag: string[];
  scrapCount: number;
  scrap: boolean;
  link_url?: string;
  thumbnail_url: string;
  user_id: number;
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

  // Format date to 'YYYY.MM.DD'
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-CA').replace(/-/g, '.');
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

          // Format the createdAt date
          postDetailData.createdAt = formatDate(postDetailData.createdAt);

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
  const extractImages = (htmlContent: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let images: string[] = [];
    let match;

    // 이미지 src를 찾아 배열에 추가
    while ((match = imgRegex.exec(htmlContent)) !== null) {
      images.push(match[1]);
    }

    // 이미지를 제외한 나머지 텍스트를 반환
    const textWithoutImages = htmlContent.replace(imgRegex, '');
    return { text: textWithoutImages, images };
  };

  const { text: contentText, images: contentImages } = postDetail
    ? extractImages(postDetail.content)
    : { text: '', images: [] };

  const cleanContent = (htmlContent: string) => {
    // 이미지 태그를 제거하고, 스타일을 포함한 다른 태그도 제거
    const cleanedContent = htmlContent
      .replace(/<img[^>]*>/g, '') // 모든 이미지 태그 제거
      .replace(/<div[^>]*>/g, '') // div 태그 제거
      .replace(/<\/div>/g, '') // div 닫는 태그 제거
      .replace(/<[^>]+>/g, ''); // 나머지 HTML 태그 모두 제거

    return cleanedContent;
  };

  const cleanedContent = postDetail ? cleanContent(postDetail.content) : '';
  const writerID = postDetail?.user_id;
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
                    <S.ProfileImage src={postDetail?.profile_image} />
                    <S.NameBadgeContainer>
                      <S.AuthorName>{postDetail?.author}</S.AuthorName>
                      {postDetail?.badge && <S.CertificationBadge />}
                    </S.NameBadgeContainer>
                    <span>•</span>
                    <S.PostDate>{postDetail?.createdAt}</S.PostDate>
                  </S.PostAuthorDate>
                  <S.AuthorProfileButton onClick={() => navigate(`/mypage/${writerID}`)}>
                    프로필 보기
                  </S.AuthorProfileButton>
                </S.PostInfosContainer>
                <S.PostTitle>{postDetail?.title}</S.PostTitle>
                <S.PostCategory>{postDetail?.category}</S.PostCategory>
              </S.PostIntroduction>

              <S.PostContentWrapper>
                <S.PostContentContainer>
                  <S.TextContent>{cleanedContent}</S.TextContent>
                  {contentImages.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`image-${index}`} />
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
              category={postDetail?.category}
              postid={postDetail?.post_id}
            />
          )}
        </>
      )}
    </>
  );
};

export default PostDetail;
