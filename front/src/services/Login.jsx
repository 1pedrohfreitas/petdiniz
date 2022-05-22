import { loginApi, postRequest } from './Api';

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
                localStorage.setItem('petdiniz-token', response.data.token)
                result = `token:${response.data.token}`

            }).catch(err => {
                result = "Nome de usuario ou senha invalido"
            })
        }
    }
    return result
}

export function logout() {
    return new Promise((resolve, response) => {
        localStorage.removeItem('petdiniz-token');
        resolve("Ja Limpei o token")
    })
}