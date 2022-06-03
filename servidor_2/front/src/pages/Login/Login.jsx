import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../services/Login';

import './style.css'
import { SnackBarCustom } from '../../components/SnackBarCustom';
import { getUserDataApi, postRequest } from '../../services/Api';
import logo from '../../assets/img/petdiniz.jpg'
import { LoadingScreen } from '../../components/LoadingScreen';
import { useDispatch } from 'react-redux';
import { changeUser, logout } from '../../redux/userSlice';

export default function Login() {

    let navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [snackBarType, setSnackBarType] = useState('');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    useEffect(() => {
        validateToken()
    }, []);

    async function validateToken() {
        if (localStorage.getItem('petdiniz-token') != null) {
            try {
                const valid = await postRequest('/login/validatetoken', { token: localStorage.getItem('petdiniz-token') },localStorage.getItem('petdiniz-token'))
                if (valid != null && valid.status == 200) {
                    navigate(`/home/${localStorage.getItem('petdiniz-token')}`)
                }
            } catch (error) {
                console.log("Token Invalido")
            }
        }
    }

    function openSnackBar(sbType, sbMessage) {
        return new Promise((resolve, reject) => {
            setSnackBarType(sbType)
            setSnackBarMessage(sbMessage)
            setSnackBarOpen(true)
            resolve("Dados Atualizados")
        })
    }

    function login(e) {
        auth(user, pass).then(authResult => {
            if (authResult.substring(0, 5) == "token") {
                const token = authResult
                openSnackBar("success", "Login efetuado com sucesso!").then(() => {
                    setTimeout(() => {
                        setSnackBarOpen(false)
                    }, 2000);
                }).then(() => {
                    console.log(token)
                    setTimeout(() => navigate(`/validalogin/${token.split(':')[1]}`), 2000)
                })
            }
            else {
                openSnackBar("error", authResult).finally(() => {
                    setTimeout(() => {
                        setSnackBarOpen(false)
                    }, 3000);
                })
            }
        }).catch(err => {
            console.log("Erro")
        })

    }

    return (
        <div className='loginArea'>
            <SnackBarCustom
                open={snackBarOpen}
                typeMessage={snackBarType}
                mensage={snackBarMessage}
            />
            <div className='logoArea'>
                <img src={logo} alt="logo" />
            </div>
            <div className='userPassArea'>
                <div className="userArea">
                    <input type="text" name="userInput" id="userInput"
                        placeholder='Usuario'
                        value={user}
                        onChange={e => setUser(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="passArea">
                    <input type="password"
                        name="userPassword"
                        id="userPassword"
                        placeholder='Senha'
                        value={pass}
                        onChange={e => setPass(e.target.value)} />
                </div>
                <button
                    className='btnLogin'
                    onClick={login}
                >
                    Entrar
                </button>
            </div>
        </div>
    )
}