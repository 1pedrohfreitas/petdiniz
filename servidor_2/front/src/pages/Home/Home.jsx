import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/img/petdiniz.jpg';
import './style.css';

function Home() {
    let navigate = useNavigate();
    const { token } = useParams()
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

    useEffect(() => {
        if (userData != null) {
            let timeValid
            window.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onkeydown = resetTimer;

            function resetTimer(){
                clearTimeout(timeValid)
                timeValid = setTimeout(()=>{
                    navigate(`/logout`, { replace: true })
                },30 * 60000)
            }
        }
    }, [userData]);


    useEffect(() => {
        if (userData != null) {
            navigate(`/home/${token}/mycams`, { replace: true })
        } else {
            navigate(`/validalogin/${token}/`, { replace: true })
        }
    }, []);

    if (userData != null) {
        return (
            <div id='homeArea'>
                <HomeHeader />
                <div id="conteudo">
                    <Outlet />
                </div>
            </div>
        )
    } else {
        return (
            <div id='homeArea'>
                Vou reiniciar
            </div>
        )
    }


}

export function HomeHeader(props) {
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user
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
                                userData={userData}
                                changeSubTitle={changeSubTitle} />
                        </div>
                        <div className='homeHeaderLogo'>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="headerMenuArea">
                            <AvatarMenu
                                userData={userData}
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
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

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
        navigate(`/home/${localStorage.getItem('petdiniz-token')}/user/${userData.id}`)
    }

    const handleLogout = () => {
        navigate(`/logout`, { replace: true })
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
                        <Avatar /> {userData.alias}
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
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

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
        navigate(`/home/${localStorage.getItem('petdiniz-token')}/${subView}`, { replace: true })
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
                    <MenuItem
                        style={{ display: [0, 1, 2].indexOf(userData.usertype) > -1 ? "flex" : "none" }}
                        onClick={() => openSubPage('addaccesscams', 'Liberar Acesso Câmeras')}
                    >
                        Liberar Acesso Câmeras
                    </MenuItem>
                    <MenuItem
                        style={{ display: [0, 1, 2].indexOf(userData.usertype) > -1 ? "flex" : "none" }}
                        onClick={() => openSubPage('listaccesscams', 'Listar Permissão Acesso Câmeras')}
                    >
                        Listar Permissão Acesso Câmeras
                    </MenuItem>
                    <MenuItem
                        style={{ display: [0, 1].indexOf(userData.usertype) > -1 ? "flex" : "none" }}
                        onClick={() => openSubPage('cams', 'Listar Câmeras')}
                    >
                        Listar Câmeras
                    </MenuItem>
                    <MenuItem
                        style={{ display: [0, 1, 2, 3].indexOf(userData.usertype) > -1 ? "flex" : "none" }}
                        onClick={() => openSubPage(`mycams`, 'Minhas Câmeras')}
                    >
                        Minhas Câmeras
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        style={{ display: [0, 1, 2].indexOf(userData.usertype) > -1 ? "flex" : "none" }}
                        onClick={() => openSubPage('user', 'Cadastrar Usuário')}
                    >
                        Cadastrar Usuário
                    </MenuItem>
                    <MenuItem
                        style={{ display: [0, 1, 2].indexOf(userData.usertype) > -1 ? "flex" : "none" }}
                        onClick={() => openSubPage('users', 'Listar Usuários')}
                    >
                        Listar Usuários
                    </MenuItem>
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