import Modal from "react-modal";
import cogu from "./img/cogu.jpg";
import { useState, useEffect } from 'react';
import gato from './img/cat.png';
import logo from './img/LOGO.png';
import fotoperfil from './img/user.png';
import visualizar from "./img/view.png";
import curtir from "./img/like.png";
import TextoTruncado from "./textoruncado";
import champ from "./img/champ.jpg";
import shi from "./img/shi.jpeg";

Modal.setAppElement("#root");

function Geral() {
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [postagem, setPostagem] = useState(null);
    const [posts, setPosts] = useState([]);

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

    useEffect(() => {
        const buscarPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/todosPosts");
                const data = await response.json();

                if (!response.ok) {
                    console.error(data.mensagem);
                    return;
                }

                setPosts(data.posts);

                console.log("Posts recuperados com sucesso!", posts);

            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }
        };

        buscarPosts();
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = "#2C3231";
        return () => {
            document.body.style.backgroundColor = ""; // Reseta ao desmontar
        };
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Atualiza o estado quando a tela for redimensionada
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Função para abrir modal e bloquear rolagem do body
    const abrirModal = (postagem) => {
        setPostagem(postagem);
        setModalAberto(true);
        document.body.style.overflow = "hidden"; // Bloqueia rolagem do fundo
    };

    // Função para fechar modal e restaurar rolagem do body
    const fecharModal = () => {
        setModalAberto(false);
        document.body.style.overflow = "auto"; // Restaura rolagem do fundo
    };

    return (

        <div>
            {/* <div className="flex flex-col items-center mt-20"> */}
            <div className="bg-[#1D2120] row-span-1 col-span-1 md:col-span-2 flex items-stretch gap-4">
                <div className="flex-auto w-8 flex items-center">
                    <img className="ms-4 w-8 h-8" src={gato} alt="Gatinho" />
                </div>
                <div className="flex-none flex items-center">
                    <p className="text-white">GERAL</p>
                </div>
                <div className="flex-auto w-8 flex flex-row-reverse items-center pr-4">
                    <a href="/perfil"><img className="rounded-full w-12" src={fotoperfil} alt="Foto de Perfil" /></a>
                    <a href="/">
                        <p className="mr-5 text-white hidden md:block">MEUS CATÁLOGOS</p>
                    </a>
                </div>
            </div>


            <div className="bg-[#2C3231]" id="obody">
                <div className="hidden viewpost h-screen w-screen fixed bg-[#00000080] " id="viewpost">

                </div>

                <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-12">

                    <div className="max-container flex w-screen md:flex-row flex-col">
                        {/* <!-- Mini menu que só tem no mobile --> */}
                        <div className="block md:hidden w-full bg-custom-gray h-fit text-white flex justify-center fixed bottom-0" id="botoespe">
                            <a href="/novo_post"
                                className="font-bold w-30 text-center m-2 border-2 border-slate-100 rounded-3xl bg-[#AA4F66] text-white p-3 mr-4">
                                NOVO POST
                            </a>
                            <a href="/"
                                className="font-bold w-30 text-center m-2 border-2 border-slate-100 rounded-3xl bg-[#AA4F66] text-white p-3">
                                CATÁLOGOS
                            </a>
                        </div>

                        {/* <!-- Parte esquerda do max-container --> */}
                        <div className="hidden md:block w-3/12 md:flex w-3/12 h-dvh items-center justify-center">
                            {/* <!-- Lateral esquerdo --> */}
                            <div className="ml-30 border border-[#AA4F66] rounded-3xl self-center h-96 p-5">
                                <h1 className="text-center text-white w-60">Olá, {mensagem}</h1>
                                <img className="my-8 w-24 justify-self-center" src={logo} alt="Logotipo catlog" />
                                <p className="text-center text-white mb-6 ">Posts recentes: </p>
                                <div className="justify-self-center butao">
                                    <ul>
                                        {posts.slice(0, 4).reverse().map((post) => (
                                            <li key={post.id} className="text-blue-500 text-center">{post.titulo}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Feed --> */}
                        <div className="flex-col feed h-fit w-full md:w-1/2 md:bg-custom-gray md:border-x-2 md:border-[#1D2120]">
                            {posts.slice().reverse().map((post, index) => (
                                <div className="my-8 flex-col mb-15 md:border md:rounded-md md:border-gray-400 border-b-4 border-b-[#1D2120] md:p-4 pb5 md:w-9/12 md:justify-self-center" id="card" key={index} onClick={() => abrirModal(post)}>
                                    <div className="flex-row flex mb-4">
                                        <div className="w-8"></div>
                                        <h1 className="text-white flex-auto w-8 text-center text-2xl font-bold flex-1">{post.titulo}</h1>
                                        <img className="block md:hidden w-6 h-6 mr-2" src={post.urlImagem || visualizar} alt="Ver mais" />
                                        <div className="w-8 hidden hidden md:block"></div>
                                    </div>
                                    <img src={post.urlImagem||cogu} className="justify-self-center md:w-4/5 md:w-3/4" alt="Imagem de cogumelo" />
                                    <div className="texto mt-5 w-5/6 mb-10 md:w-3/4 justify-self-center">
                                        <p className="text-center text-white">{post.texto}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="my-8 flex-col mb-15 md:border md:rounded-md md:border-gray-400 border-b-4 border-b-[#1D2120] md:p-4 pb5 md:w-9/12 md:justify-self-center" id="card" onClick={abrirModal}>
                                <div className="flex-row flex mb-4">
                                    <div className="w-8"></div>
                                    <h1 className="text-white flex-auto w-8 text-center text-2xl font-bold flex-1">Champinhon</h1>
                                    <img className="block md:hidden w-6 h-6 mr-2" src={visualizar} alt="Ver mais" />
                                    <div className="w-8 hidden hidden md:block"></div>
                                </div>
                                <img src={champ} className="justify-self-center md:w-4/5 md:w-3/4" alt="Imagem de cogumelo" />
                                <div className="texto mt-5 w-5/6 mb-10 md:w-3/4 justify-self-center">
                                    <p className="text-center text-white">O champignon (Agaricus bisporus) é um dos cogumelos mais consumidos no mundo. Ele pode ser encontrado em diferentes variedades, como o champignon branco e o portobello, que é a versão mais madura e de sabor intenso. Rico em proteínas, fibras, vitaminas do complexo B e antioxidantes, o champignon é um alimento versátil, utilizado em saladas, molhos, risotos e pizzas. Além do sabor suave, seu cultivo é relativamente fácil, tornando-o acessível e popular na culinária global.
                                    </p>
                                </div>
                            </div>
                            <div className="my-8 flex-col mb-15 md:border md:rounded-md md:border-gray-400 border-b-4 border-b-[#1D2120] md:p-4 pb5 md:w-9/12 md:justify-self-center" id="card" onClick={abrirModal}>
                                <div className="flex-row flex mb-4">
                                    <div className="w-8"></div>
                                    <h1 className="text-white flex-auto w-8 text-center text-2xl font-bold flex-1">Shiitake</h1>
                                    <img className="block md:hidden w-6 h-6 mr-2" src={visualizar} alt="Ver mais" />
                                    <div className="w-8 hidden hidden md:block"></div>
                                </div>
                                <img src={shi} className="justify-self-center md:w-4/5 md:w-3/4" alt="Imagem de cogumelo" />
                                <div className="texto mt-5 w-5/6 mb-10 md:w-3/4 justify-self-center">
                                    <p className="text-center text-white">O shiitake (Lentinula edodes) é um cogumelo comestível originário da Ásia, amplamente apreciado por seu sabor marcante e textura carnuda. Além de seu uso culinário em pratos como sopas, risotos e refogados, o shiitake é valorizado por suas propriedades nutricionais e medicinais. Ele é rico em proteínas, fibras, vitaminas do complexo B e compostos bioativos que fortalecem o sistema imunológico. Estudos também apontam benefícios como a redução do colesterol e efeitos antioxidantes. Com seu aroma característico e benefícios à saúde, o shiitake conquistou espaço na gastronomia mundial.
                                    </p>
                                </div>
                            </div>




                        </div>
                        <div className="righside hidden md:block w-3/12 flex flex-col h-screen mt-10 justify-items-center">
                            <div
                                className="font-bold text-center w-3/5 m-2 border-2 border-slate-100 rounded-3xl bg-[#AA4F66] text-white p-3 mr-4 mb-10">
                                <a href="/novo_post">
                                    NOVO POST
                                </a>
                            </div>
                            <div
                                className="font-bold w-3/5 text-center m-2 border-2 border-slate-100 rounded-3xl bg-[#AA4F66] text-white p-3">
                                <a href="/geral">
                                    CATÁLOGOS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal
                isOpen={modalAberto}
                onRequestClose={fecharModal}
                className={`${isMobile
                        ? " w-screen h-screen bg-[#2C3231] flex flex-col justify-items-center"
                        : "md:block md:p-5 mx-auto post bg-custom-gray md:h-10/12 md:inset-0 md:top-10 md:left-5/6 md:bottom-10 md:flex-col md:mb-15 md:border md:rounded-md md:border-gray-400 md:border-b-4 md:border-b-[#1D2120] md:p-4 md:pb5 md:w-2/5 md:justify-self-center"
                    }`}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
                <div>
                    <button className="absolute top-2 right-2 text-black" onClick={fecharModal}>✖</button>

                    {/* Layout de Computador */}
                    {!isMobile ? (
                        <>
                            <div className="flex-row flex mb-4">
                                <div className="w-8"></div>
                                <h1 className="text-white flex-auto w-8 text-center text-3xl  md:text-2xl font-bold md:flex-1">{postagem?.titulo}</h1>
                                <img className="block md:hidden w-6 h-6 mr-2" src={visualizar} alt="Ver mais" />
                                <div className="w-8 hidden hidden md:block"></div>
                            </div>


                            <img src={cogu} className="justify-self-center md:w-4/5 md:w-3/4" alt="Imagem de cogumelo" />
                            <div className="texto mt-5 w-5/6 mb-10 md:w-3/4 justify-self-center ">
                                <div className="overflow-auto md:max-h-48">
                                    <p className="text-white text-center mt-5">Post por <span className="font-bold ">Kelvin Aquiles Pimenta Oliveira </span>em <a className="font-bold text-blue-500" href="/">Cogumelos Famosos</a></p>
                                    <p className="text-center text-white">
                                        {postagem?.texto}
                                    </p>
                                </div>

                                {/* Estatísticas */}
                                <div className="reactions flex-row flex justify-items-center align-center justify-self-center mt-2">
                                    <img className="align-middle h-3.5 self-center" src={curtir} alt="Likes" />
                                    <p className="align-self-start font-bold ml-2 text-white mr-4">3</p>
                                    <img className="align-middle h-3.5 self-center" src={visualizar} alt="ver" />
                                    <p className="text-indigo-200 ml-2">Ver comentários</p>
                                </div>

                                {/* Sessão de comentários, mostra 1 a princípio, se clicar em ver comentários seleciona mais */}
                                <div className="">
                                    <p className="text-center text-white"><span className="font-bold ">teteux2</span> Fascinante, mais um rei do
                                        reino fungi</p>
                                </div>

                                {/* Comentar */}
                                <form action="" className="relative w-full">
                                    <div className="relative">
                                        <input className="w-90 bg-[#1D2120] p-3 text-white mt-10 w-full pr-12 lg:pr-16" type="text" placeholder="Digite um comentário" />
                                        <button type="submit" className="bg-[#AA4F66] w-14 lg:w-12 lg:h-12 text-white text-base lg:text-lg rounded-full font-bold absolute transform top-10 inset-y-0 right-0 hover:bg-[#db728c]">
                                            »
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        // Layout de Mobile
                        <div >

                            <h1 className="text-white text-center font-bold text-3xl mt-10">{postagem?.titulo}</h1>
                            <img src={cogu} alt="Foto do post" />

                            {/* Textos */}
                            <div className="max-h-[200px] overflow-auto">
                                <p className="text-white text-center mt-5 ">Post por <span className="font-bold ">teteux2 </span>em <a className="font-bold text-blue-500" href="/">Cogumelos Famosos</a></p>
                                {/* <p className=" text-center text-white">
                                
                                </p> */}
                                <TextoTruncado conteudo={postagem?.texto} />
                            </div>
                            {/* Estatisticas  */}
                            <div className="reactions flex-row flex justify-items-center align-center self-center justify-self-center mt-10">
                                <img className="align-middle h-5.5 self-center" src={curtir} alt="Likes" />
                                <p className="align-self-start font-bold ml-2 text-white mr-4">3</p>
                                <img className="align-middle h-4.5 self-center" src={visualizar} alt="ver" />
                                <p className="text-indigo-200 ml-2">Ver comentários</p>
                            </div>

                            {/* Sessão  de comentários */}
                            <div className="mt-10">
                                <p className="text-center text-white"><span className="font-bold ">teteux2</span> Fascinante, mais um rei do reino fungi</p>
                            </div>

                            <form action="" className="relative w-full">
                                <div className="relative">
                                    <input className="w-90 bg-[#1D2120] p-3 text-white mt-10 w-full pr-12 lg:pr-16" type="text" placeholder="Digite um comentário" />
                                    <button type="submit" className="bg-[#AA4F66] w-10 lg:w-16 h-10 lg:h-16 text-white text-base lg:text-lg rounded-full font-bold absolute top-1/2 transform inset-y-0 right-1 hover:bg-[#db728c]">
                                        »
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Geral;
