import Navbar from '../components/Navbar'
import CardDestaque from '../components/emAlta/CardDestaque'
import Sidebar from '../components/emAlta/Sidebar'

const DUVIDAS_DESTAQUE = [
  { id: 1, titulo: 'Como funciona o useState no React?', autor: 'Anônimo', categoria: 'Desenvolvimento Front-end', views: 1234, curtidas: 31, respostas: 15, badge: 'Em chamas' },
  { id: 2, titulo: 'Dúvida sobre normalização de banco de dados', autor: 'Anônimo', categoria: 'Banco de Dados', views: 892, curtidas: 23, respostas: 12, badge: 'Crescendo' },
  { id: 3, titulo: 'Diferença entre INNER JOIN e LEFT JOIN', autor: 'Maria Luisa Latta', categoria: 'Banco de Dados', views: 756, curtidas: 19, respostas: 9, badge: 'Top' },
  { id: 4, titulo: 'Como implementar autenticação JWT em Node.js?', autor: 'Ana Clara Miguel', categoria: 'Programação Web', views: 654, curtidas: 15, respostas: 8, badge: 'Crescendo' },
  { id: 5, titulo: 'Padrões de projeto: Quando usar Factory Pattern?', autor: 'Vinicius Souza', categoria: 'Engenharia de Software', views: 543, curtidas: 28, respostas: 11, badge: 'Em chamas' },
]

export default function EmAlta() {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-orange-500 px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="flex items-center gap-3 text-white text-3xl font-bold mb-1">
            <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Em Alta
          </h1>
          <p className="text-orange-100 text-sm">As dúvidas mais populares e discutidas da comunidade ReddIF</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Posts em destaque */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-1">
            <svg width="18" height="18" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0c0-5-5-10-5-10z" />
            </svg>
            Perguntas em destaque
          </h2>
          {DUVIDAS_DESTAQUE.map((d, i) => (
            <CardDestaque key={d.id} duvida={d} rank={i + 1} />
          ))}
        </section>

        <Sidebar />
      </main>
    </div>
  )
}
