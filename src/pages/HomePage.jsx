import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TokenContext } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
    const { user } = useContext(UserContext);
    const { token } = useContext(TokenContext); // Removed unnecessary setToken
    const navigate = useNavigate();
    const BaseURL = import.meta.env.VITE_API_URL;
    const [postInfo, setPostInfo] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');
            return;
        }

        const headers = {
            Authorization: `Bearer ${storedToken}`
        };

        axios.get(`${BaseURL}/posts`, { headers })
            .then(res => {
                setPostInfo(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [navigate, BaseURL]);

    function infoPost(postData) {
        navigate(`/post/${postData.id}`, { state: postData });
    }

    return (
        <HomeContainer>
            <TransactionsContainer>
                <h1>DoGs</h1>
                <h1>Olá, {user.name}</h1>
                <BotaoADD onClick={() => navigate('/post-add')}>
                    <p>+ Adicionar um DogStar</p>
                </BotaoADD>
                <BotaoADD onClick={() => navigate(`/posts/edit/${user.id}`)}>
                    <p>Gerenciar posts</p>
                </BotaoADD>

                {postInfo.map(p => (
                    <ListItemContainer key={p.id} onClick={() => infoPost(p)}>
                        <div>
                            <img src={p.image} alt="" />
                            <p>Nome: {p.name_dog}</p>
                            <p>Talentos: {p.description}</p>
                        </div>
                    </ListItemContainer>
                ))}
            </TransactionsContainer>
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
`;

const TransactionsContainer = styled.article`
    flex-grow: 1;
    background-color: gray;
    color: #000;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    article {
        display: flex;
        justify-content: space-between;

        strong {
            font-weight: 700;
            text-transform: uppercase;
        }
    }
`;

const ListItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    color: #000000;
    margin-right: 10px;

    div p {
        color: #c6c6c6;
        font-size: 22px;
        margin-right: 10px;
    }

    img {
        width: 60px;
        height: 60px;
    }

    cursor: pointer;
`;

export const BotaoADD = styled.div`
    background-color: white;
    width: 180px;
    height: 30px;
    cursor: pointer;
`;
