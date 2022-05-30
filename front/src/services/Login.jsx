import { useDispatch } from 'react-redux';
import { loginApi } from './Api';

export async function auth(username, password) {

    var result = ""

    if (username == null || username == "") {
        result = "O campo usuario não pode estar vazio!"
    } else {
        if (password == null || password == "") {
            result = "O campo senha não pode estar vazio!"
        } else {
            const data = {
                username,
                password
            }
            await loginApi(`login/`, data).then((response) => {
                console.log(response)
                const tokenListItens = response.data.token.split('.')
                const token = `${tokenListItens[1]}_${tokenListItens[2]}`
                localStorage.setItem('petdiniz-token', token)
                result = `token:${token}`

            }).catch(err => {
                result = "Nome de usuario ou senha invalido"
            })
        }
    }
    return result
}