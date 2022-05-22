import './style.css'

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'
import { getRequest } from '../../services/Api';
import { LoadingScreen } from '../../components/LoadingScreen';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import logo from '../../assets/img/petdiniz.jpg'

import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ValidatByTime from '../../services/ValidatByTime';
import { logout } from '../../services/Login';

function Home() {
    let navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [homePage, setHomePage] = useState(<LoadingScreen />)

    useEffect(() => {
        getUserData()
    }, []);

    useEffect(() => {
        if(userData != null ){
            // ValidatByTime(20000, null,()=>{
            //     logout().then(()=>{
            //         navigate(`/`, { replace: true })
            //     })
            // })
            setHomePage(renderByDone())
        }        
    }, [userData]);


    useEffect(() => {
        if (userData != null) {
            navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}/mycams`, { replace: true })
        }
    }, [homePage]);

    async function getUserData() {
        setTimeout(async () => {
            if (localStorage.getItem('petdiniz-token') != null) {
                const decodedJwt = await jwt(localStorage.getItem('petdiniz-token'))
                getRequest(`users/${decodedJwt.Sum}`).then((response) => {
                    setUserData(response.data)
                })
                .catch(err => {
                    location.reload();
                })
            }
        }, 2000)

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

export function HomeHeader(props) {

    const [subTitle, setSubTitle] = useState('');
    function changeSubTitle(newTitle) {
        setSubTitle(newTitle)
    }
    return (
        <div className='header'>
            <Box sx={{
                flexGrow: 1,
                width: "100%", justifyContent: "space-between"
            }}>
                <AppBar position="static" style={{
                    background: 'rgba(255,150,0,255)'
                }}>
                    <Toolbar>
                        <div className="headerMenuArea">
                            <FuncoesMenu
                                userData={props.userData}
                                changeSubTitle={changeSubTitle} />
                        </div>
                        <div className='homeHeaderLogo'>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="headerMenuArea">
                            <AvatarMenu
                                userData={props.userData}
                                changeSubTitle={changeSubTitle} />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>

    );
}

export function AvatarMenu(props) {
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGoToEditUser = () => {
        props.changeSubTitle("Editando meus dados")
        navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}/user/${props.userData.id}`)
    }

    const handleLogout = () => {
        logout().then(()=>{
            navigate(`/`, { replace: true })
        })
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}><AccountCircleIcon /></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <a onClick={handleGoToEditUser}>
                    <MenuItem>
                        <Avatar /> {props.userData.alias}
                    </MenuItem>
                </a>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
export function FuncoesMenu(props) {

    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openSubPage = (subView, subTitle) => {
        props.changeSubTitle(subTitle)
        navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}/${subView}`, { replace: true })
    }
    const serviceMenuShow = true

    const serviceMenu = () => {
        return (
            <div>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => openSubPage('addaccesscams', 'Liberar Acesso Câmeras')}>Liberar Acesso Câmeras</MenuItem>
                    <MenuItem onClick={() => openSubPage('cams', 'Listar Câmeras')}>Listar Câmeras</MenuItem>
                    <MenuItem onClick={() => openSubPage(`mycams`, 'Minhas Câmeras')}>Minhas Câmeras</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => openSubPage('user', 'Cadastrar Usuário')}>Cadastrar Usuário</MenuItem>
                    <MenuItem onClick={() => openSubPage('users', 'Listar Usuários')}>Listar Usuários</MenuItem>
                </Menu>
            </div>

        )
    }
    return (
        <div>
            {serviceMenuShow ? serviceMenu() : ""}
        </div>
    );
}
export default Home