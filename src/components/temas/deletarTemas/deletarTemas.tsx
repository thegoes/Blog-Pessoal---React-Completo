import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerts } from "../../../utils/ToastAlerts";

function DeletarTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)

    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerts('Tempo de sessão expirou!', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerts('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/temas")
    }

    async function deletarTema() {

        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { 'Authorization': token }
            })
            ToastAlerts('Tema excluído com sucesso!', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerts('O token expirou.', 'info')
                handleLogout
            } else {
                ToastAlerts('Erro ao excluir tema.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()

    }

    return (
        <div className="w-1/3 mx-auto">
            <h1 className='text-4xl text-center my-4'>Deletar Tema</h1>
            <p className='text-center mb-4'>Você tem certeza que deseja apagar o tema a seguir?</p>
            <div className='flex flex-col rounded-2xl overflow-hidden justify-between shadow-2xl'>
                <h1 className='py-2 px-6 bg-slate-900 text-white font-bold text-2xl'>
                    Tema
                </h1>
                <p className='p-8 text-3xl bg-slate-100 h-full font-semibold'>{tema.descricao}</p>
                <div className="flex bg-slate-500 justify-center font-semibold text-lg">
                    <button className="flex justify-center text-slate-900 bg-white border-white border-solid px-4 
                    py-2 hover:bg-slate-900  hover:text-white w-full"
                        onClick={retornar}>Não</button>

                    <button className="rounded text-white border-white border-solid px-4 py-2 
                    hover:bg-slate-900 w-full flex justify-center"
                        onClick={deletarTema}>
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

export default DeletarTema