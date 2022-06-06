import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../../components/LoadingScreen';
import { logout } from '../../redux/userSlice';
import './style.css';


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