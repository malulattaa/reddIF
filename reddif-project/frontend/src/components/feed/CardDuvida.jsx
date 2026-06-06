import { useState } from 'react'

export default function CardDuvida({ duvida }) {
  const [curtido, setCurtido] = useState(false)
  const [salvo, setSalvo] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-gray-800 text-sm">{duvida.autor}</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span>{duvida.categoria}</span>
              <span>•</span>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{duvida.tempo}</span>
            </div>
          </div>
        </div>

        {duvida.respondida && (
          <span className="flex items-center gap-1.5 text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Respondida
          </span>
        )}
      </div>

      <h2 className="text-gray-900 font-bold text-base mb-1.5">{duvida.titulo}</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{duvida.descricao}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {duvida.tags.map(tag => (
          <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurtido(!curtido)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${curtido ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'}`}
          >
            <svg width="18" height="18" fill={curtido ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {duvida.curtidas + (curtido ? 1 : 0)}
          </button>

          <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {duvida.respostas} respostas
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSalvo(!salvo)}
            className={`p-2 rounded-lg transition-colors ${salvo ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            <svg width="18" height="18" fill={salvo ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
