import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style_perfil.css"; 
import gato from './img/cat.png';
import volta from './img/back.png';
import luffy from './img/luffy_profile.jpg';

function Perfil(){
    // Defina o estado para 'mensagem'
    const [erro, setErro] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUserName = async () => {
            const token = localStorage.getItem('token');

            const resposta = await fetch('http://localhost:3001/inicio', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const dados = await resposta.json();
            setMensagem(dados.mensagem); // Atualiza o estado com a mensagem
        };

        fetchUserName();
    }, []);

    const handleLogout = () => {
        // Remove o token do localStorage (ou sessionStorage, se for o caso)
        localStorage.removeItem('token'); // Ou sessionStorage.removeItem('token');
    
        // Redireciona para a página de login
        navigate('/login');
      };

      const handleDeletarPerfil = async () => {
        const token = localStorage.getItem('token'); // Pega o token do usuário autenticado
    
        if (!token) {
          setErro('Usuário não autenticado.');
          return;
        }
    
        try {
          const resposta = await fetch('http://localhost:3001/deletarPerfil', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, // Envia o token de autenticação
            },
          });
    
          const dados = await resposta.json();
    
          if (resposta.ok) {
            alert(dados.mensagem);
            localStorage.removeItem('token'); // Ou sessionStorage.removeItem('token');
            navigate('/login'); // Redireciona para a página de login após a exclusão
          } else {
            setErro(dados.mensagem); // Exibe erro, caso ocorra
          }
        } catch (erro) {
          setErro('Erro ao tentar excluir perfil');
          console.error(erro);
        }
      };
    
    

    return(
        <div>
            {/* <!-- Cabeçalho --> */}
            <div className="cabecalho">
                <div className="back-button">
                    <a href="/geral">
                        <img className="seta" src={volta} alt = "voltar" />
                    </a>
                </div>
                <div className="img-gato">
                    <img className="gato" src={gato} alt="Catlog" />
                </div>
            </div>
            
            <div className="container">
                <main className="profile">
                    <p className="user-date">Usuário desde 01/11/2024</p> {/* Ver se isso aqui vai continuar porque precisa por a data do cadastro e não sei se estamos salvando */}
                    <div className="profile-pic">
                        <img src={luffy} alt="Foto do Usuário" />
                    </div>
                    {/* adicionar coisa de sessão aqui */}
                    <h2>{mensagem}</h2> 
                    <ul className="options">
                        <li><a href="/editar_perfil" className='text-blue-900'>EDITAR MEUS DADOS</a></li>
                        <li><button onClick={handleDeletarPerfil} className='text-blue-900 text-sm'>EXCLUIR MINHA CONTA</button></li>
                        <li><button onClick={handleLogout} className="text-red-500 text-sm">SAIR</button></li>
                    </ul>
                </main>
            </div>
        </div>

    );
}

export default Perfil;