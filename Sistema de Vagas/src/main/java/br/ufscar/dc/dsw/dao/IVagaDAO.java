package br.ufscar.dc.dsw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.ufscar.dc.dsw.domain.Vaga;


@SuppressWarnings("unchecked")
public interface IVagaDAO extends CrudRepository<Vaga, Long> {

	Vaga findById(long id);

	List<Vaga> findAll();

	Vaga save(Vaga vaga);

	void deleteById(Long id);

	@Query("SELECT v FROM Vaga v WHERE v.empresa.id = :empresaId")
	List<Vaga> findAllByEmpresaId(@Param("empresaId") long empresaId);

	@Query("SELECT v FROM Vaga v WHERE v.empresa.cidade = :cidade")
    List<Vaga> findAllByCidade(@Param("cidade") String cidade);

}