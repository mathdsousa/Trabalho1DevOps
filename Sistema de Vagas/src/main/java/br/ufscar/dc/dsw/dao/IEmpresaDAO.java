package br.ufscar.dc.dsw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.ufscar.dc.dsw.domain.Empresa;
import br.ufscar.dc.dsw.domain.Usuario;

@SuppressWarnings("unchecked")
public interface IEmpresaDAO extends CrudRepository<Empresa, Long>{

	Empresa findById(long id);
	
	Empresa findByCnpj (String CNPJ);

	List<Empresa> findAll();
	
	Empresa save(Empresa Empresa);

	void deleteById(Long id);

	//@Query("SELECT u FROM Empresa u WHERE u.usuario.id = :usuarioId")
    //Empresa findByUserId(@Param("usuarioId") Long usuarioId);

	@Query("SELECT e FROM Empresa e WHERE e.cidade LIKE %:cidade%")
    List<Empresa> findByCidade(@Param("cidade") String cidade);

}
