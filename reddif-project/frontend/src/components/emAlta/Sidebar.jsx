import { Link } from 'react-router-dom'

const TOP_COLABORADORES = [
  { pos: 1, nome: 'Ana Clara Miguel', respostas: 67, pts: 1250 },
  { pos: 2, nome: 'Leonardo Franco', respostas: 45, pts: 850 },
  { pos: 3, nome: 'Maria Luisa Latta', respostas: 38, pts: 720 },
  { pos: 4, nome: 'Gabriela Tucunduva', respostas: 32, pts: 610 },
  { pos: 5, nome: 'Vinicius Souza', respostas: 29, pts: 580 },
]

const TAGS = ['JavaScript', 'Python', 'SQL', 'React', 'Node.js', 'Java', 'Git', 'CSS']

export default function Sidebar() {
  return (
    <aside className="space-y-4">
      {/* Top Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
          <svg width="18" height="18" fill="none" stroke="#f97316" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Top Colaboradores
        </h2>

        <ul className="space-y-3">
          {TOP_COLABORADORES.map(c => (
            <li key={c.pos} className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${c.pos === 1 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {c.pos}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{c.nome}</p>
                <p className="text-xs text-gray-400">{c.respostas} respostas • {c.pts} pts</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
        <h2 className="font-bold text-gray-900 mb-1">Seja um colaborador!</h2>
        <p className="text-sm text-gray-500 mb-4">Ajude seus colegas respondendo perguntas e ganhe reputação na comunidade.</p>
        <Link
          to="/feed"
          className="block text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          Ver todas as perguntas
        </Link>
      </div>

      {/* Tags populares */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 mb-3">Tags populares</h2>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <span key={tag} className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
