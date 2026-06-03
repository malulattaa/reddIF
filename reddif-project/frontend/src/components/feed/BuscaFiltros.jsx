const CATEGORIAS = ['Todas', 'Programação Web', 'Banco de Dados', 'Algoritmos', 'Desenvolvimento Front-end']

export default function BuscaFiltros({ busca, setBusca, categoriaAtiva, setCategoriaAtiva }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Buscar dúvidas..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              categoriaAtiva === cat
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
