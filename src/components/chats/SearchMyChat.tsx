'use client';
import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { allChatsState, myChatsState, searchChatsState } from './chatsStore';
import { MdSearch } from 'react-icons/md';

const SearchMyChat = ({ userType }: any) => {
  const [input, setInput] = useState<string>('');
  const [filterChats, setFilteredChats] = useRecoilState(searchChatsState);
  const [allChats, setAllChats] = useRecoilState(allChatsState);
  const [myChats, setAllMyChats] = useRecoilState(myChatsState);
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      console.log(myChats);
      const filteringChats = (userType == 'my' ? myChats : allChats).filter((chat) => {
        const includesValue = chat.name.toLowerCase().startsWith(e.target.value.toLowerCase());
        return includesValue;
      });
      console.log('Filtering Chats:', filteringChats);
      const filteredChats = [...filteringChats];
      console.log('Filtered Chats:', filteredChats);
      setFilteredChats(filteredChats);
    },
    [myChats, allChats],
  );
  return (
    <Wrapper>
      <SearchUserBox>
        <SearchButton>
          <MdSearch className="searchIcon" size="35" color="white" />
        </SearchButton>
        <SearchItem type="text" placeholder="검색" onChange={onInputChange} />
      </SearchUserBox>
    </Wrapper>
  );
};

export default SearchMyChat;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SearchItem = styled.input`
  border: none;
  width: 32rem;
  outline: none;
  font-size: 1.2rem;
`;
const SearchUserBox = styled.div`
  background-color: white;

  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.search};

  width: 100%;
  height: 3.5rem;

  display: flex;
  gap: 3%;
`;

const SearchButton = styled.div`
  background-color: ${({ theme }) => theme.color.mainGreen};
  width: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const SearchUserInput = styled.input`
  border: none;

  width: 32rem;

  outline: none;

  font-size: ${({ theme }) => theme.fontSize.lg};
`;
