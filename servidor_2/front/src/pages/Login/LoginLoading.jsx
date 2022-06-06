import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingScreen } from '../../components/LoadingScreen';
import { changeUser } from '../../redux/userSlice';
import { getUserDataApi, postRequest } from '../../services/Api';
import './style.css';


export default function LoginLoading(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const { token } = useParams()

    useEffect(() => {
        if(token == undefined || token == 'undefined'){
            navigate('/')
        } else {
                postRequest('/login/validatetoken', { token: token },localStorage.getItem('petdiniz-token')).then((response)=>{
                    if (response != null && response.status == 200) {
                        getUserData(response.data.id)
                    }                
                }).catch (error =>{
                    localStorage.removeItem('petdiniz-token')
                    navigate('/')
                }) 
        }
        
    }, []);

    async function getUserData(id) {
        setTimeout(async () => {
            if (token != null) {
                getUserDataApi(id, token).then((response) => {
                    dispatch(changeUser(response.data))
                }).then(()=>{
                    navigate(`/home/${token}`)
                })
                .catch(err => {
                    navigate(`/validalogin/${token.split(':')[1]}`)
                })
            }
        }, 500)

    }

    return (<LoadingScreen />)
}