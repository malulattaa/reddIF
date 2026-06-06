import { useState } from 'react'

const CORES_CONQUISTA = [
  'bg-yellow-50 border-yellow-200',
  'bg-blue-50 border-blue-200',
  'bg-green-50 border-green-200',
  'bg-purple-50 border-purple-200',
  'bg-orange-50 border-orange-200',
]

const ICONES_CONQUISTA = [
  <svg key="0" width="22" height="22" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>,
  <svg key="1" width="22" height="22" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>,
  <svg key="2" width="22" height="22" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  <svg key="3" width="22" height="22" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
  <svg key="4" width="22" height="22" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>,
]

function formatarData(dataISO) {
  const d = new Date(dataISO)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function CardPergunta({ item }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="font-semibold text-gray-900 text-sm mb-1">{item.titulo}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="text-orange-500 font-medium">{item.tag}</span>
          <span>•</span>
          <span>{formatarData(item.criado_em)}</span>
        </div>
      </div>
    </div>
  )
}

function CardResposta({ item }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.conteudo}</p>
      <span className="text-xs text-gray-400">{formatarData(item.criado_em)}</span>
    </div>
  )
}

function EstadoVazio({ mensagem }) {
  return (
    <p className="text-gray-400 text-sm text-center py-6">{mensagem}</p>
  )
}

export default function PerfilTabs({ posts, respostas, conquistas }) {
  const [abaAtiva, setAbaAtiva] = useState('perguntas')

  const abas = [
    { id: 'perguntas', label: 'Minhas perguntas' },
    { id: 'respostas', label: 'Minhas respostas' },
  ]

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
          {abaAtiva === 'perguntas' && (
            posts.length === 0
              ? <EstadoVazio mensagem="Você ainda não fez nenhuma pergunta." />
              : posts.map(item => <CardPergunta key={item.id} item={item} />)
          )}
          {abaAtiva === 'respostas' && (
            respostas.length === 0
              ? <EstadoVazio mensagem="Você ainda não respondeu nenhuma pergunta." />
              : respostas.map(item => <CardResposta key={item.id} item={item} />)
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Conquistas</h2>
        {conquistas.length === 0 ? (
          <EstadoVazio mensagem="Nenhuma conquista ainda. Continue participando!" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conquistas.map((c, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 flex items-center gap-3 ${CORES_CONQUISTA[i % CORES_CONQUISTA.length]}`}
              >
                <div className="shrink-0">{ICONES_CONQUISTA[i % ICONES_CONQUISTA.length]}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{c.conquista.nome}</p>
                  <p className="text-xs text-gray-500">{c.conquista.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
