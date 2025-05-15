package br.ufscar.dc.dsw.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import br.ufscar.dc.dsw.security.CustomAuthenticationSuccessHandler;
import br.ufscar.dc.dsw.security.UsuarioDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        return new UsuarioDetailsServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationSuccessHandler customAuthSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                // Permite acesso irrestrito às rotas da API REST
                .requestMatchers("/api/**").permitAll()
                
                // Permite acesso irrestrito a recursos públicos
                .requestMatchers("/error", "/login/**", "/js/**", "/home").permitAll()
                .requestMatchers("/", "/home/buscar").permitAll() 
                .requestMatchers("/css/**", "/image/**", "/webjars/**").permitAll()
                
                // Configura restrições de acesso específicas para diferentes tipos de usuários
                .requestMatchers("/empresas/vagas/**", "/empresas/inscricoes/**", "/empresas/resultado/**", "/empresas/cadastrarVaga/**", "/empresas/salvarVaga").hasRole("EMPRESA")
                .requestMatchers("/empresas/**", "/profissionais/**", "/usuarios/**").hasRole("ADMIN")
                .requestMatchers("/inscricoes/**").hasRole("PROFISSIONAL")
                
                // Exige autenticação para qualquer outra requisição
                .anyRequest().authenticated())
            
            .csrf(AbstractHttpConfigurer::disable)
            // Configura a página de login e o handler de sucesso customizado
            .formLogin((form) -> form
                .loginPage("/login")
                .successHandler(customAuthSuccessHandler()) 
                .permitAll())
            
            // Configura a página de logout
            .logout((logout) -> logout
                .logoutSuccessUrl("/").permitAll());

        return http.build();
    }
}
