import React from 'react';
import { churchInfo } from '../config/churchInfo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#011a33' }} className="text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Logo */}
          <div>
            <div className="mb-4">
              <h3
                className="text-xl font-black"
                style={{ color: '#003371' }}
              >
                {churchInfo.shortName}
              </h3>

              <p className="text-xs text-gray-400">
                {churchInfo.region}
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {churchInfo.about}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm">
              Navegação
            </h4>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Início
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Comunidade
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Sobre
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Cultos */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm">
              Cultos
            </h4>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                Quinta: {churchInfo.schedule.thursday}
              </li>

              {churchInfo.schedule.sunday.map((horario, idx) => (
                <li key={idx}>
                  Domingo: {horario}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm">
              Contato
            </h4>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href={`mailto:${churchInfo.email}`}
                  className="hover:text-white transition"
                >
                  📧 {churchInfo.email}
                </a>
              </li>

              <li>
                📍 {churchInfo.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          <p>
            © {currentYear} {churchInfo.name}. Todos os direitos reservados.
          </p>

          <p className="text-xs text-gray-500">
            Feito com ❤️ para a comunidade
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;