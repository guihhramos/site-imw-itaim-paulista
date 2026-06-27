package com.imwitaimpaulista.igrejaapi.repository;

import com.imwitaimpaulista.igrejaapi.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    
    // Busca o usuário pelo e-mail (usado no login)
    Optional<Usuario> findByEmail(String email);

    // Verifica se o email já existe (usado na validação do cadastro)
    // Ajustado de existsByUsername para existsByEmail
    boolean existsByEmail(String email);
}