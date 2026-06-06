export default function PerfilHeader() {
  const usuario = {
    nome: 'Leonardo Franco',
    email: 'leonardo.franco@ifms.edu.br',
    curso: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    membroDesde: 'Março de 2024'
  }

  return (
    <div className="bg-orange-500 rounded-2xl p-8 text-white shadow-sm">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {usuario.nome}
          </h1>

          <p className="text-orange-100 mt-1">
            {usuario.email}
          </p>

          <p className="text-orange-100">
            {usuario.curso}
          </p>

          <p className="text-sm text-orange-200 mt-2">
            Membro desde {usuario.membroDesde}
          </p>
        </div>
      </div>
    </div>
  )
}