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

import br.ufscar.dc.dsw.domain.Profissional;
import br.ufscar.dc.dsw.service.spec.IProfissionalService;

@RestController
public class ProfissionalRestController {

    @Autowired
    private IProfissionalService profissionalService;

    private boolean isJSONValid(String jsonInString) {
        try {
            return new ObjectMapper().readTree(jsonInString) != null;
        } catch (IOException e) {
            return false;
        }
    }

    private void parse(Profissional profissional, JSONObject json, BCryptPasswordEncoder encoder) {
        Object id = json.get("id");
        if (id != null) {
            if (id instanceof Integer) {
                profissional.setId(((Integer) id).longValue());
            } else {
                profissional.setId((Long) id);
            }
        }

        profissional.setRole("ROLE_PROFISSIONAL");
        profissional.setEmail((String) json.get("email"));
        profissional.setPassword(encoder.encode(((String) json.get("password"))));
        profissional.setName((String) json.get("name"));
        profissional.setCpf((String) json.get("cpf"));
        profissional.setTelefone((String) json.get("telefone"));
        profissional.setSexo((String) json.get("sexo"));
        profissional.setNasc((String) json.get("nasc"));

    }

    // OK
    @GetMapping(path = "/api/profissionais")
    public ResponseEntity<List<Profissional>> lista() {
        List<Profissional> lista = profissionalService.buscarTodos();
        if (lista.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lista);
    }

    // OK
    @GetMapping(path = "/api/profissionais/{id}")
    public ResponseEntity<Profissional> lista(@PathVariable("id") long id) {
        Profissional profissional = profissionalService.buscarPorId(id);
        if (profissional == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profissional);
    }

    //OK
    @PostMapping(path = "/api/profissionais")
    @ResponseBody
    public ResponseEntity<Profissional> cria(@RequestBody JSONObject json, BCryptPasswordEncoder encoder) {
        try {
            if (isJSONValid(json.toString())) {
                Profissional profissional = new Profissional();
                parse(profissional, json, encoder);
                profissionalService.salvar(profissional);
                return ResponseEntity.ok(profissional);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
    }

    //OK
    @PutMapping(path = "/api/profissionais/{id}")
    public ResponseEntity<Profissional> atualiza(@PathVariable("id") long id, @RequestBody JSONObject json, BCryptPasswordEncoder encoder) {
        try {
            if (isJSONValid(json.toString())) {
                Profissional profissional = profissionalService.buscarPorId(id);
                if (profissional == null) {
                    return ResponseEntity.notFound().build();
                } else {
                    parse(profissional, json, encoder);
                    profissionalService.salvar(profissional);
                    return ResponseEntity.ok(profissional);
                }
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
    }

    //OK
    @DeleteMapping(path = "/api/profissionais/{id}")
    public ResponseEntity<Boolean> remove(@PathVariable("id") long id) {
        Profissional profissional = profissionalService.buscarPorId(id);
        if (profissional == null) {
            return ResponseEntity.notFound().build();
        } else {
            if (profissionalService.profissionalTemInscricao(id)) {
                return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
            } else {
                profissionalService.excluir(id);
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
        }
    }

}
