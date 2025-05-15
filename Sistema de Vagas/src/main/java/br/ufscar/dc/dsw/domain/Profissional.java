package br.ufscar.dc.dsw.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.ufscar.dc.dsw.validation.UniqueCPF;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@SuppressWarnings("serial")
@Entity
@Table(name = "Profissional")
public class Profissional extends Usuario {


	//O sistema deve possuir um cadastro de profissionais, com os seguintes dados: e-mail, senha, CPF, nome, telefone, sexo e data de nascimento

	@UniqueCPF (message = "{Unique.profissional.CPF}")
	@NotBlank
	@Size(min = 14, max = 14, message = "{Size.profissional.CPF}")
	@Column(nullable = false, unique = true, length = 20)
	private String cpf;

	@NotBlank(message = "{NotBlank.profissional.telefone}")
	@Column(nullable = false, length = 15)
	private String telefone;

	@NotBlank(message = "{NotBlank.profissional.sexo}")
	@Column(nullable = false, length = 12)
	private String sexo;

	@NotBlank(message = "{NotBlank.profissional.nasc}")
	@Column(nullable = false, length = 10)
	private String nasc;

	@OneToMany(mappedBy = "profissional")
	@JsonIgnore
	private List<Inscricao> inscricoes;

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getNasc() {
		return nasc;
	}

	public void setNasc(String nasc) {
		this.nasc = nasc;
	}
	
	public List<Inscricao> getInscricoes() {
		return inscricoes;
	}

	public void setInscricoes(List<Inscricao> inscricoes) {
		this.inscricoes = inscricoes;
	}
}
