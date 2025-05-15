package br.ufscar.dc.dsw.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@SuppressWarnings("serial")
@Entity
@Table(name = "Usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario extends AbstractEntity<Long> {
  
	@NotBlank
    @Column(nullable = false, length = 120, unique = true)
    private String email;
    
	@NotBlank
	@JsonIgnore
    @Column(nullable = false, length = 64)
    private String password;
       
    @NotBlank
    @Column(nullable = false, length = 60)
    private String name;

    // @NotBlank
    // @Column(nullable = false, length = 14)
    // private String CPF;
    
    @NotBlank
	@JsonIgnore
    @Column(nullable = false, length = 20)
    private String role;
    
    @Column(nullable = false)
	@JsonIgnore
    private boolean enabled;
		
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	// public String getCPF() {
	// 	return CPF;
	// }

	// public void setCPF(String cPF) {
	// 	this.CPF = CPF;
	// }

	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
}