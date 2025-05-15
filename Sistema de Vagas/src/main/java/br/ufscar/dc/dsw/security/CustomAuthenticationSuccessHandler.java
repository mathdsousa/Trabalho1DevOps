package br.ufscar.dc.dsw.security;

import java.io.IOException;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		
		for (GrantedAuthority authority : authorities) {
			if (authority.getAuthority().equals("ROLE_EMPRESA")) {
				response.sendRedirect("/empresas/vagas");
				return;
			} else if (authority.getAuthority().equals("ROLE_PROFISSIONAL")) {
				response.sendRedirect("/inscricoes/");
				return;
			} else if (authority.getAuthority().equals("ROLE_ADMIN")) {
				response.sendRedirect("/");
				return;
			}
		}

		// Default redirection
		response.sendRedirect("/home");
	}
}
