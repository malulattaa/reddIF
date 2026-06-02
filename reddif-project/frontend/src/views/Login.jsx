import { useNavigate } from 'react-router-dom'
import LoginHero from '../components/LoginHero.jsx'
import LoginForm from '../components/LoginForm.jsx'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-[#faf7f4] flex items-center justify-center">
      <div className="flex items-center gap-10 w-full max-w-7xl px-16">
        <LoginHero />
        <LoginForm onCadastro={() => navigate('/cadastro')} />
      </div>
    </div>
  )
}
