import { Notebook } from "@phosphor-icons/react"
import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem"
import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <div id="container" className="flex justify-center">
                <div id="subcontainer" className="container grid lg:grid-cols-2 text-slate-800 grid-cols-1">
                    <div id="texto" className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-5xl font-bold">Seja bem-vindo!</h2>
                        <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                            <Link to={`/postagens`} className="border-2 border-white flex flex-row rounded gap-2 font-semibold text-slate-800 bg-white px-4 py-2 hover:bg-slate-800  hover:text-violet-700 cursor-pointer hover:border-violet-700 hover:border-2">
                                Ver Postagens <Notebook size={24} />
                            </Link>
                        </div>
                    </div>

                    <div id="imagem" className="flex justify-center">
                        <img
                            src="https://i.imgur.com/VpwApCU.png"
                            alt="Imagem da página home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    )
}

export default Home