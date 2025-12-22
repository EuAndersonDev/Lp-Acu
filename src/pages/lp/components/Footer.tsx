import { HardHat, Instagram } from 'lucide-react';
import { SiLinktree } from "react-icons/si";
export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HardHat className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-xl font-bold">Açu</h3>
                <p className="text-xs text-blue-300">Materiais de Construção</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Há anos oferecendo os melhores materiais de construção
              para sua obra.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Produtos</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="#produtos" className="hover:text-orange-400 transition">Cimento e Argamassa</a></li>
              <li><a href="#produtos" className="hover:text-orange-400 transition">Ferramentas</a></li>
              <li><a href="#produtos" className="hover:text-orange-400 transition">Hidráulica</a></li>
              <li><a href="#produtos" className="hover:text-orange-400 transition">Elétrica</a></li>
              <li><a href="#produtos" className="hover:text-orange-400 transition">Tintas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><a href="#contato" className="hover:text-orange-400 transition">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Nossa História</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Trabalhe Conosco</a></li>
              <li><a href="#contato" className="hover:text-orange-400 transition">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
            <p className="text-blue-200 text-sm mb-4">
              Siga-nos nas redes sociais
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/acumateriais"
                className="bg-blue-800 p-3 rounded-lg hover:bg-orange-500 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linktr.ee/AcuMateriais"
                className="bg-blue-800 p-3 rounded-lg hover:bg-orange-500 transition"
              >
                <SiLinktree  className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-blue-300 text-sm">
          <p>&copy; 2024 Açu Materiais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
