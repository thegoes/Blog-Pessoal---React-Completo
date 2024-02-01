import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { RotatingLines } from "react-loader-spinner";
import './Login.css';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== '') {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <div className="text-white bg-slate-900 grid lg:grid-cols-2 place-items-center h-screen font-semibold grid-cols-1">

            <form className="flex flex-col items-center justify-center gap-4 w-1/3" onSubmit={login}>
                <h1 className="text-5xl">Logar</h1>
                <div className="flex flex-col w-full">
                    <label htmlFor="usuario">Usuário</label>
                    <input className="border-2 border-solid p-1 hover:border-gray-400 text-black"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuário"
                        type="text"
                        value={usuarioLogin.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="senha">Senha</label>
                    <input className="border-2 border-solid p-1 hover:border-gray-400 text-black"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        type="password"
                        value={usuarioLogin.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                </div>
                <button className="flex justify-center text-white p-1 bg-gray-600 border-solid border-2 border-white hover:bg-slate-900 w-1/2 rounded text-lg"
                    type="submit">
                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="28"
                        visible={true}
                    /> :
                        <span>Entrar</span>
                    }
                </button>

                <p className="py-5 border-t-2 border-y-gray-200">Ainda não tem uma conta? 
                    <Link to='/cadastro' className="text-violet-500 hover:underline ml-1">Cadastre-se</Link>
                </p>
            </form>

            <div className="fundoLogin hidden lg:block"></div>

        </div>
    )
}

export default Login