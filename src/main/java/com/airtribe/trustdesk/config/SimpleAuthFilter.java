package com.airtribe.trustdesk.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SimpleAuthFilter extends OncePerRequestFilter {

    @Value("${trustdesk.auth.token}")
    private String expectedToken;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // Allow frontend files
        if (path.equals("/")
                || path.equals("/index.html")
                || path.equals("/app.js")
                || path.equals("/style.css")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Protect APIs
        String authorization =
                request.getHeader("Authorization");

        if (authorization == null
                || !authorization.equals(
                "Bearer " + expectedToken)) {

            response.setStatus(401);
            response.setContentType("application/json");

            response.getWriter().write(
                    "{\"error\":\"Unauthorized\"}"
            );

            return;
        }

        filterChain.doFilter(request, response);
    }
}