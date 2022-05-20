import './style.css'

import HomeHeader from './components/HomeHeader';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import jwt from 'jwt-decode'
import { getRequest } from '../../services/Api';
import { LoadingScreen } from '../../components/LoadingScreen';

function Home() {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [isDone, setIsDone] = useState(false);
    const [homePage, setHomePage] = useState(<LoadingScreen />)

    useEffect(() => {
        getUserData()
    }, []);


    useEffect(() => {
        if (isDone) {
            setHomePage(renderByDone())
        }
    }, [isDone])
    useEffect(() => {
        if (isDone) {
                    navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}/mycams`, { replace: true })
        }
    }, [homePage]);

    function getUserData() {
        const decodedJwt = jwt(localStorage.getItem('petdiniz-token'))
        getRequest(`users/${decodedJwt.Sum}`).then((data) => {
            setUserData(data.data)
        }).then(() => {
            setIsDone(true)
        })
    }
    function renderByDone() {
        return (
            <div id='homeArea'>
                <HomeHeader userData={userData} />
                <div id="conteudo">
                    <Outlet context={[userData, setUserData]} />
                </div>
            </div>
        )
    }
    return homePage
}
export default Home