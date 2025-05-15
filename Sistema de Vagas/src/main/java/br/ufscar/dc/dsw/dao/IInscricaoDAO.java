package br.ufscar.dc.dsw.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.ufscar.dc.dsw.domain.Inscricao;
import br.ufscar.dc.dsw.domain.Profissional;

@SuppressWarnings("unchecked")
public interface IInscricaoDAO extends CrudRepository<Inscricao, Long>{

	Inscricao findById(long id);

	List<Inscricao> findAllByProfissional(Profissional p);

	void deleteById(Long id);

	@Query("SELECT i FROM Inscricao i WHERE i.vaga.id = :vagaId")
	List<Inscricao> findAllByVaga(@Param("vagaId") long vagaId);
		
	Inscricao save(Inscricao inscricao);
}