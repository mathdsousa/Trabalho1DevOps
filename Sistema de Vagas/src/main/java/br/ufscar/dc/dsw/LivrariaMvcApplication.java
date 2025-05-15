package br.ufscar.dc.dsw;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.ufscar.dc.dsw.dao.IEmpresaDAO;
import br.ufscar.dc.dsw.dao.IInscricaoDAO;
import br.ufscar.dc.dsw.dao.IProfissionalDAO;
import br.ufscar.dc.dsw.dao.IUsuarioDAO;
import br.ufscar.dc.dsw.dao.IVagaDAO;
import br.ufscar.dc.dsw.domain.Empresa;
import br.ufscar.dc.dsw.domain.Inscricao;
import br.ufscar.dc.dsw.domain.Profissional;
import br.ufscar.dc.dsw.domain.Usuario;
import br.ufscar.dc.dsw.domain.Vaga;


@SpringBootApplication
public class LivrariaMvcApplication {

	private static final Logger log = LoggerFactory.getLogger(LivrariaMvcApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(LivrariaMvcApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(IUsuarioDAO usuarioDAO, BCryptPasswordEncoder encoder, IEmpresaDAO empresaDAO,
			IProfissionalDAO profissionalDAO, IVagaDAO vagaDAO, IInscricaoDAO inscricaoDAO) {

		return (args) -> {

			Usuario u1 = new Usuario();
			u1.setEmail("admin");
			u1.setPassword(encoder.encode("admin"));
			u1.setName("Administrador");
			u1.setRole("ROLE_ADMIN");
			u1.setEnabled(true);
			usuarioDAO.save(u1);

			Empresa e1 = new Empresa();
			e1.setCnpj("45.990.181/0001-89");
			e1.setCidade("São Paulo");
			e1.setDescricao("Empresa de Tecnologia");
			e1.setEmail("amazon");
			e1.setPassword(encoder.encode("empresa"));
			e1.setName("Amazon");
			e1.setRole("ROLE_EMPRESA");
			e1.setEnabled(true);
			empresaDAO.save(e1);
			log.info("Salvando dados da Empresa1");

			Empresa e2 = new Empresa();
			e2.setCnpj("13.741.181/0001-89");
			e2.setCidade("Campinas");
			e2.setDescricao("Empresa de Tecnologia");
			e2.setEmail("visagio");
			e2.setPassword(encoder.encode("empresa"));
			e2.setName("Visagio");
			e2.setRole("ROLE_EMPRESA");
			e2.setEnabled(true);
			empresaDAO.save(e2);

			Empresa e3 = new Empresa();
			e3.setCnpj("20.212.181/2512-89");
			e3.setCidade("Belo Horizonte");
			e3.setDescricao("Empresa de Tecnologia");
			e3.setEmail("google");
			e3.setPassword(encoder.encode("empresa"));
			e3.setName("Google");
			e3.setRole("ROLE_EMPRESA");
			e3.setEnabled(true);
			empresaDAO.save(e3);

			Profissional p1 = new Profissional();
			p1.setCpf("837.424.045-50");
			p1.setNasc("10/07/2002");
			p1.setSexo("Masculino");
			p1.setTelefone("(11) 94528-4695");
			p1.setEmail("matheus.d.sousall@gmail.com");
			p1.setPassword(encoder.encode("profissional"));
			p1.setName("Matheus");
			p1.setRole("ROLE_PROFISSIONAL");
			p1.setEnabled(true);
			profissionalDAO.save(p1);

			Profissional p2 = new Profissional();
			p2.setCpf("062.408.045-50");
			p2.setNasc("03/03/2001");
			p2.setSexo("Feminino");
			p2.setTelefone("(11) 94528-4695");
			p2.setEmail("annacarolinafarias@hotmail.com");
			p2.setPassword(encoder.encode("profissional"));
			p2.setName("Anna");
			p2.setRole("ROLE_PROFISSIONAL");
			p2.setEnabled(true);
			profissionalDAO.save(p2);


			Vaga v1 = new Vaga();
			v1.setDescricao("Desenvolvedor Java Estágio");
			v1.setDataLimite("10/11/2024"); 
			v1.setRemuneracao(new BigDecimal("1500.00")); 
			v1.setEmpresa(e1); 
			vagaDAO.save(v1);

			Vaga v2 = new Vaga();
			v2.setDescricao("Desenvolvedor Python Estágio");
			v2.setDataLimite("10/11/2024"); 
			v2.setRemuneracao(new BigDecimal("1500.00")); 
			v2.setEmpresa(e1); 
			vagaDAO.save(v2);

			Vaga v3 = new Vaga();
			v3.setDescricao("Cientista de Dados");
			v3.setDataLimite("10/12/2024"); 
			v3.setRemuneracao(new BigDecimal("2000.00")); 
			v3.setEmpresa(e2); 
			vagaDAO.save(v3);

			Inscricao i1 = new Inscricao();
            i1.setData_inscricao("09/12/2024");
            i1.setVaga(v1);
            i1.setProfissional(p1);
            i1.setResultado("ABERTO"); 
            //i1.setQualificacao("Exemplo de qualificação".getBytes()); // Exemplo de arquivo em bytes
			inscricaoDAO.save(i1);

		};
	}
}
