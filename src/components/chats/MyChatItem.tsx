'use client';
import React from 'react';
import styled from 'styled-components';
import { Chat } from './chatsStore';
import { formatCreatedAt } from '@/components/chats/useFormatCreatedAt';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { eclipsText } from './ModalTextData';
const MyChatItem = ({ name, latestMessage, users, onClick, isPrivate }: Chat) => {
  const chatsPicture =
    isPrivate && users && users.length > 2 // private 한 그룹 채팅인 경우
      ? '/assets/chat-private-line.svg'
      : isPrivate && users && users.length === 2 // private이면서 1대1 채팅인 경우
      ? users[0].picture
      : !isPrivate && users && users.length > 2 // private 아니면서 그룹채팅인 경우
      ? '/assets/groupUsers.svg'
      : !isPrivate && users && users.length === 2
      ? users[0].picture // private 하지 않으면서 1대1 인 경우
      : '/assets/x.svg';
  const usersNumber = users && users.length > 0 ? users.length : '';
  const chatsName =
    users && users.length === 1
      ? '상대방이 채팅방을 나갔습니다.'
      : users && users.length === 2
      ? users[0].username
      : name;
  return (
    <Wrapper>
      <ChatBox onClick={onClick}>
        <ChatDescContainer>
          <ChatInfo>
            <ChatImage>
              <img src={chatsPicture} alt="chats picutre" />
            </ChatImage>
            <ChatDesc>
              <ChatPart>
                <ChatName>
                  {chatsName} <span>{usersNumber}</span>
                </ChatName>
              </ChatPart>
              <LateMessage>{latestMessage ? eclipsText(latestMessage.text, 20) : ''} </LateMessage>
            </ChatDesc>
          </ChatInfo>
          <MessageCount>
            <ReceiveTime>{latestMessage ? formatCreatedAt(latestMessage.createdAt) : ''}</ReceiveTime>
            <TypeCheckBox>{isPrivate ? <PrivateIcon /> : ''}</TypeCheckBox>
          </MessageCount>
        </ChatDescContainer>
      </ChatBox>
    </Wrapper>
  );
};

export default MyChatItem;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 768px) {
    height: 20vh;
  }
`;

const ChatBox = styled.div`
  margin-top: 2rem;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 70%;
    transition: 0.4s;
  }
`;

const ChatDescContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: space-between;
`;

const ChatInfo = styled.div`
  display: flex;
`;
const ChatImage = styled.div`
  img {
    width: 3rem;
    height: 3rem;
    margin: 2rem 0.5rem 2rem 2rem;
    border-radius: 1rem;
  }
`;

const ChatDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const ChatPart = styled.div`
  display: flex;
`;

const ChatName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  padding: 0;
  margin: 0;

  span {
    font-size: 1.1rem;
    font-weight: bold;
    color: #626262;
  }
`;

const LateMessage = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: #626262;
  padding: 0;
  margin-top: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageCount = styled(ChatDesc)`
  text-align: center;
  margin-bottom: 1.2rem;
  margin-right: 1.2rem;
`;

const ReceiveTime = styled.p`
  font-size: 0.8rem;
`;

const TypeCheckBox = styled.div`
  border-radius: 0.6rem;
  text-align: center;
  padding: 0.1rem 0.5rem;
  color: #fff;
`;

const PrivateIcon = styled(AiFillLock)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.color.mainGreen};
`;
