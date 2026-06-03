import Navbar from '../components/Navbar'

export default function Feed() {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800">Dúvidas Recentes</h1>
      </main>
    </div>
  )
}