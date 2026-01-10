import { User, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/auth';
import { swal } from '../../lib/swal';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white p-2.5 rounded-full hover:bg-blue-800 hover:scale-110 transition-all duration-200"
        title={`Perfil - ${user?.name}`}
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <User className="w-4 h-4" />
            Meu Perfil
          </Link>
          <button
            onClick={async () => {
              setIsLoggingOut(true);
              
              // Mostrar alerta de carregamento
              swal.fire({
                title: 'Saindo...',
                html: 'Processando logout',
                icon: 'info',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                  try {
                    await logoutUser();
                    setIsOpen(false);
                    swal.close();
                    
                    // Alerta de sucesso
                    await swal.fire({
                      title: 'Até logo!',
                      text: 'Você foi desconectado com sucesso',
                      icon: 'success',
                    });
                    
                    navigate('/');
                  } catch (error) {
                    console.error('Erro ao fazer logout:', error);
                    swal.close();
                    
                    // Alerta de erro
                    await swal.fire({
                      title: 'Erro ao sair',
                      text: 'Ocorreu um erro durante o logout',
                      icon: 'error',
                    });
                  } finally {
                    setIsLoggingOut(false);
                  }
                },
              });
            }}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      )}
    </div>
  );
}
