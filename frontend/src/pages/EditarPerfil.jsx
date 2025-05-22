import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import voltar from "./img/back.png";
import gato from "./img/cat.png";
import logo from "./img/LOGO.png";

function EditarPerfil() {
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const pegarPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
    
                if (!token) {
                    console.log('Nenhum token encontrado');
                    return;
                }
    
                const resposta = await fetch('/recuperarPerfil', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const dados = await resposta.json();

                console.log(dados);
    
                if (resposta.ok) {
                    setNome(dados.nome || '');
                    setUsuario(dados.usuario || '');
                    
                    setEmail(dados.email || '');
                    setTelefone(dados.telefone || '');
                    setDataNascimento(dados.dataNascimento.split("T")[0] || '');
                    setGenero(dados.genero || '');
                } else {
                    console.error('Erro ao buscar perfil:', dados);
                }
            } catch (erro) {
                console.error('Erro ao buscar perfil', erro);
            }
        };
    
        pegarPerfil();
    }, []);

    const handleEditarPerfil = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        const resposta = await fetch('http://localhost:3001/editarPerfil', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
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
        alert(dados.mensagem);

        if (resposta.ok) {
            // Atualiza o token no localStorage
            localStorage.setItem('token', dados.token);
            navigate('/perfil');
        }
    };
    
    return (
        <div>
            <div className="w-screen h-screen grid grid-cols-1 grid-rows-12">
                {/* <!-- Cabeçalho --> */}
                <div className="bg-[#1D2120] col-span-1 row-span-1 grid grid-rows-1 grid-cols-3 w-full">
                    <div className="col-span-1 flex justify-start items-center ml-6">
                        <a href="./perfil">
                            <img className="w-5" src={voltar} alt="voltarw" />
                        </a>
                    </div>
                    <div className="flex justify-center items-center">
                        <img className="w-8" src={gato} alt="gato pequeno" />
                    </div>
                </div>
                <div className="w-full h-full col-span-1 row-span-11 md:grid md:grid-cols-6 md:grid-rows-1">
                    {/* <!-- div vazia para um espaço --> */}
                    <div className="col-span-1 row-span-1 sm:hiddem"></div>
                    <div className="w-full h-full grid grid-cols-1 grid-rows-11 md:col-span-3 md:grid md:grid-cols-1 md:grid-rows-12 ">
                        <div className="w-full col-span-1 row-span-2 md:row-span-2 flex md:justify-start justify-center items-center pt-7">
                            <p className="text-2xl md:text-5xl font-bold font-custom text-white mb-9">EDITAR PERFIL</p>
                        </div>
                        <div className="w-full col-span-1 row-span-9 flex flex-col justify-start items-center md:items-start">
                            <form onSubmit={handleEditarPerfil} className="flex flex-col justify-center items-center gap-2 md:gap-4">
                                <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[636px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" type="text" placeholder="FULANO"  value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[636px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" id="1999" type="text" placeholder="USER0000" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                                <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[636px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" type="text" placeholder="FULANO@GMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="flex flex-col md:flex-row justify-center items-center md:flex md:justify-center md:items-center gap-2 md:gap-6">
                                    <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[275px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" type="text" placeholder="(16)99569-4385" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                    <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[334px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" type="date" placeholder="07/11/2000"  value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                                </div>
                                <div className="w-full flex justify-end items-center">
                                    <input className="bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[636px] h-10 md:h-14 text-[#879597] shadow-xl mb-2 outline-0" type="text" placeholder="MASCULINO" value={genero} onChange={(e) => setGenero(e.target.value)}/>
                                    <svg className="stroke-1 w-8 stroke-white absolute mr-4 mb-1 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[636px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" type="password" placeholder="***********" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                <input className=" bg-transparent border-2 border-white rounded-full pl-5 w-72 md:w-[636px] h-10 md:h-14 text-[#879597] shadow-xl mb-2" type="password" placeholder="***********" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                                <button type='submit' className="bg-[#AA4F66] w-40 md:w-44 h-10 md:h-16 text-white text-base md:text-lg rounded-full font-bold mt-5 hover:bg-[#db728c]">CONCLUIR</button>
                            </form>
                        </div>
                    </div>
                    <div className="hidden md:col-span-2 md:row-span-1 md:flex md:justify-end md:items-end md:mr-9 md:mb-10">
                        <img src={logo} alt="Catlog " />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarPerfil;