import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth.js'

export default function LoginForm({ onCadastro }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await login(email, senha)
      navigate('/feed')
    } catch {
      setErro('Email ou senha incorretos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex-1 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-12 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Entrar</h1>
        <p className="text-gray-500 text-sm mb-7">Acesse sua conta para continuar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Email institucional</label>
            <input
              type="email"
              placeholder="seu.nome@estudante.ifms.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {carregando ? 'Aguarde...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Não tem conta?{' '}
          <button onClick={onCadastro} className="text-orange-500 font-medium hover:underline cursor-pointer">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  )
}
