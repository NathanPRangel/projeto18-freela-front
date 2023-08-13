import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import axios from "axios";
import styled from 'styled-components';

export default function AddPost() {

    const [nameDog, setNameDog] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const BaseURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);

    function createPost(e) {
        e.preventDefault();
        const body = {
            name_dog: nameDog,
            image: image,
            description: description
        };

        axios.post(`${BaseURL}/posts`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data);
            navigate('/home');
        })
        .catch(err => {
            console.log(err);
            setNameDog('');
            setImage('');
            setDescription('');
        });
    }

    return (
        <SignUpContainer>
            <form onSubmit={createPost}>

                <input
                    name="name"
                    placeholder="Nome do Doguinho"
                    type="text"
                    value={nameDog}
                    onChange={e => setNameDog(e.target.value)}
                    required
                />

                <input
                    name="image"
                    placeholder="Insira a URL da IMAGEM"
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                />

                <input
                    name="description"
                    placeholder="Insira as características"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <button type="submit">Adicionar</button>
            </form>

            <Link to="/home">
                Voltar sem adicionar post
            </Link>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
