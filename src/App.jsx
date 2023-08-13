import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import ItemInfo from './pages/ItemInfo'; // Corrigido o nome do componente
import ManagePost from './pages/ManagePost';
import AddPost from './pages/AddPost';
import { useState } from 'react';
import { TokenContext } from './context/TokenContext';
import { UserContext } from './context/UserContext';

function App() {
  const [user, setUser] = useState(null); // Usando null como valor inicial
  const [token, setToken] = useState(null); // Usando null como valor inicial

  return (
    <PagesContainer>
      <BrowserRouter>
        <TokenContext.Provider value={{ token, setToken }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/post/:id" element={<ItemInfo />} />
              <Route path="/post-add" element={<AddPost />} />
              <Route path="/posts/edit/:id" element={<ManagePost />} />
            </Routes>
          </UserContext.Provider>
        </TokenContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  );
}

export default App;

const PagesContainer = styled.main`
  background-color: blue;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
