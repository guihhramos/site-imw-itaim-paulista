import api from './api';

export const avisoService = {
  // Criar o texto do aviso (JSON comum)
  criar: async (dados: { titulo: string; conteudo: string }) => {
    const response = await api.post('/avisos', dados);
    return response.data;
  },

  // Enviar a foto (Aqui entra o FormData)
  enviarFoto: async (id: string, arquivo: File) => {
    const formData = new FormData();
    // O nome 'foto' precisa ser o mesmo do @RequestParam do seu Java
    formData.append('foto', arquivo);

    const response = await api.post(`/avisos/${id}/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};