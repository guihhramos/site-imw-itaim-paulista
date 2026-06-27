package com.imwitaimpaulista.igrejaapi;

import com.imwitaimpaulista.igrejaapi.service.UsuarioService; 
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class IgrejaapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(IgrejaapiApplication.class, args);
    }

    @Bean
    public CommandLineRunner initializeAdminUser(UsuarioService usuarioService) { // PARÂMETRO ATUALIZADO
        return (args) -> {
            try {
                // Chama o método no novo UsuarioService para garantir que o 'gui' exista
                usuarioService.createInitialAdminUser();
                System.out.println(">>> Banco de dados verificado e Usuario 'admin' pronto na tb_usuarios.");
            } catch (Exception e) {
                System.out.println(">>> Nota: Usuario ja existe ou erro na inicializacao: " + e.getMessage());
            }
        };
    }
}