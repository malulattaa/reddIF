import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './views/Login.jsx'
import Feed from './views/Feed.jsx'
import PostarDuvida from './views/PostarDuvida.jsx'

function RotaProtegida({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<RotaProtegida><Feed /></RotaProtegida>} />
        <Route path="/postar" element={<RotaProtegida><PostarDuvida /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}
