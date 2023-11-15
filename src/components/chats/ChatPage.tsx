'use client';
// react 관련 import
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
=======
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
>>>>>>> ef06cb132c342ca8c73d9f98e1d6d87959fc95e2
// styled import
import styled from 'styled-components';
// chats 컴포넌트 import
import MyChatItem from '@/components/chats/MyChatItem';
import SearchMyChat from '@/components/chats/SearchMyChat';
// svgr import
import AddChat from '../../../public/assets/addChat.svg';
<<<<<<< HEAD
import Search from '../../../public/assets/search.svg';
import { Chat, allChatsState } from './chatsStore';
import { instance } from '@/lib/api';
import { useRouter } from 'next/navigation';
interface User {
    id: string;
    name: string;
    picture: string;
}

const MyChats = ({ userType }: any) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [allChats, setAllChats] = useRecoilState(allChatsState);
    const [myChats, setMyChats] = useState<Chat[]>([]);
    const router = useRouter();

    const navigateToUserSelection = () => {
        router.push('userSelect'); // 적절한 경로로 수정하세요.
    };

    const enterChatRoom = (chat: Chat) => {
        if (chat.id && chat.users) {
            const users = chat.users
                .map((user) => `[name:${user.username}, id:${user.id}, picture:${user.picture}]`)
                .join(',');
            const latestMessageQuery = JSON.stringify(chat.latestMessage);

            router.push(
                `/chating/${chat.id}?name=${chat.name}&isPrivate=${
                    chat.isPrivate
                }&users=${users}&latestMessage=${encodeURIComponent(latestMessageQuery)}&updatedAt=${chat.updatedAt}`,
            );
        }
    };

    const getMyChats = async () => {
        try {
            const res = await instance.get<Chat[], any>(`chat`);
            if (res) {
                console.log(res.chats)
                setMyChats(res.chats);
            } else {
                console.log('내 채팅 데이터 조회 실패');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const getAllChats = async () => {
        try {
            const res = await instance.get<Chat[], any>(`chat/all`);
            setAllChats(res.chats);
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        if (userType === 'my') {
            getMyChats();
        } else {
            getAllChats();
        }

    }, []);


    useEffect(() => {
        console.log(allChats);
    }, []);

    const onSearchHandler = () => {
        setSearchOpen(!searchOpen);
    };


    return (
        <Wrapper>
            <Header>
                <MyChatBar>{userType === 'all' ? '오픈 채팅' : '내 채팅'}</MyChatBar>
                <IconBar>
                <SearchIcon onClick={onSearchHandler} />
                <AddChatIcon onClick={navigateToUserSelection} />
            </IconBar>
            </Header>
            <ChatContainer>
                {searchOpen ? <SearchMyChat /> : null}
                {(userType === 'my' ? myChats : allChats).map((chat: Chat) => (
                    <MyChatItem
                        key={chat.id}
                        name={chat.name}
                        latestMessage={chat.latestMessage}
                        users={chat.users}
                        onClick={() => enterChatRoom(chat)}
                    />
                ))}
            </ChatContainer>
        </Wrapper>
    );
=======
import { Chat, searchChatsState, searchInputState } from './chatsStore';
import { useRouter } from 'next/navigation';
import { sortTime } from './useFormatCreatedAt';

import { getMyChats, getAllChats, partChats } from './getChats';
import { useQuery } from '@tanstack/react-query';
import EnterChatRoomModal from './EnterChatRoomModal';
const MyChats = ({ userType }: { userType: string }) => {
  const [addChatOpen, setAddChatOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  // 검색창에 입력 중에 올바른 검색어 비교 위해 Input 값 전역 상태 관리
  const filterInputValue = useRecoilValue(searchInputState);
  const filterChats = useRecoilValue(searchChatsState);

  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  // 채팅방 들어갈 때 새 유저면 채팅방에 새로 참여시키고 기존 유저는 그냥 들어가기
  const enterChatRoom = (chat: Chat) => {
    if (chat.id && chat.users) {
      if (chat.users.every((user) => user.id !== userId)) {
        // setChatModalOpen(true);
        partChats(chat.id);
        setChatModalOpen(false);
        router.push(`/chating/${chat.id}`);
        console.log('새로 입장 성공');
      } else {
        router.push(`/chating/${chat.id}`);
        console.log('기존 유저 들어가기 성공');
      }
    }
  };

  // react-query로 조건부 fetch
  const { data, isLoading } = useQuery<Chat[]>({
    queryKey: ['getChatsKey'],
    queryFn: userType === 'my' ? getMyChats : getAllChats,
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  const onAddHandler = () => {
    setAddChatOpen(!addChatOpen);
  };

  const onModalHandler = () => {
    setChatModalOpen(!chatModalOpen);
  };

  // const onEnterChatRoom = (chat: Chat) => {
  //   if (chat.id && chat.users) {
  //     partChats(chat.id);
  //     setChatModalOpen(false);
  //     router.push(`/chating/${chat.id}`);
  //   }
  // };

  return (
    <Wrapper>
      <ChatHeader>
        <MyChatBar>{userType === 'all' ? '오픈 채팅' : '내 채팅'}</MyChatBar>
        <IconBar>
          <AddChatIcon onClick={onAddHandler} />
        </IconBar>
      </ChatHeader>
      <SearchMyChat userType={userType} />
      <ChatContainer>
        <ChatList>
          {/* <EnterChatRoomModal isOpen={chatModalOpen} onEnterClick={enterChatRoom} onCancleClick={onModalHandler} />  */}
          {isLoading && <Loading />}
          {userId && data ? (
            filterInputValue ? (
              filterChats.length > 0 ? (
                sortTime(filterChats).map((chat) => (
                  <MyChatItem
                    key={chat.id}
                    name={chat.name}
                    latestMessage={chat.latestMessage}
                    users={chat.users}
                    onClick={() => enterChatRoom(chat)}
                    isPrivate={chat.isPrivate}
                  />
                ))
              ) : (
                <NoUserWrap>
                  <NoUserText>해당 사용자가 존재하지 않습니다.</NoUserText>
                </NoUserWrap>
              )
            ) : (
              sortTime(data).map((chat) => (
                <MyChatItem
                  key={chat.id}
                  name={chat.name}
                  latestMessage={chat.latestMessage}
                  users={chat.users}
                  onClick={() => enterChatRoom(chat)}
                  isPrivate={chat.isPrivate}
                />
              ))
            )
          ) : null}
        </ChatList>
      </ChatContainer>
    </Wrapper>
  );
>>>>>>> ef06cb132c342ca8c73d9f98e1d6d87959fc95e2
};

export default MyChats;

const Wrapper = styled.div`
<<<<<<< HEAD
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:100vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 4rem 2rem 1rem;
=======
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 2rem 1rem;
>>>>>>> ef06cb132c342ca8c73d9f98e1d6d87959fc95e2
`;

const MyChatBar = styled.div`
  color: ${({ theme }) => theme.color.mainGreen};
  font-weight: bold;
  font-size: 1.5rem;
`;
const IconBar = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.6rem;
`;
const SearchIcon = styled(Search)`
    cursor: pointer;
`;

const AddChatIcon = styled(AddChat)`
<<<<<<< HEAD
    cursor: pointer;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 2rem;
    height: 80%;
    overflow-y: auto;
`;
=======
  position: relative;
  cursor: pointer;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 2rem;
  background-color: transparent;
  height: calc(50rem - 14rem);
`;

const ChatList = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*크롬, 사파리, 오페라, 엣지*/
    display: none;
  }
  -ms-overflow-style: none; /* ie */
  scrollbar-width: none; /* 파이어폭스 */
`;

const Loading = styled.div`
  width: 50px;
  height: 50px;

  border: 5.5px solid rgba(255, 255, 255, 0.3);
  border-top: 5.5px solid ${({ theme }) => theme.color.mainGreen};
  border-radius: 50%;

  animation: spin 1s linear infinite;

  margin: 0 auto 8rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NoUserWrap = styled.div`
  text-align: center;

  margin-top: 8rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const NoUserText = styled.h2`
  color: ${({ theme }) => theme.color.darkGreen};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
>>>>>>> ef06cb132c342ca8c73d9f98e1d6d87959fc95e2
