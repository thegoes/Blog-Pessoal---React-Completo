import { useContext, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerts } from "../../../utils/ToastAlerts";

function DeletarPostagem() {

    const [postagem, setPostagem] = useState<Postagem>({}as Postagem)

    const { id } = useParams<{id: string}>()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const navigate = useNavigate();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerts('Tempo de sessão expirou!', '')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerts('Você precisa estar logado', '')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/postagens")
    }

    async function deletarPostagem() {

        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: { 'Authorization': token }
            })
            ToastAlerts('Postagem excluída com sucesso!', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerts('O token expirou.', 'info')
                handleLogout
            } else {
                ToastAlerts('Erro ao excluir postagem.', 'erro')
            }
        }

        setIsLoading(false)

        retornar()

    }

    return (
        <div className="w-1/3 mx-auto flex flex-col gap-4 text-slate-900">
            <h1 className='text-4xl text-center my-4'>Deletar Postagem</h1>
            <p className='text-center mb-4'>Você tem certeza que deseja excluir a postagem a seguir?</p>
            <div className='flex flex-col rounded-2xl overflow-hidden justify-between shadow-2xl'>
                <h1 className='py-2 px-6 bg-slate-900 text-white font-bold text-2xl'>Postagem</h1>
                <div className="flex flex-col gap-5 bg-slate-200 py-5">
                    <p className='px-8 text-2xl font-semibold'>{postagem.titulo}</p>
                    <p className='px-8 text-xl'>{postagem.texto}</p>
                </div>
                <div className="flex bg-slate-500 justify-center font-semibold text-lg">
                    <button className="flex justify-center text-slate-900 bg-white border-white border-solid px-4 
                    py-2 hover:bg-slate-900  hover:text-white w-full"
                        onClick={retornar}>Não</button>

                    <button className="rounded text-white border-white border-solid px-4 py-2 
                    hover:bg-slate-900 w-full flex justify-center"
                        onClick={deletarPostagem}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem
