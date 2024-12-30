import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import 'react-quill/dist/quill.snow.css';

import axiosInstance from '@api/axios';

import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';
import Spinner from '@components/postdetail/Spinner';
import PostManageDropdown from '@components/postdetail/PostManageDropdonw/PostManageDropdown';

import * as S from './PostDetail.styled';

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

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Dropdown 컴포넌트 참조

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
          const response = await axiosInstance.get(`/posts/${postId}`);
          const postDetailData = response.data;

          // Format the createdAt date
          postDetailData.createdAt = formatDate(postDetailData.createdAt);

          console.log(postDetailData);

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

  // 수정/삭제 Dropdown Open
  const handlePostDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const handleClickOutside = (e: MouseEvent) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
  //     setIsDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   // 전역 클릭 이벤트 추가
  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Cleanup 이벤트 리스너 제거
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const cleanedContent = postDetail ? cleanContent(postDetail.content) : '';
  const writerID = postDetail?.user_id;

  const user_id = localStorage.getItem('user_id');
  const parsedUser_id = user_id ? parseInt(user_id, 10) : null;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <S.PostDetailWrapper>
            {/* Header Section */}
            <S.PostDetailHeader>
              <S.LeftArrow onClick={() => navigate(-1)} />
              <S.HeaderTitle>{postDetail?.author || '사용자'}'s Post</S.HeaderTitle>
              {postDetail?.user_id === parsedUser_id && (
                <S.ElipsisIcon onClick={handlePostDropdown} />
              )}
              {isDropdownOpen && <PostManageDropdown ref={dropdownRef} postId={postId} />}
            </S.PostDetailHeader>

            {/* Introduction Section */}
            <S.PostDetailMain>
              <S.PostIntroduction>
                <S.PostInfosContainer>
                  <S.PostAuthorDate>
                    <S.ProfileImage src={postDetail?.profile_image} />
                    <S.NameBadgeContainer>
                      <S.AuthorName>{postDetail?.author || '사용자'}</S.AuthorName>
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

              {/* Post Content Section (게시글 수정, 삭제 구현 부분) */}
              <S.PostContentWrapper>
                {/* 글, 이미지 Section */}
                <S.PostContentContainer>
                  <div
                    className='ql-editor'
                    dangerouslySetInnerHTML={{ __html: postDetail?.content || '' }}
                  />
                </S.PostContentContainer>

                {/* Hashtag Section */}
                <S.PostHastagContainer>
                  {postDetail?.tag.map((tagItem, index) => (
                    <S.HashtagButton key={index}>#{tagItem}</S.HashtagButton>
                  ))}
                </S.PostHastagContainer>
              </S.PostContentWrapper>

              {/* Post Footer Section */}
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
