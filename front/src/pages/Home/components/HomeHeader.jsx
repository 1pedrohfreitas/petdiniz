import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import AvatarMenu from './AvatarMenu';
import FuncoesMenu from './FuncoesMenu';
import logo from '../../../assets/img/petdiniz.jpg'

export default function HomeHeader(props) {

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
            <div className="subHeader">
                {subTitle}
            </div>
        </div>

    );
}
