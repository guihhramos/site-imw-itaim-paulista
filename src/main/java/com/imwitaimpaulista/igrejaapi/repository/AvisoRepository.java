package com.imwitaimpaulista.igrejaapi.repository;

import com.imwitaimpaulista.igrejaapi.model.Aviso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AvisoRepository extends JpaRepository<Aviso, UUID> {
    List<Aviso> findByAtivoTrueOrderByDataPublicacaoDesc();

    List<Aviso> findByAtivoTrue();
}