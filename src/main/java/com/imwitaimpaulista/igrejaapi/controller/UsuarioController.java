package com.imwitaimpaulista.igrejaapi.controller;

import com.imwitaimpaulista.igrejaapi.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios") // MUDAMOS AQUI: de /api/auth para /api/usuarios
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @SuppressWarnings("unused")
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
}