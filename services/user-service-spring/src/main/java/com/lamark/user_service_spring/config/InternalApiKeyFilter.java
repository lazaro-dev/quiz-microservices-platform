package com.lamark.user_service_spring.config;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import tools.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lamark.user_service_spring.dto.response.ErrorResponse;

public class InternalApiKeyFilter extends OncePerRequestFilter {

    // @Value("${internal.api.key}")
    // private String internalApiKey;

    private final String internalApiKey;

    public InternalApiKeyFilter(String internalApiKey) {
        this.internalApiKey = internalApiKey;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.startsWith("/internal")) {

            String apiKey = request.getHeader("X-Internal-Key");

            if (apiKey == null || !apiKey.equals(internalApiKey)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                // response.getWriter().write("""
                // {
                // "status": 403,
                // "message": "Internal API Key inválida"
                // }
                // """);

                ErrorResponse error = new ErrorResponse(
                        HttpStatus.FORBIDDEN.value(),
                        "Internal API Key inválida");

                ObjectMapper mapper = new ObjectMapper();
                mapper.writeValue(response.getWriter(), error);

                response.getWriter().flush();
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}