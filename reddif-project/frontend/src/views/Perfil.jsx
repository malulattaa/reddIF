import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PerfilHeader from '../perfil/PerfilHeader'
import PerfilStats from '../perfil/PerfilStats'
import PerfilTabs from '../perfil/PerfilTabs'
import { getPerfil } from '../services/auth'

export default function Perfil() {
  const [usuario, setUsuario] = useState(null)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    getPerfil()
      .then(setUsuario)
      .catch(() => setErro(true))
  }, [])

  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
        {erro && (
          <p className="text-red-500 text-center">Não foi possível carregar o perfil.</p>
        )}
        <PerfilHeader usuario={usuario} />
        <PerfilStats usuario={usuario} />
        <PerfilTabs posts={usuario?.posts ?? []} respostas={usuario?.respostas ?? []} conquistas={usuario?.conquistas ?? []} />
      </main>
    </div>
  )
}
