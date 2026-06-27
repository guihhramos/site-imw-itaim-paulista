package com.imwitaimpaulista.igrejaapi.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "avisos")
@Data // Isso cria os Getters e Setters automaticamente
public class Aviso {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @Column(columnDefinition = "TEXT")
    private String fotoUrl;

    @Column(nullable = false)
    private LocalDateTime dataPublicacao; 

    @Column(nullable = false)
    private Boolean ativo = true;

    @PrePersist
    protected void onCreate() {
        if (dataPublicacao == null) {
            dataPublicacao = LocalDateTime.now();
        }
    }
}