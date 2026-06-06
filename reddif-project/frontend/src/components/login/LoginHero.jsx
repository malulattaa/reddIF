const features = [
  {
    id: 'colegas',
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    titulo: 'Conecte-se com colegas',
    desc: 'Encontre estudantes que podem ajudar ou compartilhe seu conhecimento',
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    id: 'interacao',
    titulo: 'Interação flexível',
    desc: 'Tire dúvidas a qualquer hora, de forma anônima ou não',
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    id: 'seguranca',
    titulo: 'Ambiente seguro',
    desc: 'Moderação ativa para garantir um espaço educacional respeitoso',
  },
]

export default function LoginHero() {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-orange-500 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
          <svg width="28" height="28" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <span className="text-4xl font-bold text-gray-900">ReddIF</span>
      </div>

      <p className="text-gray-500 text-base mb-12">Sistema Colaborativo de Monitoria</p>

      <div className="flex flex-col gap-8">
        {features.map((f) => (
          <div key={f.id} className="flex items-start gap-5">
            <span className="text-orange-500 mt-0.5 shrink-0">{f.icon}</span>
            <div>
              <p className="font-semibold text-gray-900 text-base">{f.titulo}</p>
              <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
