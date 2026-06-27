import React from 'react';
import { Link } from 'react-router-dom';
import { churchInfo } from '../config/churchInfo';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      {/* Cabeçalho com Link para Home */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao painel administrativo de {churchInfo.shortName}</p>
        </div>
        
        {/* BOTÃO PARA VOLTAR PARA O SITE (HOME) */}
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          🏠 Ver Site Público
        </Link>
      </div>

      {/* Cards de Atalhos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card: Gerenciar Avisos */}
        <Link
          to="/admin/avisos"
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 group"
          style={{ borderColor: churchInfo.colors.primary }}
        >
          <div className="text-3xl mb-3">📢</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-900 transition">Avisos</h2>
          <p className="text-gray-600 text-sm mb-4">
            Gerencie os avisos e notícias publicados no portal da comunidade.
          </p>
          <span className="text-black font-medium group-hover:underline">Acessar Painel →</span>
        </Link>

        {/* Card: Informações da Igreja */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: churchInfo.colors.secondary }}>
          <div className="text-3xl mb-3">ℹ️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Informações</h2>
          <p className="text-gray-600 text-sm mb-4">
            <strong>{churchInfo.shortName}</strong>
            <br />
            {churchInfo.address}
            <br />
            {churchInfo.city}
          </p>
        </div>

        {/* Card: Horários */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: churchInfo.colors.accent }}>
          <div className="text-3xl mb-3">🕐</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Horários de Culto</h2>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>
              <strong>Quinta:</strong> {churchInfo.schedule.thursday}
            </li>
            <li>
              <strong>Domingo:</strong>
              <ul className="ml-4 mt-1">
                {churchInfo.schedule.sunday.map((time, idx) => (
                  <li key={idx}>• {time}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Seção de Resumo/Contatos */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Resumo da Comunidade</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm mb-2">Redes Sociais</p>
            <div className="flex justify-center gap-3">
              <a href={churchInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 font-bold">
                Instagram
              </a>
              <a href={churchInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 font-bold">
                Facebook
              </a>
            </div>
          </div>
          
          <div className="bg-green-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm mb-2">Suporte por E-mail</p>
            <a href={`mailto:${churchInfo.email}`} className="text-green-700 hover:text-green-900 font-bold break-all">
              {churchInfo.email}
            </a>
          </div>

          <div className="bg-purple-50 rounded p-4 text-center">
            <p className="text-gray-600 text-sm mb-2">Região Eclesiástica</p>
            <p className="text-purple-700 font-bold">{churchInfo.region}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;