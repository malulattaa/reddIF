import { useState } from 'react'
import CardDuvida from '../CardDuvida'

export default function PerfilTabs() {
  const [abaAtiva, setAbaAtiva] = useState('perguntas')

  const minhasPerguntas = [
    {
      autor: 'Leonardo Franco',
      categoria: 'Programação',
      tempo: '2h atrás',
      respondida: true,
      titulo: 'Como utilizar useState no React?',
      descricao: 'Estou aprendendo React e gostaria de entender melhor como funciona o hook useState.',
      tags: ['React', 'JavaScript'],
      curtidas: 12,
      respostas: 4
    }
  ]

  const minhasRespostas = [
    {
      autor: 'Leonardo Franco',
      categoria: 'Banco de Dados',
      tempo: '1 dia atrás',
      respondida: true,
      titulo: 'Como criar índices no MySQL?',
      descricao: 'Expliquei como utilizar índices para melhorar a performance das consultas.',
      tags: ['MySQL', 'SQL'],
      curtidas: 8,
      respostas: 2
    }
  ]

  const salvos = [
    {
      autor: 'Maria Silva',
      categoria: 'React',
      tempo: '3 dias atrás',
      respondida: false,
      titulo: 'Qual a diferença entre useEffect e useState?',
      descricao: 'Tenho dúvidas sobre quando utilizar cada um desses hooks.',
      tags: ['React'],
      curtidas: 15,
      respostas: 6
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setAbaAtiva('perguntas')}
          className={`flex-1 py-4 font-medium transition ${
            abaAtiva === 'perguntas'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-orange-500'
          }`}
        >
          Minhas Perguntas
        </button>

        <button
          onClick={() => setAbaAtiva('respostas')}
          className={`flex-1 py-4 font-medium transition ${
            abaAtiva === 'respostas'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-orange-500'
          }`}
        >
          Minhas Respostas
        </button>

        <button
          onClick={() => setAbaAtiva('salvos')}
          className={`flex-1 py-4 font-medium transition ${
            abaAtiva === 'salvos'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-orange-500'
          }`}
        >
          Salvos
        </button>
      </div>

      <div className="p-6">
        {abaAtiva === 'perguntas' && (
          <div className="space-y-4">
            {minhasPerguntas.map((duvida, index) => (
              <CardDuvida key={index} duvida={duvida} />
            ))}
          </div>
        )}

        {abaAtiva === 'respostas' && (
          <div className="space-y-4">
            {minhasRespostas.map((duvida, index) => (
              <CardDuvida key={index} duvida={duvida} />
            ))}
          </div>
        )}

        {abaAtiva === 'salvos' && (
          <div className="space-y-4">
            {salvos.map((duvida, index) => (
              <CardDuvida key={index} duvida={duvida} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}