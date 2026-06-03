import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shadow-sm">
      
  
      <Link to="/feed" className="flex items-center gap-3 shrink-0">
        <div className="bg-orange-500 rounded-xl w-10 h-10 flex items-center justify-center">
          <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <span className="text-2xl font-bold text-gray-900 tracking-tight">ReddIF</span>
      </Link>

     
      <div className="flex items-center gap-2">
        <Link
          to="/feed"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            location.pathname === '/feed'
              ? 'bg-orange-500 text-white'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Início
        </Link>

        <Link
          to="/em-alta"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            location.pathname === '/em-alta'
              ? 'bg-orange-500 text-white'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Em alta
        </Link>
      </div>

   
      <div className="flex items-center gap-4 shrink-0">
        <Link
          to="/postar"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <line x1="12" y1="9" x2="12" y2="15" />
            <line x1="9" y1="12" x2="15" y2="12" />
          </svg>
          Nova dúvida
        </Link>

       
        <Link
          to="/perfil"
          className="bg-[#fff0e6] text-gray-800 hover:bg-orange-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          title="Ver Perfil"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>

    </nav>
  )
}