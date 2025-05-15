package br.ufscar.dc.dsw.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import br.ufscar.dc.dsw.validation.UniqueCNPJ;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Bugs

@SuppressWarnings("serial")
@Entity
@Table(name = "Empresa")
@JsonIgnoreProperties (value = {"vagas"})
public class Empresa extends Usuario {
    
    @UniqueCNPJ(message = "{Unique.empresa.CNPJ}")
    @NotBlank
    @Size(min = 18, max = 18, message = "{Size.empresa.CNPJ}")
    @Column(nullable = false, unique = true, length = 18)
    private String cnpj;
    
    @NotBlank
    @Size(min = 1, max = 255)
    @Column(nullable = false, length = 255)
    private String descricao;
    
    @NotBlank
    @Size(min = 3, max = 60)
    @Column(nullable = false, length = 60)
    private String cidade;


	@OneToMany(mappedBy="empresa")
	private List<Vaga> vagas;

    // Getters e Setters

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public List<Vaga> getVagas() {
        return vagas;
    }

    public void setVagas(List<Vaga> vagas) {
        this.vagas = vagas;
    }
}