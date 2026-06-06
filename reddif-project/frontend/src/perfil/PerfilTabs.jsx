import { useState } from 'react'

const minhasPerguntas = [
  {
    titulo: 'Recursividade em Python - exercício de Fibonacci',
    categoria: 'Algoritmos',
    respostas: 5,
    curtidas: 8,
    tempo: '2 dias atrás',
    respondida: true
  },
  {
    titulo: 'Como otimizar queries SQL com índices?',
    categoria: 'Banco de Dados',
    respostas: 12,
    curtidas: 24,
    tempo: '1 semana atrás',
    respondida: true
  }
]

const minhasRespostas = [
  {
    titulo: 'Como implementar autenticação JWT em Node.js?',
    categoria: 'Programação Web',
    curtidas: 15,
    tempo: 'há 1 dia',
    aceita: true
  },
  {
    titulo: 'Diferença entre INNER JOIN e LEFT JOIN',
    categoria: 'Banco de Dados',
    curtidas: 8,
    tempo: 'há 3 dias',
    aceita: false
  }
]

const salvosIniciais = [
  {
    id: 1,
    titulo: 'Como funciona o useState no React?',
    autor: 'Anônimo',
    categoria: 'Desenvolvimento Front-end',
    respostas: 15,
    curtidas: 31,
    respondida: true,
    salvoHa: 'há 2 dias'
  },
  {
    id: 2,
    titulo: 'Padrões de projeto: Quando usar Factory Pattern?',
    autor: 'Vinicius Souza',
    categoria: 'Engenharia de Software',
    respostas: 11,
    curtidas: 28,
    respondida: true,
    salvoHa: 'há 5 dias'
  },
  {
    id: 3,
    titulo: 'Como implementar paginação eficiente em API REST?',
    autor: 'Ana Clara Miguel',
    categoria: 'Programação Web',
    respostas: 7,
    curtidas: 18,
    respondida: false,
    salvoHa: 'há 1 semana'
  },
  {
    id: 4,
    titulo: 'Diferenças entre TCP e UDP na prática',
    autor: 'Gabriela Tucunduva',
    categoria: 'Redes de Computadores',
    respostas: 9,
    curtidas: 22,
    respondida: true,
    salvoHa: 'há 2 semanas'
  }
]

const conquistas = [
  {
    titulo: 'Primeira resposta',
    descricao: 'Respondeu sua primeira pergunta',
    cor: 'bg-yellow-50 border-yellow-200',
    corIcone: '#f59e0b',
    icone: (
      <svg width="22" height="22" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    )
  },
  {
    titulo: 'Popular',
    descricao: 'Recebeu 100+ curtidas',
    cor: 'bg-blue-50 border-blue-200',
    icone: (
      <svg width="22" height="22" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    )
  },
  {
    titulo: 'Colaborador',
    descricao: 'Ajudou 20+ colegas',
    cor: 'bg-green-50 border-green-200',
    icone: (
      <svg width="22" height="22" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  }
]

function CardPergunta({ item }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="font-semibold text-gray-900 text-sm mb-1">{item.titulo}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="text-orange-500 font-medium">{item.categoria}</span>
          <span>•</span>
          <span>{item.respostas} respostas</span>
          <span>•</span>
          <span>{item.curtidas} curtidas</span>
          <span>•</span>
          <span>{item.tempo}</span>
        </div>
      </div>
      {item.respondida && (
        <span className="text-xs font-semibold text-green-600 shrink-0 ml-4">Respondida</span>
      )}
    </div>
  )
}

function CardResposta({ item }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="font-semibold text-gray-900 text-sm mb-1">{item.titulo}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="text-orange-500 font-medium">{item.categoria}</span>
          <span>•</span>
          <span>{item.curtidas} curtidas</span>
          <span>•</span>
          <span>{item.tempo}</span>
        </div>
      </div>
      {item.aceita && (
        <span className="flex items-center gap-1 text-xs font-semibold text-green-600 shrink-0 ml-4">
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          Aceita
        </span>
      )}
    </div>
  )
}

function CardSalvo({ item, onRemover }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm mb-1">{item.titulo}</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{item.autor}</span>
            <span>•</span>
            <span className="text-orange-500 font-medium">{item.categoria}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>{item.respostas} respostas</span>
            <span>•</span>
            <span>{item.curtidas} curtidas</span>
            {item.respondida && (
              <>
                <span>•</span>
                <span className="text-green-600 font-semibold">Respondida</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onRemover(item.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span className="text-xs text-gray-400">Salvo {item.salvoHa}</span>
        </div>
      </div>
    </div>
  )
}

export default function PerfilTabs() {
  const [abaAtiva, setAbaAtiva] = useState('perguntas')
  const [salvos, setSalvos] = useState(salvosIniciais)

  const abas = [
    { id: 'perguntas', label: 'Minhas perguntas' },
    { id: 'respostas', label: 'Minhas respostas' },
    { id: 'salvos', label: 'Salvos' }
  ]

  function removerSalvo(id) {
    setSalvos(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 p-2 border-b border-gray-100">
          {abas.map(aba => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-colors ${
                abaAtiva === aba.id
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-500 hover:text-orange-500'
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-3">
          {abaAtiva === 'perguntas' && minhasPerguntas.map((item, i) => (
            <CardPergunta key={i} item={item} />
          ))}
          {abaAtiva === 'respostas' && minhasRespostas.map((item, i) => (
            <CardResposta key={i} item={item} />
          ))}
          {abaAtiva === 'salvos' && salvos.map(item => (
            <CardSalvo key={item.id} item={item} onRemover={removerSalvo} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Conquistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conquistas.map((c, i) => (
            <div key={i} className={`border rounded-xl p-4 flex items-center gap-3 ${c.cor}`}>
              <div className="shrink-0">{c.icone}</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{c.titulo}</p>
                <p className="text-xs text-gray-500">{c.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
