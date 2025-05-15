package br.ufscar.dc.dsw.domain;

import org.springframework.boot.context.properties.bind.DefaultValue;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@SuppressWarnings("serial")
@Entity
@Table(name = "Inscricao")
public class Inscricao extends AbstractEntity<Long> {

	@NotBlank(message = "{NotBlank.inscricao.data_inscricao}")
    @Size(max = 10)
	@Column(nullable = false, length = 19)
	private String data_inscricao;

    //Cadastrando no banco a relação da relação com a vaga
    //A inscrição é feita para uma vaga só, porém uma vaga tem muitas incrições
	@NotNull(message = "{NotNull.inscricao.vaga}")
	@ManyToOne
	@JoinColumn(name = "vaga_id")
	private Vaga vaga;

    //O profissional pode ter muitas inscrições, mas a inscrição é de um profissional apenas 
	@NotNull
	@ManyToOne
	@JoinColumn(name = "profissional_id") //para o profissional
	private Profissional profissional; //objeto para o profissional provavelmente é melhor

    //Resultado
    @NotNull
    @Column(nullable = false, length = 15)
    private String resultado = "ABERTO";


    //Arquivo
    @Lob
    @Basic
    @Column(length = 10485760) // MB
    private byte[] qualificacao;


	public String getData_inscricao() {
		return data_inscricao;
	}

	public void setData_inscricao(String data_inscricao) {
		this.data_inscricao = data_inscricao;
	}

	public Profissional getProfissional() {
		return profissional;
	}

	public void setProfissional(Profissional profissional) {
		this.profissional = profissional;
	}

    public String getResultado()
    {
        return this.resultado;
    }

    public void setResultado(String resultado)
    {
        this.resultado = resultado;
    }

	public Vaga getVaga()
    {
        return this.vaga;
    }

    public void setVaga(Vaga vaga)
    {
        this.vaga = vaga;
    }

	public byte[] getQualificacao() {
		return qualificacao;
	}

	public void setQualificacao(byte[] qualificacao) {
		this.qualificacao = qualificacao;
	}


}
