import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Geral from './pages/Geral';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import NovoPost from './pages/NovoPost';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/geral" element={<Geral />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar_perfil" element={<EditarPerfil />} />
          <Route path="/novo_post" element={<NovoPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;