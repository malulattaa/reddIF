export default function PerfilStats() {
  const estatisticas = [
    {
      valor: 23,
      titulo: 'Perguntas'
    },
    {
      valor: 45,
      titulo: 'Respostas'
    },
    {
      valor: 187,
      titulo: 'Curtidas'
    },
    {
      valor: 850,
      titulo: 'Reputação'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {estatisticas.map((estatistica, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"
        >
          <h2 className="text-3xl font-bold text-orange-500">
            {estatistica.valor}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            {estatistica.titulo}
          </p>
        </div>
      ))}
    </div>
  )
}