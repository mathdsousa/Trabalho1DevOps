package br.ufscar.dc.dsw.service.spec;

import java.util.List;

import br.ufscar.dc.dsw.domain.Inscricao;
import br.ufscar.dc.dsw.domain.Profissional;

public interface IInscricaoService {

	Inscricao buscarPorId(Long id);

	List<Inscricao> buscarTodosPorProfissional(Profissional p);

    List<Inscricao> buscarTodosPorVaga(Long id);

	void salvar(Inscricao inscricao);

	void excluir(Long id);
}
