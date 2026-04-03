package com.lamark.user_service_spring.config;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

public class InternalApiKeyFilter extends OncePerRequestFilter {

    @Value("${internal.api.key}")
    private String internalApiKey;

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
                response.getWriter().write("Invalid Internal API Key");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}