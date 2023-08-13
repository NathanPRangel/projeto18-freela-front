import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function SignUp() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const BaseURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    function createUser(e) {
        e.preventDefault();
        const body = {
            name,
            cpf,
            phone,
            email,
            password,
            confirmPassword
        };

        if (cpf.length !== 11) {
            return alert("CPF deve conter 11 dígitos");
        }

        if (phone.length !== 11) {
            return alert("Insira um número de telefone válido");
        }

        if (password !== confirmPassword) {
            return alert("As senhas devem ser iguais");
        }

        const promise = axios.post(`${BaseURL}/signup`, body);
        console.log(promise);

        promise.then(res => {
            console.log(res);
            navigate("/");
        })
        .catch(err => {
            console.log(err);
            const errorMessage = err.response?.data || "Ocorreu um erro ao cadastrar";
            alert(errorMessage);
            setName("");
            setCpf("");
            setPhone("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        });
    }

    // Função para formatar CPF
    function formatCPF(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Função para formatar telefone
    function formatPhone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return (
        <>
            <SingUpContainer>
                <form onSubmit={createUser}>
                    <input
                        name="name"
                        placeholder="Nome"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        name="cpf"
                        placeholder="CPF"
                        type="text"
                        value={formatCPF(cpf)}
                        onChange={e => setCpf(e.target.value)}
                        required
                    />
                    <input
                        name="phone"
                        placeholder="Número de Telefone"
                        type="text"
                        value={formatPhone(phone)}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                    <input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        name="password"
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        name="confirmPassword"
                        placeholder="Confirme a senha"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to={"/"}>
                    Já tem uma conta? Entre agora!
                </Link>
            </SingUpContainer>
        </>
    )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
