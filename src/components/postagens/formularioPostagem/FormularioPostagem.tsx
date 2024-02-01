import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerts } from "../../../utils/ToastAlerts";

function FormularioPostagem() {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    });

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null,
    });

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerts('Tempo de sessão expirou!', 'info')
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
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

    async function buscarTemas() {
        await buscar(`/temas`, setTemas, {
            headers: {
                Authorization: token,
            },
        })
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerts('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        })
    }

    function retornar() {
        navigate("/postagens")
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()


        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { 'Authorization': token }
                })
                ToastAlerts('Postagem atualizada com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    ToastAlerts('O token expirou.', 'info')
                    handleLogout
                } else {
                    ToastAlerts('Erro ao atualizar a postagem.', 'erro')
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { 'Authorization': token }
                })
                ToastAlerts('Postagem cadastrada com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    ToastAlerts('O token expirou.', 'info')
                    handleLogout
                } else {
                    ToastAlerts('Erro ao cadastrar a postagem.', 'erro')
                }
            }
        }

        retornar()

    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center text-slate-900">
            <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

            <form className="flex gap-4 flex-col p-6 text-lg w-2/4 items-center justify-center" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col w-full gap-2">
                    <label>Titulo da Postagem</label>
                    <input id="titulo" name="titulo" className="border-2 border-solid p-2 hover:border-gray-400 text-slate-900" type="text"
                        placeholder="Título"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />

                </div>
                <div className="flex flex-col w-full gap-2">
                    <label>Texto da Postagem</label>
                    <input id="texto" name="texto" className="border-2 border-solid p-2 hover:border-gray-400 text-slate-900" type="text"
                        placeholder="Texto da postagem"
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <p>
                        Tema da Postagem
                    </p>
                    <select name="tema" id="tema" className="border p-2 border-slate-800 rounded text-slate-900" onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
                        <option value="tema" selected disabled>Selecione um tema</option>

                        {temas.map((tema) => (
                            <>
                                <option value={tema.id}>{tema.descricao}</option>
                            </>
                        ))}
                    </select>
                </div>

                <button disabled={carregandoTema} type="submit" className="flex justify-center text-white p-2 bg-gray-600 hover:bg-slate-900 w-1/2 rounded text-lg">
                    {carregandoTema ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{ id !== undefined ? 'Editar' : 'Cadastrar'}</span>}

                </button>
            </form>
        </div>
    )
}

export default FormularioPostagem