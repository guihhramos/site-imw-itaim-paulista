import React from 'react';

interface AvisoCardProps {
  id: string;
  titulo: string;
  conteudo: string;
  fotoUrl?: string;
  dataPublicacao: string;
}

const AvisoCard: React.FC<AvisoCardProps> = ({ titulo, conteudo, fotoUrl, dataPublicacao }) => {
  const formatarData = (data: string) => {
    try {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Data inválida";
    }
  };

  // Lógica para montar a URL da imagem
  const getFullImageUrl = (url: string | undefined) => {
    if (!url) return null;
    // Se a URL já for um link completo (S3, Imgur, etc), retorna ela mesma
    if (url.startsWith('http')) return url;
    // Caso contrário, busca no nosso mapeamento do Spring Boot
    // Importante: FotoService salva em uploads/fotos, mas o WebConfig mapeou para /uploads/
    return `http://localhost:8080/uploads/${url}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 mb-6 border-l-4 border-[#B59A57]">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-tight">{titulo}</h3>
          <p className="text-gray-600 text-base leading-relaxed mb-4 whitespace-pre-line">{conteudo}</p>

          {fotoUrl && (
            <div className="my-4 overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-gray-50">
              <img
                src={getFullImageUrl(fotoUrl)!}
                alt={titulo}
                className="w-full max-w-2xl h-auto max-h-[500px] object-contain block mx-auto"
                // Caso a imagem falhe (404), não mostra o ícone de imagem quebrada
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <span role="img" aria-label="calendário">📅</span> 
              Publicado em: {formatarData(dataPublicacao)}
            </p>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase font-bold tracking-wider">
              Informativo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvisoCard;