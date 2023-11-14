// 'use client';
// import styled from 'styled-components';
// import React, { useEffect, useState } from 'react';
// import io, { Socket } from 'socket.io-client';
// import { usePathname } from 'next/navigation';
// import MessageContainer from '../../../components/chating/MessageContainer';
// import UserProfileModal from '../../../components/Users/UserProfileModal';

// interface Message {
//     id: string;
//     text: string;
//     userId: string;
//     createdAt: string;
// }



// export default function Chating() {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [socket, setSocket] = useState<Socket | null>(null);

//     const accessToken = sessionStorage.getItem('accessToken');
//     const userId = sessionStorage.getItem('userId');

//     const pathname = usePathname();
//     const chatId = pathname.split('/')[2];

//     console.log(chatId)

//     // socketInitilizer 함수 정의
//     const socketInitilizer = (socket: Socket) => {
//         socket.on('connect', () => {
//             console.log('Socket connected');
//         });

//         socket.emit('fetch-messages');

//         socket.on('messages-to-client', (messageObject: { messages: Message[] }) => {
//             setMessages(messageObject.messages);
//         });

//         socket.on('message-to-client', (messageObject: Message) => {
//             setMessages((prevMessages) => [messageObject, ...prevMessages]);
//         });

//         socket.on('disconnect', () => {
//             console.log('Socket disconnected');
//         });

//         socket.on('join', (data: { users: string[]; joiners: string[] }) => {
//             console.log(data, 'join');
//         });

//         socket.on('leave', (data: { users: string[]; leaver: string }) => {
//             console.log(data, 'leave');
//         });
//     };

//     useEffect(() => {
//         if (socket) {
//             socketInitilizer(socket);
//         }
//     }, [socket]);

//     useEffect(() => {
//         // ChatId가 변경될 때마다 Socket 다시 설정

//         const newSocket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
//             extraHeaders: {
//                 Authorization: `Bearer ${accessToken}`,
//                 serverId: `${process.env.NEXT_PUBLIC_SERVER_KEY}`,
//             },
//         });

//         // 생성된 Socket을 상태에 반영
//         setSocket(newSocket);

//         // Component 언마운트 시 Socket 연결 해제
//         return () => {
//             if (newSocket) {
//                 newSocket.disconnect();
//             }
//         };
//     }, [accessToken, chatId]);

//     return (
//         <main>
//             <MessagesContainer>
//                 {/* 메시지 렌더링 */}
//                 {messages
//                     ? messages.map((message: Message, i: number) =>
//                           userId == message.userId.split(':')[1] || userId == message.userId.split(':')[0] ? (
//                               <MyMessageWrapper key={message.id}>
//                                   <MyMessageText>{message.text}</MyMessageText>
//                                   <MyMessageTime>{message.createdAt.split('T')[1].slice(0, 5)}</MyMessageTime>
//                               </MyMessageWrapper>
//                           ) : messages[i].userId == messages[i + 1]?.userId ||
//                             messages[i].userId == messages[i + 1]?.userId.split(':')[1] ? (
//                               <YourMessageWrapper key={message.id}>
//                                   <YourMessageTextWrapper>
//                                       <YourMessageText>{message.text}</YourMessageText>
//                                       <YourMessageTime>{message.createdAt.split('T')[1].slice(0, 5)}</YourMessageTime>
//                                   </YourMessageTextWrapper>
//                               </YourMessageWrapper>
//                           ) : (
//                               <YourMessageWrapper key={message.id}>
//                                   <YourMessageNameWrapper>
//                                       <YourMessagePicture src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
//                                       <YourMessageName>
//                                           {message.userId.split(':')[message.userId.split(':').length - 1]}
//                                       </YourMessageName>
//                                   </YourMessageNameWrapper>
//                                   <YourMessageTextWrapper>
//                                       <YourMessageText>{message.text}</YourMessageText>
//                                       <YourMessageTime>{message.createdAt.split('T')[1].slice(0, 5)}</YourMessageTime>
//                                   </YourMessageTextWrapper>
//                               </YourMessageWrapper>
//                           ),
//                       )
//                     : ''}
//             </MessagesContainer>
//             {/* 메시지 입력 컴포넌트 */}
//             <MessageContainer socket={socket} />
//         </main>
//     );
// }

// // ... (이하 코드 생략)


// //     return (
// //         <main>
// //             <MessagesContainer>
// //                 {messages
// //                     ? messages.map((message: Message, i: number) =>
// //                           userId == message.userId.split(':')[1] || userId == message.userId.split(':')[0] ? (
// //                               <MyMessageWrapper key={message.id}>
// //                                   <MyMessageText>{message.text}</MyMessageText>
// //                                   <MyMessageTime>{message.createdAt.split('T')[1].slice(0, 5)}</MyMessageTime>
// //                               </MyMessageWrapper>
// //                           ) : messages[i].userId == messages[i + 1]?.userId ||
// //                             messages[i].userId == messages[i + 1]?.userId.split(':')[1] ? (
// //                               <YourMessageWrapper key={message.id}>
// //                                   <YourMessageTextWrapper>
// //                                       <YourMessageText>{message.text}</YourMessageText>
// //                                       <YourMessageTime>{message.createdAt.split('T')[1].slice(0, 5)}</YourMessageTime>
// //                                   </YourMessageTextWrapper>
// //                               </YourMessageWrapper>
// //                           ) : (
// //                               <YourMessageWrapper key={message.id}>
// //                                   <YourMessageNameWrapper>
// //                                       <YourMessagePicture src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
// //                                       <YourMessageName>
// //                                           {message.userId.split(':')[message.userId.split(':').length - 1]}
// //                                       </YourMessageName>
// //                                   </YourMessageNameWrapper>
// //                                   <YourMessageTextWrapper>
// //                                       <YourMessageText>{message.text}</YourMessageText>
// //                                       <YourMessageTime>{message.createdAt.split('T')[1].slice(0, 5)}</YourMessageTime>
// //                                   </YourMessageTextWrapper>
// //                               </YourMessageWrapper>
// //                           ),
// //                       )
// //                     : ''}
// //             </MessagesContainer>
// //             <MessageContainer socket={socket} />
// //         </main>
// //     );
// // }

// const MessagesContainer = styled.div`
//     width: 100%;
//     height: 100vh;

//     padding-bottom: 83px;
//     background-color: #eee;

//     display: flex;
//     flex-direction: column-reverse;

//     overflow: scroll;
// `;

// const YourMessageWrapper = styled.div`
//     width: 100%;
// `;

// const YourMessageNameWrapper = styled.div`
//     width: 100%;
//     display: flex;
//     margin-bottom: 10px;
// `;

// const YourMessageName = styled.div`
//     font-size: 24px;
//     color: #000;

//     display: flex;
//     flex-direction: column;
//     margin-left: 5px;
// `;

// const YourMessagePicture = styled.img`
//     width: 40px;
//     height: 40px;

//     border-radius: 20px;
// `;

// const YourMessageTextWrapper = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: row;

//     margin-bottom: 10px;
// `;
// const YourMessageText = styled.div`
//     max-width: 75%;
//     padding: 10px;

//     margin-left: 40px;

//     font-size: 16px;

//     border-radius: 15px;

//     background-color: #d9d9d9;
// `;

// const YourMessageTime = styled.div`
//     color: #888;
//     font-size: 12px;

//     display: flex;
//     flex-direction: column-reverse;
// `;

// const MyMessageWrapper = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: row-reverse;
//     margin-bottom: 10px;
// `;

// const MyMessageText = styled.div`
//     max-width: 75%;
//     padding: 10px;

//     margin-right: 10px;

//     font-size: 16px;

//     border-radius: 15px;

//     background-color: #00956e;
// `;

// const MyMessageTime = styled.div`
//     color: #888;
//     font-size: 12px;

//     display: flex;
//     flex-direction: column-reverse;
// `;

import ChatingPage from '../../../components/chating/ChatingPage';

export default function Chating() {
    return (
        <main>
            <ChatingPage />
        </main>
    );
}