import React from 'react';
import * as Styled from './scrap.styled';
import ScrapFolderView from './ScrapFolderView';
import useAuth from '@hooks/useAuth';
import LoginModalContainer from '@components/home/LoginModalContainer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@api/axios';

interface CategoryScrap {
  name: string;
  count: string;
  id: number;
}

interface PersonalScrap {
  folder_name: string;
  count: string;
  folder_id: number;
}

// interface MyPostDTO {
//   post_id: number;
//   title: string;
//   scrap: boolean;
//   scrapCount: number;
//   thumbnail_url: string;
// }

interface FolderResponse {
  folderName: string;
  count: number;
}

const categoryData: CategoryScrap[] = [
  { name: '정리/공간 활용', count: '0', id: 1 },
  { name: '주방', count: '0', id: 2 },
  { name: '청소', count: '0', id: 3 },
  { name: '건강', count: '0', id: 4 },
  { name: 'IT', count: '0', id: 5 },
  { name: '뷰티&패션', count: '0', id: 6 },
  { name: '여가&휴식', count: '0', id: 7 },
  { name: '로컬', count: '0', id: 8 },
  { name: '기타', count: '0', id: 9 },
];

const Scrap: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'category' | 'personal'>('category');
  const [categories, setCategories] = React.useState<CategoryScrap[]>(categoryData);
  const [personalFolders, setPersonalFolders] = React.useState<PersonalScrap[]>([]);
  // const [showLoginModal, setShowLoginModal] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    const fetchFolders = async () => {
      try {
        const isMyFolder = activeTab === 'personal';
        const response = await axiosInstance.get<FolderResponse[]>(`/folder`, {
          params: {
            is_my: isMyFolder,
          },
        });

        const formattedData = response.data.map((folder) => ({
          name: folder.folderName,
          count: String(folder.count),
          id: folder.folderName,
        }));

        if (isMyFolder) {
          const personalData = response.data.map((folder) => ({
            folder_name: folder.folderName,
            count: String(folder.count),
            folder_id: Number(folder.folderName)
          }));
          setPersonalFolders(personalData);
        } else {
          const categoryData = response.data.map((folder) => ({
            name: folder.folderName,
            count: String(folder.count),
            id: Number(folder.folderName)
          }));
          setCategories(categoryData);
        }
      } catch (error) {
        console.error(`${activeTab === 'personal' ? '개인' : '카테고리'} 폴더 조회 실패:`, error);
        if (activeTab === 'category') {
          setCategories(categoryData);
        }
      }
    };

    fetchFolders();
  }, [activeTab]);

  if (!isAuthenticated) {
    return (
      <LoginModalContainer
        showModal={true}
        handleClose={() => {
          console.log('Scrap 페이지 - 모달 닫기');
          navigate(-1);
        }}
        handleLogin={() => {
          console.log('Scrap 페이지 - 로그인 페이지로 이동');
          navigate('/login');
        }}
      />
    );
  }

  return (
    <Styled.Container>
      <Styled.Header $isPersonal={activeTab === 'personal'}>
        <Styled.Title>스크랩 ZIP</Styled.Title>
        <Styled.TabContainer>
          <Styled.TabBackground />
          <Styled.ActiveTab $isPersonal={activeTab === 'personal'} />
          <Styled.TabTextActive
            onClick={() => setActiveTab('category')}
            $isActive={activeTab === 'category'}
          >
            카테고리 스크랩
          </Styled.TabTextActive>
          <Styled.TabTextInactive
            onClick={() => setActiveTab('personal')}
            $isActive={activeTab === 'personal'}
          >
            나만의 스크랩
          </Styled.TabTextInactive>
        </Styled.TabContainer>
      </Styled.Header>

      <ScrapFolderView
        type={activeTab}
        categories={activeTab === 'category' 
          ? categories 
          : personalFolders.map(folder => ({
              name: folder.folder_name,
              count: folder.count,
              id: folder.folder_id
            }))}
      />
    </Styled.Container>
  );
};

export default Scrap;
