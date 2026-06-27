package com.imwitaimpaulista.igrejaapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FotoService {

    // Usando Paths.get para garantir compatibilidade de barras (/) entre Windows e Linux
    private final String uploadDir = "uploads/fotos";

    public FotoService() {
        // Garante que a estrutura de pastas exista ao iniciar
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public String salvarFoto(MultipartFile arquivo) throws IOException {
        if (arquivo.isEmpty()) {
            throw new IOException("O arquivo enviado está vazio.");
        }

        // 1. Gera um nome único para evitar conflitos de nomes iguais
        String nomeOriginal = arquivo.getOriginalFilename();
        String extensao = "";
        
        if (nomeOriginal != null && nomeOriginal.contains(".")) {
            extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
        } else {
            extensao = ".jpg"; // Fallback caso não venha extensão
        }
        
        String novoNome = UUID.randomUUID().toString() + extensao;

        // 2. Define o caminho completo
        Path caminho = Paths.get(uploadDir).toAbsolutePath().resolve(novoNome);

        // 3. Salva o arquivo fisicamente no disco
        Files.copy(arquivo.getInputStream(), caminho);

        return novoNome; 
    }

    public void deletarFoto(String nomeArquivo) {
        if (nomeArquivo == null || nomeArquivo.isEmpty()) {
            return;
        }

        try {
            // Localiza o arquivo na pasta uploads/fotos
            Path caminho = Paths.get(uploadDir).toAbsolutePath().resolve(nomeArquivo);
            
            // Deleta se o arquivo existir
            Files.deleteIfExists(caminho);
            System.out.println("Foto removida com sucesso: " + nomeArquivo);
            
        } catch (IOException e) {
            // Apenas loga o erro para não travar o sistema se uma foto não puder ser deletada
            System.err.println("Não foi possível deletar o arquivo físico: " + e.getMessage());
        }
    }
}