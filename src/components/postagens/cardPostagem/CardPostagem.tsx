import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  return (
    <div className="rounded-lg flex flex-col overflow-hidden justify-between bg-gray-200 text-gray-950 shadow-lg">
      <div>
        <div className="flex items-center gap-4 w-full py-2 px-4 bg-gray-900 text-gray-100">
          <img
            src={post.usuario?.foto}
            alt=""
            className="flex justify-center p-1 border-2 border-solid border-blue-500 w-10 rounded-full overflow-hidden bg-white"
          />
          <h3 className="text-lg font-bold text-center uppercase">{post.usuario?.nome}</h3>
        </div>
        <div className="p-4 font-semibold">
          <p>Título: {post.titulo}</p>
          <p>Texto: {post.texto}</p>
          <p>Tema: {post.tema?.descricao}</p>
          <p>
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(post.data))}
          </p>
        </div>
      </div>
      <div className="flex bg-orange-500 justify-center font-semibold">
        <Link
          to={`/editarpostagem/${post.id}`}
          className="flex justify-center text-gray-900 bg-white border-white border-solid px-4 py-2 hover:bg-gray-900  hover:text-white w-full"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpostagem/${post.id}`}
          className="rounded text-white border-white border-solid px-4 py-2 hover:bg-gray-900
             w-full flex justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
