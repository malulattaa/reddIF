import LoginHero from '../components/login/LoginHero.jsx'
import CadastroForm from '../components/login/CadastroForm.jsx'

export default function Cadastro() {
  return (
    <div className="min-h-screen w-full bg-[#faf7f4] flex items-center justify-center">
      <div className="flex items-center gap-10 w-full max-w-7xl px-16">
        <LoginHero />
        <CadastroForm />
      </div>
    </div>
  )
}
