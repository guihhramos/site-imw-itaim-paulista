package com.imwitaimpaulista.igrejaapi.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, UserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        // Se a requisição for para a pasta de uploads, o filtro nem é executado
        return path.startsWith("/uploads/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            // 1. Valida se o token existe e é íntegro
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {

                // 2. Extrai o EMAIL do token (ajustado para o novo método)
                String email = tokenProvider.getEmailFromToken(jwt);

                // 3. Carrega o usuário do banco usando o e-mail
                // Nota: loadUserByUsername agora recebe o e-mail na nossa implementação
                // customizada
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                // 4. Cria a autenticação com as permissões (Roles)
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 5. Autentica o usuário no contexto do Spring para esta requisição específica
                SecurityContextHolder.getContext().setAuthentication(authentication);

                logger.debug("Usuário com e-mail {} autenticado com sucesso via JWT", email);
            }
        } catch (Exception ex) {
            logger.error("Erro ao validar o token JWT: {}", ex.getMessage());
        }

        // Continua para o próximo filtro ou para o Controller
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
} 