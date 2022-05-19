import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/Login';

import './style.css'
import { SnackBarCustom } from '../../components/SnackBarCustom';
import { postRequest } from '../../services/Api';
import logo from '../../assets/img/petdiniz.jpg'

export function Login() {

    let navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [snackBarType, setSnackBarType] = useState('');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    
    useEffect(() => {
        validateToken()
    }, []);

    async function validateToken() {
        if (localStorage.getItem('petdiniz-token') != null) {
            try {
                const valid = await postRequest('/login/validatetoken', { token: localStorage.getItem('petdiniz-token') })
                if(valid != null && valid.status == 200){
                    navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}`)
                }
            } catch (error) {
                
            }
            
        }

    }

    function openSnackBar(sbType, sbMessage) {
        return new Promise((resolve, reject) => {
            setSnackBarType(sbType)
            setSnackBarMessage(sbMessage)
            resolve("Dados Atualizados")
        })
    }

    async function login(e) {
        const authResult = (await auth(user, pass))
        if (authResult.substring(0, 5) == "token") {
            const token = authResult
            
            await openSnackBar("success", "Login efetuado com sucesso!").then((e) => {
                localStorage.removeItem('petdiniz-token');
                localStorage.setItem('petdiniz-token', token.split(':')[1])    
                setTimeout(() => navigate(`/home/${token.split('.')[1]}`), 1000)
            });
        }
        else {
            await openSnackBar("error", authResult).then(() => {
                setSnackBarType('')
            })
        }
    }

    return (
        <div className='loginArea'>
            <SnackBarCustom
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
                        onChange={e => setUser(e.target.value)}
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