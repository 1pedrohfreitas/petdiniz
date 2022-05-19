import { postRequest } from './Api';

export async function auth(username, password) {

    var result = ""

    if (username == null || username == "") {
        result = "O campo usuario não pode estar vazio!"
    } else {
        if (password == null || password == "") {
            result = "O campo senha não pode estar vazio!"
        } else{
            const data = {
                username,
                password
            }
            await postRequest(`login/`, data).then((response) => {
                    result = `token:${response.data.token}`
                    
            }).catch(err =>{
                result = "Nome de usuario ou senha invalido"
            })
        }
    }
    return result
}