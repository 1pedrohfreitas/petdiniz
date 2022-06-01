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

export default function LogoutLoading(props) {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    useEffect(() => {
        efetuaLogout().then(()=>{
                navigate(`/`)
        }).finally(()=>{
            localStorage.removeItem('petdiniz-token');
            navigate(`/`)
        })
    }, []);
    async function efetuaLogout(){
        return new Promise((resolve,reject)=>{
            dispatch(logout())
            localStorage.removeItem('petdiniz-token');
            resolve("Efetuado o Logout")
        })
    }
    return (<LoadingScreen />)
}