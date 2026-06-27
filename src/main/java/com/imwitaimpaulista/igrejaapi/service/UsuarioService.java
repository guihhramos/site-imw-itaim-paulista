package com.imwitaimpaulista.igrejaapi.service;

import com.imwitaimpaulista.igrejaapi.model.Usuario;
import com.imwitaimpaulista.igrejaapi.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Regra de negócio para cadastro de novos usuários.
     * Blindado para evitar que usuários comuns se tornem ADMIN.
     */
    public Usuario cadastrar(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Erro: Este e-mail já está em uso!");
        }

        // Criptografa a senha
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setAtivo(true);

        // --- TRAVA DE SEGURANÇA: DEFINIÇÃO DE ROLE ---
        // Definimos o e-mail que TEM permissão para ser ADMIN
        String emailMestre = "admin@imw.com";

        if (usuario.getEmail().equalsIgnoreCase(emailMestre)) {
            usuario.setRole("ROLE_ADMIN");
        } else {
            // FORÇA todos os outros cadastros a serem usuários comuns
            // Mesmo que o Front-end envie "ROLE_ADMIN", aqui nós sobrescrevemos para USER
            usuario.setRole("ROLE_USER");
        }
        // ---------------------------------------------

        return usuarioRepository.save(usuario);
    }

    /**
     * Cria o admin inicial no banco de dados se ele não existir.
     */
    @PostConstruct
    public void createInitialAdminUser() {
        String adminEmail = "admin@imw.com";
        
        if (usuarioRepository.findByEmail(adminEmail).isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNome("Guilherme Ramos");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123")); 
            admin.setRole("ROLE_ADMIN"); // Aqui é permitido pois é a carga inicial
            admin.setAtivo(true);
            
            usuarioRepository.save(admin);
            System.out.println("--------------------------------------------------");
            System.out.println(">>> USUÁRIO ADMIN CRIADO AUTOMATICAMENTE: " + adminEmail);
            System.out.println("--------------------------------------------------");
        }
    }
}