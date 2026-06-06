import Navbar from '../components/Navbar'
import PerfilHeader from '../components/perfil/PerfilHeader'
import PerfilStats from '../components/perfil/PerfilStats'
import PerfilTabs from '../components/perfil/PerfilTabs'

export default function Perfil() {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
        <PerfilHeader />
        <PerfilStats />
        <PerfilTabs />
      </main>
    </div>
  )
}