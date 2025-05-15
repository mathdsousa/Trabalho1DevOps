package br.ufscar.dc.dsw.controller;

import java.io.IOException;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.ufscar.dc.dsw.domain.Empresa;
import br.ufscar.dc.dsw.service.spec.IEmpresaService;

@RestController
public class EmpresaRestController {

    @Autowired
    private IEmpresaService empresaService;

    private boolean isJSONValid(String jsonInString) {
        try {
            return new ObjectMapper().readTree(jsonInString) != null;
        } catch (IOException e) {
            return false;
        }
    }

    private void parse(Empresa empresa, JSONObject json, BCryptPasswordEncoder encoder) {

        Object id = json.get("id");
        if (id != null) {
            if (id instanceof Integer) {
                empresa.setId(((Integer) id).longValue());
            } else {
                empresa.setId((Long) id);
            }
        }

        empresa.setRole("ROLE_EMPRESA");
        empresa.setName((String) json.get("name"));
        empresa.setEmail((String) json.get("email"));
        empresa.setPassword(encoder.encode(((String) json.get("password"))));
        empresa.setCidade((String) json.get("cidade"));
        empresa.setCnpj((String) json.get("cnpj"));
        empresa.setDescricao((String) json.get("descricao"));
    }

    @GetMapping(path = "/api/empresas")
    public ResponseEntity<List<Empresa>> lista() {
        List<Empresa> lista = empresaService.buscarTodos();
        if (lista.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping(path = "/api/empresas/{id}")
    public ResponseEntity<Empresa> lista(@PathVariable("id") long id) {
        Empresa empresa = empresaService.buscarPorId(id);
        if (empresa == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(empresa);
    }

    @GetMapping(path = "/api/empresas/cidades/{nome}")
    public ResponseEntity<List<Empresa>> listaPorCidade(@PathVariable("nome") String nome) {
        List<Empresa> empresas = empresaService.buscarPorCidade(nome);
        if (empresas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(empresas);
    }


    //OK
    @PostMapping(path = "/api/empresas")
    @ResponseBody
    public ResponseEntity<Empresa> cria(@RequestBody JSONObject json, BCryptPasswordEncoder encoder) {
        try {
            if (isJSONValid(json.toString())) {
                Empresa empresa = new Empresa();
                parse(empresa, json, encoder);
                empresaService.salvar(empresa);
                return ResponseEntity.ok(empresa);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
    }

    //OK
    @PutMapping(path = "/api/empresas/{id}")
    public ResponseEntity<Empresa> atualiza(@PathVariable("id") long id, @RequestBody JSONObject json, BCryptPasswordEncoder encoder) {
        try {
            if (isJSONValid(json.toString())) {
                Empresa empresa = empresaService.buscarPorId(id);
                if (empresa == null) {
                    return ResponseEntity.notFound().build();
                } else {
                    parse(empresa, json, encoder);
                    empresaService.salvar(empresa);
                    return ResponseEntity.ok(empresa);
                }
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
    }

    //OK
    @DeleteMapping(path = "/api/empresas/{id}")
    public ResponseEntity<Boolean> remove(@PathVariable("id") long id) {

        Empresa empresa = empresaService.buscarPorId(id);
        if (empresa == null) {
            return ResponseEntity.notFound().build();
        } else {
            if (empresaService.empresaTemVagas(id)) {
                return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
            } else {
                empresaService.excluir(id);
                return new ResponseEntity<Boolean>(true, HttpStatus.OK);
            }
        }
    }
}


