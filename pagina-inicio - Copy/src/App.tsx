import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import Leagues from './components/Leagues';
import TodayMatches from './components/TodayMatches';
import Teams from './components/Teams';

//Se encarga de crear los enlaces de navegacion de la pagina//
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`${
        isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
      } px-3 py-2 text-sm font-medium`}
    >
      {children}
    </Link>
  );
}
//Componente principal de la pagina de inicio//
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img 
                  src="https://i.postimg.cc/rphYhj7V/Matchaday.png" 
                  alt="MatchDay Logo" 
                  className="h-32 w-40"
                />
              </Link>

              {/* Botones de navegacion, pagina principal */}
              <div className="hidden md:flex items-center space-x-8">
                <NavLink to="/ligas">Ligas</NavLink>
                <NavLink to="/partidos">Partidos</NavLink>
                <NavLink to="/equipos">Equipos</NavLink>
              </div>

              {/* Boton de mi calendario */}
              <div className="hidden md:block">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Mi Calendario
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {isMenuOpen ? (
                    <X className="pollo" />
                  ) : (
                    <Menu className="pollo" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Botones responsive */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/ligas"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ligas
                </Link>
                <Link
                  to="/partidos"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Partidos
                </Link>
                <Link
                  to="/equipos"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Equipos
                </Link>
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Mi Calendario
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Contenido Bienvenida usuario */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido a MatchDay</h1>
                <p className="text-xl text-gray-600">Tu fuente de información deportiva en tiempo real</p>
              </div>
            } />
            <Route path="/ligas" element={<Leagues />} />
            <Route path="/partidos" element={<TodayMatches />} />
            <Route path="/equipos" element={<Teams />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;