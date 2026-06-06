import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrar } from '../../services/auth.js'

const cursos = [
  'Técnico em Informática',
  'Técnico em eletrotécnica',
  'Administração',
  'Análise e Desenvolvimento de Sistemas',
  'Engenharia de Controle e Automação',
  'Engenharia da Computação',
  'Pós Graduação',
]

export default function CadastroForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', senha: '', curso: cursos[0] })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await cadastrar(form.nome, form.email, form.senha, form.curso)
      navigate('/login')
    } catch {
      setErro('Erro ao criar conta. Verifique os dados e tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex-1 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-12 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Criar conta</h1>
        <p className="text-gray-500 text-sm mb-7">Preencha os dados para começar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-800 mb-1">Nome completo</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label htmlFor="email-cadastro" className="block text-sm font-medium text-gray-800 mb-1">Email institucional</label>
            <input
              id="email-cadastro"
              name="email"
              type="email"
              placeholder="seu.nome@estudante.ifms.edu.br"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label htmlFor="senha-cadastro" className="block text-sm font-medium text-gray-800 mb-1">Senha</label>
            <input
              id="senha-cadastro"
              name="senha"
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label htmlFor="curso" className="block text-sm font-medium text-gray-800 mb-1">Curso</label>
            <select
              id="curso"
              name="curso"
              value={form.curso}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 transition bg-white cursor-pointer"
            >
              {cursos.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {carregando ? 'Aguarde...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Já tem uma conta?{' '}
          <button onClick={() => navigate('/login')} className="text-orange-500 font-medium hover:underline cursor-pointer">
            Entrar
          </button>
        </p>
      </div>
    </div>
  )
}
