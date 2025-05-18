import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import voltar from './img/back.png';
import gato from './img/cat.png';
import logo from './img/LOGO.png';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate(); // Crie a constante navigate

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const resposta = await fetch('http://127.0.0.1:3001/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        usuario,
        email,
        telefone,
        dataNascimento,
        genero,
        senha,
      }),
    });

    const dados = await resposta.json();
    console.log(dados);
    alert(dados.mensagem);

    if (resposta.ok) {
      // Redireciona para a página /geral após cadastro bem-sucedido
      navigate('/login');
    }
  };

  return (
    <div className="bg-[#2C3231] w-screen h-screen grid grid-cols-1 grid-rows-12">
      <div className="bg-[#1D2120] col-span-1 row-span-1 grid grid-rows-1 grid-cols-3 w-full">
        <div className="col-span-1 flex justify-start items-center ml-6">
          <a href="/login">
            <img className="w-5" src={voltar} alt="Voltar" />
          </a>
        </div>
        <div className="flex justify-center items-center">
          <img className="w-8" src={gato} alt="Logo" />
        </div>
      </div>  

      <div className="w-full h-full col-span-1 row-span-11 lg:grid lg:grid-cols-6 lg:grid-rows-1">
        <div className="col-span-1 row-span-1 sm:hidden"></div>

        <div className="w-full h-full grid grid-cols-1 grid-rows-11 lg:col-span-3 lg:grid lg:grid-cols-1 lg:grid-rows-12">
          <div className="w-full col-span-1 row-span-2 flex justify-center items-center pt-7">
            <p className="text-2xl lg:text-5xl font-bold font-custom text-white mb-9">CADASTRO</p>
          </div>

          <div className="w-full col-span-1 row-span-9 flex flex-col items-center">
            <form onSubmit={handleCadastro} className="flex flex-col gap-4 justify-center items-center">
              <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[636px] h-10 lg:h-14 text-[#879597]" type="text" placeholder="NOME" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[636px] h-10 lg:h-14 text-[#879597]" type="text" placeholder="USUARIO" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[636px] h-10 lg:h-14 text-[#879597]" type="email" placeholder="E-MAIL" value={email} onChange={(e) => setEmail(e.target.value)} />

              <div className="flex flex-col lg:flex-row gap-4">
                <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[275px] h-10 lg:h-14 text-[#879597]" type="text" placeholder="TELEFONE" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[334px] h-10 lg:h-14 text-[#879597]" type="date" placeholder="DATA DE NASCIMENTO" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              </div>

              <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[636px] h-10 lg:h-14 text-[#879597]" type="text" placeholder="GÊNERO" value={genero} onChange={(e) => setGenero(e.target.value)} />

              <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[636px] h-10 lg:h-14 text-[#879597]" type="password" placeholder="SENHA" value={senha} onChange={(e) => setSenha(e.target.value)} />
              <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 lg:w-[636px] h-10 lg:h-14 text-[#879597]" type="password" placeholder="CONFIRMAR SENHA" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />

              <button type="submit" className="bg-[#AA4F66] w-40 lg:w-44 h-10 lg:h-16 text-white text-base lg:text-lg rounded-full font-bold mt-5 hover:bg-[#db728c]">CONCLUIR</button>
            </form>
          </div>
        </div>

        <div className="hidden lg:col-span-3 lg:flex justify-end items-end mr-9 mb-10">
          <img src={logo} alt="Logo Final" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
