import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerts } from "../../utils/ToastAlerts";
import { DoorOpen, Layout, Notebook, PencilSimpleLine, UserCircle } from "@phosphor-icons/react";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerts("Usuário desconectado com sucesso", "info");
    navigate("/login");
  }

  let navbarComponent: ReactNode;

  if (usuario.token !== "") {
    navbarComponent = (
      <nav className="bg-gray-900 flex justify-center text-white py-3 border-b-2 sticky top-0">
        <div className="container flex justify-between gap-4">
          <Link to="/home" className="font-bold text-2xl hover:text-orange-500">
            Blog Pessoal
          </Link>

          <div className="flex gap-6 font-semibold mt-2">
            <Link to="/postagens" className="hover:text-orange-500 cursor-pointer flex gap-2">
              Postagens <Notebook size={22} />
            </Link>
            <Link to="/temas" className="hover:text-orange-500 cursor-pointer flex gap-2">
              Temas <Layout size={22} />
            </Link>
            <Link to="/cadastrartema" className="hover:text-orange-500 cursor-pointer flex gap-2">
              Cadastrar Tema <PencilSimpleLine size={22} />
            </Link>
            <Link to="/perfil" className="hover:text-orange-500 cursor-pointer flex gap-2">
              Perfil<UserCircle size={22} />
            </Link>
            <Link to="" onClick={logout} className="hover:text-orange-500 cursor-pointer flex gap-2">
              Sair<DoorOpen size={22} />
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return <>{navbarComponent}</>;
}

export default Navbar;
