package com.imwitaimpaulista.igrejaapi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "tb_usuarios") // Sincronizado com o seu pgAdmin
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String nome; 

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private boolean ativo = true;

    // Ajustado para o padrão do Spring Security
    @Column(nullable = false)
    private String role = "ROLE_ADMIN"; 
}