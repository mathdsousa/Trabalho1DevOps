import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cogu from "./img/cogu.jpg";
import visualizar from "./img/view.png";
import gato from './img/cat.png';
import logo from './img/LOGO.png';
import champ from "./img/champ.jpg";
import shi from "./img/shi.jpeg";

function Inicio(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const buscarPosts = async () => {
            try {
              const response = await fetch("/todosPosts");
              const data = await response.json();
              
              console.log(data.posts);
        
              if (response.ok) {
                setPosts(data.posts); // Atualiza o estado com os posts
              } else {
                console.error(data.mensagem); // Exibe erro, se houver
              }
            } catch (error) {
              console.error('Erro ao buscar os posts:', error);
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
    return (
        // <div className="bg-[#2C3231]" > antigo body 
            <div className="w-screen h-screen bg-[#2C3231] grid grid-cols-1 md:grid-cols-2 grid-rows-12">
                <div className="bg-[#1D2120] row-span-1 col-span-1 md:col-span-2 flex items-stretch gap-4">
                    <div className="flex-auto w-8 flex items-center">
                        <img className="ms-4 w-8 h-8" src={gato}  alt="Gato catlog"/>
                    </div>
                    <div className="flex-none flex items-center">
                        <p className="text-white">GERAL</p>
                    </div>
                    <div className="flex-auto w-8 flex flex-row-reverse items-center">
                        <Link className=" h-10 w-20 mr-4 border-2 border-slate-100 rounded-3xl bg-custom-purp text-white flex items-center justify-center text-center" to="/login">
                            LOGAR
                        </Link>
                    </div>
                </div>


                <div className="max-container flex w-screen">
                    <div className="hidden md:block w-3/12 md:flex w-3/12 h-dvh items-center justify-center">
                        <div className="ml-30 border border-[#AA4F66] rounded-3xl self-center h-96 p-5">
                            <h1 className="text-center text-white w-60">Faça seu login</h1>
                            <img className="my-8 w-24 justify-self-center" src={logo}/>
                            <p className="text-center text-white mb-6 ">Seus posts recentes: </p>
                        <div className="justify-self-center butao"> 
                        <Link className="h-10 w-20 border-2 border-slate-100 rounded-3xl bg-custom-purp text-white p-3" to="/login">
                                LOGAR
                            </Link>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Feed --> */}
                        <div className="flex-col feed h-fit w-full md:w-1/2 md:bg-custom-gray md:border-x-2 md:border-[#1D2120]">
                            {posts.slice().reverse().map((post, index) => (
                                <div className="my-8 flex-col mb-15 md:border md:rounded-md md:border-gray-400 border-b-4 border-b-[#1D2120] md:p-4 pb5 md:w-9/12 md:justify-self-center" id="card" key={index}>
                                  <div className="flex-row flex mb-4">
                                      <div className="w-8"></div>
                                      <h1 className="text-white flex-auto w-8 text-center text-2xl font-bold flex-1">{post.titulo}</h1>
                                      <img className="block md:hidden w-6 h-6 mr-2" src={visualizar} alt="Ver mais" />
                                      <div className="w-8 hidden hidden md:block"></div>
                                  </div>
                                  <img src={post.urlImagem || cogu} className="justify-self-center md:w-4/5 md:w-3/4" alt="Imagem de cogumelo" />
                                  <div className="texto mt-5 w-5/6 mb-10 md:w-3/4 justify-self-center">
                                      <p className="text-center text-white">{post.texto}
                                      </p>
                                  </div>
                                </div>  

                            ))}

                            <div className="my-8 flex-col mb-15 md:border md:rounded-md md:border-gray-400 border-b-4 border-b-[#1D2120] md:p-4 pb5 md:w-9/12 md:justify-self-center" id="card">
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
                            <div className="my-8 flex-col mb-15 md:border md:rounded-md md:border-gray-400 border-b-4 border-b-[#1D2120] md:p-4 pb5 md:w-9/12 md:justify-self-center" id="card">
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
                    <div className="righside hidden md:block w-3/12"></div>

                </div>
            </div>
        // </div>
    );
}

export default Inicio;