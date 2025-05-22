import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo2x from './img/LOGO-2x.png';
import gato from './img/cat.png';
import logo from './img/LOGO.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Crie a constante navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const resposta = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem('token', dados.token);
      navigate('/geral'); // Redireciona para /geral
    } else {
      alert('Erro: ' + dados.erro);
    }
  };

  return (

    <div className='bg-[#2C3231]'>
      <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-12">

        <div className="bg-[#1D2120] row-span-1 col-span-1 md:col-span-2 flex justify-center items-center">
          <img className="w-8" src={gato} alt="Gatinho"/>
        </div>

        <div className="row-span-11 col-span-1 md:flex flex-col justify-center items-center hidden">
            <img src={logo2x} alt="Logo catlog grande"/>
        </div>

        <div className="row-span-3 col-span-1 flex flex-col justify-center items-center md:hidden">
            <img className="w-24" src={logo} alt="logo catlog pequena"/>
        </div>

        <div className="row-span-8 md:row-span-11 col-span-1 flex flex-col justify-start md:justify-center items-center">
        <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleLogin}>
            <p className="text-2xl lg:text-3xl font-bold font-custom text-white mb-9">LOGIN</p>
            <input className=" bg-transparent border-2 border-white rounded-3xl pl-5 w-72 lg:w-80 h-10 lg:h-12 text-[#879597] shadow-xl mb-2" type="text" placeholder="E-MAIL"  value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className=" bg-transparent border-2 border-white rounded-3xl pl-5 w-72 lg:w-80 h-10 lg:h-12 text-[#879597] shadow-xl mb-6" type="password" name="password" id="password" placeholder="SENHA" value={senha} onChange={(e) => setSenha(e.target.value)}/>
            <button type="submit" className="bg-[#AA4F66] w-40 lg:w h-10 text-white text-center pt-0 text-base rounded-3xl font-bold mb-4 hover:bg-[#db728c]">ENTRAR</button>
        </form>
        <Link className="bg-white cursor-pointer w-72 h-10 flex justify-center items-center rounded-3xl font-bold text-xs text-black hover:bg-gray-400" to="/cadastro"> NÃO SOU CADASTRADO </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;