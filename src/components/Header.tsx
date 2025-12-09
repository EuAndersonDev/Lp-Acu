import {  Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { FaHouseChimney } from "react-icons/fa6";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <FaHouseChimney className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Açu</h1>
              <p className="text-xs text-gray-600">Materiais de Construção</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="text-gray-700 hover:text-orange-500 transition">
              Produtos
            </a>
            <a href="#beneficios" className="text-gray-700 hover:text-orange-500 transition">
              Benefícios
            </a>
            <a href="#contato" className="text-gray-700 hover:text-orange-500 transition">
              Contato
            </a>
            <a
              href="https://linktr.ee/AcuMateriais"
              className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              <Phone className="w-4 h-4" />
              Fale Conosco
            </a>
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <a
              href="#produtos"
              className="text-gray-700 hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </a>
            <a
              href="#beneficios"
              className="text-gray-700 hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefícios
            </a>
            <a
              href="#contato"
              className="text-gray-700 hover:text-orange-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <a
              href="#contato"
              className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              <Phone className="w-4 h-4" />
              Fale Conosco
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
