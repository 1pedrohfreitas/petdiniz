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
                        console.log(err)
                })
            }
        }, 500)

    }

    return (<LoadingScreen />)
}