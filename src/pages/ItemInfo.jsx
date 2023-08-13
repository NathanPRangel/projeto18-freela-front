import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function ItemInfo() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const BaseURL = import.meta.env.VITE_API_URL;
    const [postInfo, setPostInfo] = useState([]);

    const location = useLocation();
    const postData = location.state;

    useEffect(() => {
        if (postData && postData.id) { 
            const promise = axios.get(`${BaseURL}/posts/${postData.id}`);
            promise.then(res => {
                console.log(res.data);
                setPostInfo(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
        }
    }, [postData]);

    return (
        <>
            <HomeContainer>
                <div>
                    <img src={postInfo.image} alt="" />
                    <h1>{postInfo.name_dog}</h1>
                    <p>{postInfo.description}</p>
                    <p>Tutor: {postInfo.name}</p>
                    <p>Telefone para serviços: {postInfo.phone}</p>
                </div>

                <Link to={'/home'}>
                    Voltar
                </Link>
            </HomeContainer>
        </>
    );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  img {
    width: 400px;
    height: 350px;
  }
`;
