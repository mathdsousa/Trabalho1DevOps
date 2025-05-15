package br.ufscar.dc.dsw.controller;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.ufscar.dc.dsw.domain.Empresa;
import br.ufscar.dc.dsw.domain.Inscricao;
import br.ufscar.dc.dsw.domain.Vaga;
import br.ufscar.dc.dsw.domain.Usuario;

import br.ufscar.dc.dsw.security.UsuarioDetails;
import br.ufscar.dc.dsw.service.EmailService;
import br.ufscar.dc.dsw.service.spec.IEmpresaService;
import br.ufscar.dc.dsw.service.spec.IInscricaoService;
import br.ufscar.dc.dsw.service.spec.IVagaService;
import br.ufscar.dc.dsw.service.spec.IUsuarioService;
import jakarta.mail.internet.InternetAddress;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/empresas")
public class EmpresaController {

	@Autowired
	EmailService emailService;

	@Autowired
	private IEmpresaService service;

	@Autowired
	private IVagaService vagaService;

	@Autowired
	private IUsuarioService usuarioService;

	@Autowired
	private IInscricaoService inscricaoService;

	// Método para recuperar a empresa logada
	private Empresa getEmpresaLogada() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (Empresa) ((UsuarioDetails) authentication.getPrincipal()).getUsuario();
	}
	
	@GetMapping("/cadastrar")
	public String cadastrar(Empresa empresa) {
		return "empresa/cadastro";
	}
	
	@GetMapping("/listar")
	public String listar(ModelMap model) {
		model.addAttribute("empresas", service.buscarTodos());
		return "empresa/lista";
	}
	
	@PostMapping("/salvar")
	public String salvar(@Valid Empresa empresa, BCryptPasswordEncoder encoder, BindingResult result, RedirectAttributes attr) {

		if (result.hasErrors()) {
			return "empresa/cadastro";
		}

		empresa.setPassword(encoder.encode(empresa.getPassword()));
		service.salvar(empresa);
		attr.addFlashAttribute("sucess", "empresa.create.sucess");
		return "redirect:/empresas/listar";
	}

	@GetMapping("/vagas")
	public String listarVagas(ModelMap model) {
		Empresa empresaLogada = getEmpresaLogada();
		model.addAttribute("vagas", vagaService.buscarVagasEmpresa(empresaLogada.getId()));
		return "empresa/listaVagas";
	}


	@GetMapping("/cadastrarVaga")
	public String cadastrarVaga(ModelMap model) {
		Vaga vaga = new Vaga();
		vaga.setEmpresa(getEmpresaLogada());
		model.addAttribute("vaga", vaga);
		return "empresa/cadastroVaga";
	}

	@PostMapping("/salvarVaga")
	public String salvarVaga(@Valid Vaga vaga, BindingResult result, RedirectAttributes attr) {

		Empresa empresaLogada = getEmpresaLogada();
		vaga.setEmpresa(empresaLogada);
		System.out.println("ID da empresa na vaga SALVAR VAGA: " + vaga.getEmpresa());

		// if (result.hasErrors()) {
		// 
		// 	System.out.println("Erros de validação: " + result.getAllErrors() );
		// 	return "empresa/cadastroVaga";
		// }
	
		vagaService.salvar(vaga);
		attr.addFlashAttribute("sucess", "vaga.create.sucess");
		return "redirect:/empresas/vagas";
	}

	@GetMapping("/inscricoes/{id}")
	public String listarIncricoes(@PathVariable("id") Long id, ModelMap model) {
		model.addAttribute("inscricoes", inscricaoService.buscarTodosPorVaga(id));
		return "empresa/listaInscricoes";
	}

	@PostMapping("/resultado/{id}")
	public String resultado(@PathVariable("id") Long id, @RequestParam("resul") String resul, RedirectAttributes attr) {
		
		try{
			Inscricao inscricao = inscricaoService.buscarPorId(id);

			if (resul.equals("Nao")) {
				inscricao.setResultado("NÃO SELECIONADO");
			} else if (resul.equals("Entrevista")) {
				inscricao.setResultado("ENTREVISTA");

				InternetAddress from = new InternetAddress("msous@estudante.ufscar.br", "Fulano");
				InternetAddress to = new InternetAddress(inscricao.getProfissional().getEmail(), "Beltrano");
						
				String subject1 = "Chamada para a entrevista";

				String body1 = "Parabéns, " + inscricao.getProfissional().getName() +", você foi seleciona para a entrevista!";

				// Envio sem anexo
				emailService.send(from, to, subject1, body1);

			} else {
				inscricao.setResultado("ANÁLISE");
			}

			inscricaoService.salvar(inscricao);

			Long vagaId = inscricao.getVaga().getId();
			attr.addFlashAttribute("success", "Inscrição analisada com sucesso.");
			return "redirect:/empresas/inscricoes/" + vagaId;
		} catch (UnsupportedEncodingException e){
			return "empresa/listaInscricoes";
		}
	}

	@GetMapping("/editar/{id}")
	public String preEditar(@PathVariable("id") Long id, ModelMap model) {
		model.addAttribute("empresa", service.buscarPorId(id));
		return "empresa/cadastro";
	}


	@PostMapping("/editar")
	public String editar(@Valid Empresa empresa, BindingResult result, BCryptPasswordEncoder encoder, RedirectAttributes attr) {
		System.out.println("ID recebido para edição: " + empresa.getId());
		System.out.println("Email recebido para edição: " + empresa.getEmail());
		System.out.println("Senha recebido para edição: " + empresa.getPassword()); //por que a senha não é passada?
		System.out.println("CNPJ recebido para edição: " + empresa.getCnpj());


		if (result.getFieldErrorCount() > 2) {
			return "empresa/cadastro";
		}

		// Buscar a empresa existente para obter os dados atuais
		Empresa empresaExistente = service.buscarPorId(empresa.getId());
		empresa.setPassword(encoder.encode(empresaExistente.getPassword()));
		 

		System.out.println("Senha recebido para edição: " + empresa.getPassword());

		// Salvar as alterações
		service.salvar(empresa);
		attr.addFlashAttribute("sucess", "empresa.edit.sucess");
		return "redirect:/empresas/listar";
	}

	@GetMapping("/excluir/{id}")
	public String excluir(@PathVariable("id") Long id, ModelMap model) {
		if (service.empresaTemVagas(id)) {
			model.addAttribute("fail", "empresa.delete.fail");
		} else {
			service.excluir(id);
			model.addAttribute("sucess", "empresa.delete.sucess");
		}
		return listar(model);
	}

}
