const BADGES = {
  'Em chamas': {
    label: 'Em chamas',
    className: 'text-orange-500 bg-white border border-orange-200',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0c0-5-5-10-5-10z" />
        <path d="M12 12c0 0-2 2-2 4a2 2 0 0 0 4 0c0-2-2-4-2-4z" />
      </svg>
    ),
  },
  'Crescendo': {
    label: 'Crescendo',
    className: 'text-green-600 bg-white border border-green-200',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  'Top': {
    label: 'Top',
    className: 'text-blue-500 bg-white border border-blue-200',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
}

export default function CardDestaque({ duvida, rank }) {
  const badge = BADGES[duvida.badge]

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
        <span className="text-orange-500 font-bold text-sm">#{rank}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-gray-900 text-sm leading-snug">{duvida.titulo}</h3>
          {badge && (
            <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${badge.className}`}>
              {badge.icon}
              {badge.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>{duvida.autor}</span>
          <span>•</span>
          <span className="text-orange-500">{duvida.categoria}</span>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {duvida.views} views
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {duvida.curtidas}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {duvida.respostas} respostas
          </span>
        </div>
      </div>
    </div>
  )
}
