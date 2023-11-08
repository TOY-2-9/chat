'use client';
import styled from 'styled-components';

interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[];
}

export const UserItem = ({ user }: { user: User }) => {
    const { name, picture } = user;
    return (
        <User>
            <UserImg src={picture} />
            <UserInfo>
                <h2>{name}</h2>
                <p>online</p>
            </UserInfo>
        </User>
    );
};

const User = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    gap: 2.5rem;

    border-radius: 20px;

    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
    background-color: white;

    padding: 1rem 2rem;

    cursor: pointer;

    &:hover {
        opacity: 70%;
        transition: 0.4s;
    }
`;

const UserImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 70%;
    overflow: hidden;

    margin-top: 5px;
`;

const UserInfo = styled.div`
    line-height: 10px;
`;
