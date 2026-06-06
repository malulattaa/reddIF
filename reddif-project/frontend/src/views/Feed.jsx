import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BuscaFiltros from '../components/feed/BuscaFiltros'
import CardDuvida from '../components/feed/CardDuvida'
import Toast from '../components/feed/Toast'
import { obterDuvidas } from '../services/duvidas'

function tempoRelativo(dataISO) {
  const diff = Math.floor((Date.now() - new Date(dataISO).getTime()) / 1000)
  if (diff < 60) return 'agora mesmo'
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} hora${Math.floor(diff / 3600) > 1 ? 's' : ''}`
  if (diff < 604800) return `há ${Math.floor(diff / 86400)} dia${Math.floor(diff / 86400) > 1 ? 's' : ''}`
  return `há ${Math.floor(diff / 604800)} semana${Math.floor(diff / 604800) > 1 ? 's' : ''}`
}

export default function Feed() {
  const location = useLocation()
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas')
  const [showToast, setShowToast] = useState(!!location.state?.postado)
  const [duvidas, setDuvidas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    obterDuvidas()
      .then(dados => setDuvidas(dados.map(d => ({ ...d, tempo: tempoRelativo(d.criado_em) }))))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false))
  }, [])

  const duvidasFiltradas = duvidas.filter(d => {
    const matchCategoria = categoriaAtiva === 'Todas' || d.categoria === categoriaAtiva
    const q = busca.toLowerCase()
    const matchBusca = !busca || d.titulo.toLowerCase().includes(q) ||
      d.descricao.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q))
    return matchCategoria && matchBusca
  })

  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />

      <main className="max-w-3xl mx-auto py-8 px-4 space-y-4">
        <BuscaFiltros
          busca={busca}
          setBusca={setBusca}
          categoriaAtiva={categoriaAtiva}
          setCategoriaAtiva={setCategoriaAtiva}
        />

        {carregando && (
          <p className="text-center text-gray-400 py-16 text-sm">Carregando dúvidas...</p>
        )}
        {erro && (
          <p className="text-center text-red-400 py-16 text-sm">Não foi possível carregar as dúvidas.</p>
        )}
        {!carregando && !erro && (
          duvidasFiltradas.length > 0
            ? duvidasFiltradas.map(d => <CardDuvida key={d.id} duvida={d} />)
            : <p className="text-center text-gray-400 py-16 text-sm">Nenhuma dúvida encontrada.</p>
        )}
      </main>

      {showToast && <Toast mensagem="Dúvida publicada com sucesso!" onClose={() => setShowToast(false)} />}
    </div>
  )
}
