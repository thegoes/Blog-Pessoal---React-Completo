import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const { usuario } = useContext(AuthContext);

  let componentFooter: ReactNode;

  let currentYear = new Date().getFullYear();

  if (usuario.token !== "") {
    componentFooter = (
      <div className="bg-gray-900 text-white border-t-2 border-gray-700 py-4">
        <div className="container mx-auto flex flex-col items-center">
          <p className="font-bold text-xl mb-2">Blog Pessoal Generation | Copyright: {currentYear}</p>
          <p>Acesse minhas redes sociais</p>
          <div className="flex gap-4 py-2">
            <a href="https://www.linkedin.com/in/guilherme-g-silva-98aba4284/" target="_blank" rel="noopener noreferrer">
              <LinkedinLogo size={24} weight="bold" className="text-orange-500 hover:text-orange-700" />
            </a>
            <a href="https://github.com/thegoes" target="_blank" rel="noopener noreferrer">
              <GithubLogo size={24} weight="bold" className="text-gray-300 hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{componentFooter}</>;
}

export default Footer;
