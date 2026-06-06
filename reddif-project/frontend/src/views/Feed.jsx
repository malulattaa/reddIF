import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BuscaFiltros from '../components/feed/BuscaFiltros'
import CardDuvida from '../components/feed/CardDuvida'
import Toast from '../components/feed/Toast'

const DUVIDAS_MOCK = [
  {
    id: 1,
    autor: 'Ana Clara Miguel',
    categoria: 'Programação Web',
    tempo: 'há 2 horas',
    titulo: 'Como implementar autenticação JWT em Node.js?',
    descricao: 'Estou desenvolvendo uma API REST e preciso implementar autenticação com JWT. Alguém pode me ajudar com um exemplo prático?',
    tags: ['Node.js', 'JWT', 'Segurança'],
    curtidas: 15,
    respostas: 8,
    respondida: true,
  },
  {
    id: 2,
    autor: 'Anônimo',
    categoria: 'Banco de Dados',
    tempo: 'há 4 horas',
    titulo: 'Dúvida sobre normalização de banco de dados',
    descricao: 'Estou com dificuldade para entender quando usar 2FN e 3FN. Alguém pode explicar com exemplos?',
    tags: ['SQL', 'Normalização', 'Modelagem'],
    curtidas: 23,
    respostas: 12,
    respondida: false,
  },
  {
    id: 3,
    autor: 'Pedro Henrique',
    categoria: 'Algoritmos',
    tempo: 'há 6 horas',
    titulo: 'Complexidade de algoritmos de ordenação',
    descricao: 'Qual a diferença prática entre QuickSort e MergeSort em termos de desempenho? Quando usar cada um?',
    tags: ['Algoritmos', 'Ordenação', 'Complexidade'],
    curtidas: 9,
    respostas: 5,
    respondida: true,
  },
  {
    id: 4,
    autor: 'Maria Fernanda',
    categoria: 'Desenvolvimento Front-end',
    tempo: 'há 1 dia',
    titulo: 'Como usar React Context API vs Redux?',
    descricao: 'Para um projeto de médio porte, vale a pena usar Redux ou a Context API do React já é suficiente?',
    tags: ['React', 'Redux', 'Estado'],
    curtidas: 31,
    respostas: 17,
    respondida: false,
  },
]

export default function Feed() {
  const location = useLocation()
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas')
  const [showToast, setShowToast] = useState(!!location.state?.postado)

  const duvidasFiltradas = DUVIDAS_MOCK.filter(d => {
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

        {duvidasFiltradas.length > 0
          ? duvidasFiltradas.map(d => <CardDuvida key={d.id} duvida={d} />)
          : <p className="text-center text-gray-400 py-16 text-sm">Nenhuma dúvida encontrada.</p>
        }
      </main>

      {showToast && <Toast mensagem="Pronto! O que você acha disso?" onClose={() => setShowToast(false)} />}
    </div>
  )
}
