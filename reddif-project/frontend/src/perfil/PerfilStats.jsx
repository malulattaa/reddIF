export default function PerfilStats({ usuario }) {
  const estatisticas = [
    {
      valor: usuario?.posts?.length ?? 0,
      titulo: 'Perguntas',
      icone: (
        <svg width="22" height="22" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      bg: 'bg-orange-50'
    },
    {
      valor: usuario?.respostas?.length ?? 0,
      titulo: 'Respostas',
      icone: (
        <svg width="22" height="22" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
      bg: 'bg-green-50'
    },
    {
      valor: usuario?.pontos ?? 0,
      titulo: 'Reputação',
      icone: (
        <svg width="22" height="22" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      bg: 'bg-orange-50'
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {estatisticas.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
              {stat.icone}
            </div>
            <span className="text-3xl font-bold text-gray-900">{stat.valor}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">{stat.titulo}</p>
        </div>
      ))}
    </div>
  )
}
