package br.ufscar.dc.dsw.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.ufscar.dc.dsw.domain.Inscricao;
import br.ufscar.dc.dsw.domain.Profissional;
import br.ufscar.dc.dsw.domain.Usuario;
import br.ufscar.dc.dsw.domain.Vaga;
import br.ufscar.dc.dsw.security.UsuarioDetails;
import br.ufscar.dc.dsw.service.spec.IInscricaoService;
import br.ufscar.dc.dsw.service.spec.IProfissionalService;
import br.ufscar.dc.dsw.service.spec.IUsuarioService;
import br.ufscar.dc.dsw.service.spec.IVagaService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;


@Controller
@RequestMapping("/inscricoes")
public class InscricaoController {

	@Autowired
	private IUsuarioService usuarioService;

	@Autowired
	private IProfissionalService profissionalService;

	@Autowired
	private IVagaService vagaService;

	@Autowired
	private IInscricaoService inscricaoService;

	@GetMapping("/inscrever/{id_vaga}")
	public String uparCurriculo(@PathVariable("id_vaga") Long id_vaga, ModelMap model)
	{
		model.addAttribute("id_vaga", id_vaga);
		return "inscricao/cadastro";
	}	

	@PostMapping("/cadastrar/{id_vaga}")
	public String cadastrar(@PathVariable("id_vaga") Long id_vaga, 
	                        @ModelAttribute Inscricao inscricao, 
	                        RedirectAttributes attr, 
	                        @RequestParam(name = "file") MultipartFile file) throws IOException {
	    LocalDate hoje = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
							
	    inscricao.setData_inscricao(hoje.format(formatter));
	    inscricao.setVaga(vagaService.buscarPorId(id_vaga));
	    inscricao.setProfissional(this.getProfissional());

	    if (file != null && !file.isEmpty()) {
	        inscricao.setQualificacao(file.getBytes());
	    }

	    inscricaoService.salvar(inscricao);
	    attr.addFlashAttribute("message", "Inscrição realizada com sucesso!");
	    return "redirect:/inscricoes/listar";
	}
	
	@GetMapping("/")
	public String listarVagas(ModelMap model) {
		model.addAttribute("vagas", vagaService.buscarTodos());
		return "inscricao/listaVagas";
	}

	@PostMapping("/buscar")
	public String listarVagasPorCidade(@RequestParam("cidade") String cidade, ModelMap model) {
		System.out.println("vagasFiltradas");
		List<Vaga> vagasFiltradas = vagaService.buscarVagasCidade(cidade);
		model.addAttribute("vagas", vagasFiltradas);
		return "inscricao/listaVagas"; 
	}


	@GetMapping("/listar")
	public String listarInscricoes(ModelMap model) {
		model.addAttribute("inscricoes", inscricaoService.buscarTodosPorProfissional(this.getProfissional()));
		return "inscricao/lista";
	}

	private Profissional getProfissional() {
		UsuarioDetails usuarioDetails = (UsuarioDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		Usuario user = usuarioDetails.getUsuario();
		Profissional profissional = profissionalService.buscarPorId(user.getId());

		return profissional;
	}

	@GetMapping("/editar/{id}")
	public String preEditar(@PathVariable("id") Long id, ModelMap model) {
		model.addAttribute("profissional", profissionalService.buscarPorId(id));
		return "profissional/cadastro";
	}

	@PostMapping("/editar")
	public String editar(@Valid Profissional profissional, BindingResult result, RedirectAttributes attr) {

		if (result.hasErrors()) {
			return "profissional/cadastro";
		}

		profissionalService.salvar(profissional);
		attr.addFlashAttribute("sucess", "profissional.edit.sucess");
		return "redirect:/profissionais/listar";
	}

	@GetMapping("/excluir/{id}")
	public String excluir(@PathVariable("id") Long id, RedirectAttributes attr) {
		inscricaoService.excluir(id);
		attr.addFlashAttribute("sucess", "inscricao.delete.sucess");
		return "redirect:/inscricoes/listar";
	}

	@GetMapping(value = "/download/{id}")
	public void download(HttpServletRequest request, HttpServletResponse response, @PathVariable("id") Long id) {
		Inscricao inscricao = inscricaoService.buscarPorId(id);
		String nomeProfissional = inscricao.getProfissional().getName();
		String descricaoVaga = inscricao.getVaga().getDescricao();


		// set content type
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=qualificacao_" + nomeProfissional + "_" + descricaoVaga + ".pdf");
		
		try {
			// copies all bytes to an output stream
			response.getOutputStream().write(inscricao.getQualificacao());

			// flushes output stream
			response.getOutputStream().flush();
		} catch (IOException e) {
			System.out.println("Error :- " + e.getMessage());
		}
	}
}