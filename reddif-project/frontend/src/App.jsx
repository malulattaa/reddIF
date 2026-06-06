import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './views/Login.jsx'
import Cadastro from './views/Cadastro.jsx'
import Feed from './views/Feed.jsx'
import PostarDuvida from './views/PostarDuvida.jsx'
import EmAlta from './views/EmAlta.jsx'

function RotaProtegida({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/feed" element={<RotaProtegida><Feed /></RotaProtegida>} />
        <Route path="/em-alta" element={<RotaProtegida><EmAlta /></RotaProtegida>} />
        <Route path="/postar" element={<RotaProtegida><PostarDuvida /></RotaProtegida>} />
        <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}
