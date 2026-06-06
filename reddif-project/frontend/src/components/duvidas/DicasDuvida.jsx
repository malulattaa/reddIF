export default function DicasDuvida() {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-orange-500">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Dicas para uma boa pergunta
        </h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            Seja específico e objetivo no título
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            Explique o contexto e o que você já tentou
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            Inclua mensagens de erro ou comportamentos inesperados
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            Use tags relevantes para facilitar que outros encontrem sua dúvida
          </li>
        </ul>
      </div>
    )
  }