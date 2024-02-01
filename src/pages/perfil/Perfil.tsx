import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { ToastAlerts } from "../../utils/ToastAlerts";
import loginLogo from "../../assets/cadastro.jpg"

function Perfil() {

    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === '') {
            ToastAlerts('Você precisa estar logado', '')
            navigate('/login')
        }
    }, [usuario.token])

    return (
        <div className="py-16">
            <div className="mx-auto rounded-3xl overflow-hidden container font-semibold shadow-2xl">
                <img className="w-full h-80 object-cover border-white" src={loginLogo} alt="Capa do perfil" />
                <img className="border-8 border-white bg-white rounded-full size-40 mt-[-8rem] z-10 relative m-auto" src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />
                <div className=" border-t-8 bg-slate-900 relative mt-[-6rem] h-72 flex flex-col text-white text-2xl items-center justify-center">
                    <p>Nome: {usuario.nome}</p>
                    <p>Email: {usuario.usuario}</p>
                </div>
            </div>
        </div>
    )
}

export default Perfil
