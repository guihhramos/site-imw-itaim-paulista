package com.imwitaimpaulista.igrejaapi.service;

import com.imwitaimpaulista.igrejaapi.model.Aviso;
import com.imwitaimpaulista.igrejaapi.repository.AvisoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AvisoService {
    private final AvisoRepository avisoRepository;

    public AvisoService(AvisoRepository avisoRepository) {
        this.avisoRepository = avisoRepository;
    }

    // Corrigido: era findAll()
    public List<Aviso> listarTodos() {
        return avisoRepository.findAll();
    }

    // Corrigido: era findActiveAvisos()
    public List<Aviso> listarAvisosAtivos() {
        return avisoRepository.findByAtivoTrue();
    }

    // Corrigido: era findById()
    public Optional<Aviso> obterPorId(UUID id) {
        return avisoRepository.findById(id);
    }

    // Corrigido: era save()
    public Aviso salvar(Aviso aviso) {
        return avisoRepository.save(aviso);
    }

    // Corrigido: era deleteById()
    public void deletar(UUID id) {
        avisoRepository.deleteById(id);
    }
}