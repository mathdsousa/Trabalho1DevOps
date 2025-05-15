package br.ufscar.dc.dsw.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufscar.dc.dsw.dao.IVagaDAO;
import br.ufscar.dc.dsw.domain.Vaga;
import br.ufscar.dc.dsw.service.spec.IVagaService;

@Service
@Transactional(readOnly = false)
public class VagaService implements IVagaService {

	@Autowired
	IVagaDAO dao;

	@Override
	public void salvar(Vaga vaga) {
		dao.save(vaga);
	}

	public void excluir(Long id) {
		dao.deleteById(id);
	}

	@Transactional(readOnly = true)
	public Vaga buscarPorId(Long id) {
		return dao.findById(id.longValue());
	}

	@Transactional(readOnly = true)
	public List<Vaga> buscarTodos() {
		return dao.findAll();
	}

	@Transactional(readOnly=true)
	public List<Vaga> buscarVagasEmpresa(Long id){
		return dao.findAllByEmpresaId(id);
	}

	@Transactional(readOnly = true)
	public List<Vaga> buscarVagasCidade(String cidade){
		return dao.findAllByCidade(cidade);
	}

}
