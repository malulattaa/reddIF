import Navbar from '../components/Navbar'
import PostarDuvidaForm from '../components/PostarDuvidaForm'
import DicasDuvida from '../components/DicasDuvida'

export default function PostarDuvida() {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />

      <main className="max-w-3xl mx-auto py-8 px-4 flex flex-col gap-6">
        <PostarDuvidaForm />
        <DicasDuvida />
      </main>
    </div>
  )
}