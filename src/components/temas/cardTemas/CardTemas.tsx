import { Link } from "react-router-dom"
import Tema from "../../../models/Tema"

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='flex flex-col rounded-2xl overflow-hidden justify-between shadow-2xl'>
            <header className='py-2 px-6 bg-slate-900 text-white font-bold text-2xl'>
                Tema
            </header>
            <p className='p-6 text-2xl bg-slate-200 h-full font-semibold'>{tema.descricao}</p>

            <div className="flex bg-slate-900 justify-center font-semibold">
                <Link to={`/editartema/${tema.id}`} className="flex justify-center text-slate-900 bg-white px-4 py-2 hover:bg-slate-900  hover:text-white w-full">
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} className="rounded text-white px-4 py-2 bg-slate-700 hover:bg-slate-900
                 w-full flex justify-center">
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardTema