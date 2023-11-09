'use client';

import styled from 'styled-components';
import React, { useState } from 'react';
import SendArrow from '../../../public/assets/sendArrow.svg';

export default function MessageContainer(props: any) {
    const [message, setMessage] = useState<string>('');

    function MessageSend(e: any) {
        e.preventDefault();

        if (message != '') {
            props.socket.emit('message-to-server', message);
            setMessage('');
        }
    }

    return (
        <MessageWrapper onSubmit={MessageSend}>
            <MessageInput
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <SendArrow />
        </MessageWrapper>
    );
}

const MessageWrapper = styled.form`
    width: 100%;
    height: 83px;
    background-color: #00956e;

    position: absolute;
    bottom: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MessageInput = styled.input`
    width: 85%;
    height: 50px;

    padding: 10px;
    font-size: 24px;

    background-color: #fff;
    border: none;
    border-radius: 15px;
`;

const SendaArrow = styled(SendArrow)`
    width: 50px;
    height: 50px;

    border-radius: 25px;
    border: none;

    background-color: #fff;
`;
