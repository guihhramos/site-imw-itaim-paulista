package com.imwitaimpaulista.igrejaapi.controller;

import com.imwitaimpaulista.igrejaapi.model.Aviso;
import com.imwitaimpaulista.igrejaapi.service.AvisoService;
import com.imwitaimpaulista.igrejaapi.service.FotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/avisos")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class AvisoController {

    private final AvisoService avisoService;
    private final FotoService fotoService;

    public AvisoController(AvisoService avisoService, FotoService fotoService) {
        this.avisoService = avisoService;
        this.fotoService = fotoService;
    }

    @GetMapping("/public")
    public ResponseEntity<List<Aviso>> listarAvisosPublicos() {
        return ResponseEntity.ok(avisoService.listarAvisosAtivos());
    }

    @GetMapping
    public ResponseEntity<List<Aviso>> listarTodosAvisos() {
        return ResponseEntity.ok(avisoService.listarTodos());
    }

    // CORREÇÃO: Sintaxe explícita ("id") para matar o erro rosa de UUID
    @GetMapping("/{id}")
    public ResponseEntity<Aviso> obterAvisoPorId(@PathVariable("id") UUID id) {
        return avisoService.obterPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Aviso> criarAviso(@RequestBody Aviso aviso) {
        // CORREÇÃO: Força o status ativo para aparecer na Home
        if (aviso.getAtivo() == null) {
            aviso.setAtivo(true);
        }
        // CORREÇÃO: Resolve o sublinhado vermelho (Certifique-se que o Model tem @Data)
        aviso.setDataPublicacao(LocalDateTime.now());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(avisoService.salvar(aviso));
    }

    // CORREÇÃO: Sintaxe explícita ("id") e ("foto") para upload
    @PostMapping("/{id}/foto")
    public ResponseEntity<?> adicionarFoto(@PathVariable("id") UUID id, @RequestParam("foto") MultipartFile foto) {
        return avisoService.obterPorId(id).map(aviso -> {
            try {
                if (aviso.getFotoUrl() != null && !aviso.getFotoUrl().isEmpty()) {
                    fotoService.deletarFoto(aviso.getFotoUrl());
                }
                String fotoUrl = fotoService.salvarFoto(foto);
                aviso.setFotoUrl(fotoUrl);
                return ResponseEntity.ok(avisoService.salvar(aviso));
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erro ao processar imagem: " + e.getMessage());
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    // CORREÇÃO: Sintaxe explícita ("id") para atualização
    @PutMapping("/{id}")
    public ResponseEntity<Aviso> atualizarAviso(@PathVariable("id") UUID id, @RequestBody Aviso avisoAtualizado) {
        return avisoService.obterPorId(id)
                .map(aviso -> {
                    aviso.setTitulo(avisoAtualizado.getTitulo());
                    aviso.setConteudo(avisoAtualizado.getConteudo());
                    aviso.setAtivo(avisoAtualizado.getAtivo());
                    return ResponseEntity.ok(avisoService.salvar(aviso));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // CORREÇÃO: Sintaxe explícita ("id") para exclusão
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarAviso(@PathVariable("id") UUID id) {
        return avisoService.obterPorId(id)
                .map(aviso -> {
                    if (aviso.getFotoUrl() != null) {
                        fotoService.deletarFoto(aviso.getFotoUrl());
                    }
                    avisoService.deletar(id);
                    return ResponseEntity.ok().body("{\"message\": \"Deletado com sucesso!\"}");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}