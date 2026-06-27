import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { buildImageUrl } from '../constants/api';
import { AlertCircle, CheckCircle, Upload, Trash2, Edit2 } from 'lucide-react';

interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  fotoUrl?: string;
  dataPublicacao: string;
  ativo?: boolean;
}

const GerenciarAvisos: React.FC = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  // Busca de avisos (Listagem)
  const fetchAvisos = () => {
    setLoading(true);
    api
      .get('/api/avisos')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAvisos(res.data);
        } else {
          setAvisos([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar:", err);
        setError('Erro ao carregar lista de avisos.');
        setAvisos([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione uma imagem válida.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem não pode exceder 5MB.');
        return;
      }
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload da foto vinculado ao ID do aviso
  const uploadarFoto = async (avisoId: string) => {
    if (!foto) return;
    setUploadingFoto(true);
    try {
      const formData = new FormData();
      formData.append('foto', foto);

      await api.post(`/api/avisos/${avisoId}/foto`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.error("Erro no upload da foto:", err);
      throw new Error('Aviso salvo, mas houve erro ao processar a foto.');
    } finally {
      setUploadingFoto(false);
    }
  };

  // Submit do formulário (Criação e Edição)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!titulo.trim() || !conteudo.trim()) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }

    try {
      let avisoId = editId;
      const avisoDados = { titulo, conteudo, ativo: true };

      if (editId) {
        await api.put(`/api/avisos/${editId}`, avisoDados);
        setSuccess('Aviso atualizado com sucesso!');
      } else {
        const response = await api.post('/api/avisos', avisoDados);
        avisoId = response.data.id;
        setSuccess('Aviso criado com sucesso!');
      }

      if (foto && avisoId) {
        await uploadarFoto(avisoId);
        setSuccess('Aviso e foto salvos com sucesso!');
      }

      handleCancel(); 
      fetchAvisos();
    } catch (err: any) {
      const msgErro = err.response?.data?.message || err.message || 'Erro ao salvar aviso.';
      setError(msgErro);
    }
  };

  const handleEdit = (aviso: Aviso) => {
    setEditId(aviso.id);
    setTitulo(aviso.titulo);
    setConteudo(aviso.conteudo);
    
    if (aviso.fotoUrl) {
      const urlCorreta = buildImageUrl(aviso.fotoUrl);
      setPreviewFoto(urlCorreta);
    } else {
      setPreviewFoto(null);
    }

    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este aviso?')) return;
    try {
      await api.delete(`/api/avisos/${id}`);
      setSuccess('Aviso excluído com sucesso!');
      fetchAvisos();
    } catch (err) {
      setError('Erro ao excluir aviso.');
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setTitulo('');
    setConteudo('');
    setFoto(null);
    setPreviewFoto(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Gerenciar Avisos</h1>
        <p className="text-gray-600">Painel Administrativo - IMW Itaim Paulista</p>
      </div>

      {/* Card de Formulário */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-10 border border-gray-100">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          {editId ? '✏️ Editar Comunicado' : '➕ Novo Comunicado'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                  placeholder="Ex: Culto de Jovens neste Sábado"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Conteúdo</label>
                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none"
                  placeholder="Descreva os detalhes do aviso..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Imagem do Aviso</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 hover:bg-gray-100 transition">
                {previewFoto ? (
                  <div className="relative group">
                    <img src={previewFoto} alt="Preview" className="max-h-48 rounded-lg shadow-md object-contain" />
                    <button 
                      type="button" 
                      onClick={() => {setFoto(null); setPreviewFoto(null);}} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-lg"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center group w-full">
                    <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-2 group-hover:bg-yellow-100 transition text-2xl">
                       <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-gray-500 font-medium text-center">Clique para selecionar foto</span>
                    <span className="text-xs text-gray-400 mt-1">Máximo 5MB - PNG, JPG, WEBP</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFotoChange} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {(error || success) && (
            <div className={`p-4 rounded-lg text-sm font-medium flex items-center gap-2 ${error ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
              {error ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              {error || success}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={handleCancel} className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition font-medium">
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={uploadingFoto} 
              className="px-8 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 shadow-md"
            >
              {uploadingFoto ? 'Processando...' : editId ? 'Atualizar' : 'Publicar Aviso'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Avisos */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b flex justify-between items-center">
          <h2 className="font-bold text-gray-700 text-lg">Avisos no Banco de Dados</h2>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">{avisos.length}</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Buscando avisos...</div>
          ) : avisos.length === 0 ? (
            <div className="p-10 text-center text-gray-500">Nenhum aviso cadastrado ainda.</div>
          ) : (
            avisos.map((aviso) => {
              const imageUrl = buildImageUrl(aviso.fotoUrl);
              return (
                <div key={aviso.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition">
                  <div className="w-full md:w-40 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    {imageUrl ? (
                      <img 
                        src={imageUrl}
                        className="w-full h-full object-cover" 
                        alt={aviso.titulo}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs italic">Sem foto</div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{aviso.titulo}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2 leading-relaxed">{aviso.conteudo}</p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-tighter">
                      Publicado em: {new Date(aviso.dataPublicacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  
                  <div className="flex md:flex-col gap-2 justify-center">
                    <button 
                      onClick={() => handleEdit(aviso)} 
                      className="px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-md hover:bg-amber-600 shadow-sm transition flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      EDITAR
                    </button>
                    <button 
                      onClick={() => handleDelete(aviso.id)} 
                      className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-md hover:bg-red-600 shadow-sm transition flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      EXCLUIR
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarAvisos;
