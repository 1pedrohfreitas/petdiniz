import { AppBar, Box, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../assets/img/petdiniz.jpg';
import CamViewCard from '../../components/CamViewCard';
import ModalCam from '../../components/ModalCam';
import { getRequest } from '../../services/Api';
import './style.css';


export function OnlyViewCams(props) {
    const { token } = useParams();
    const [cams, setCams] = useState([]);
    const [camId, setCamId] = useState(0);
    const [camUrlVideo, setCamUrlVideo] = useState(0);
    const [openModalCam, setOpenModalCam] = useState(false);
    
    async function getInfo() {
        getRequest(`onlyaccesscam/${token}`,token).then(
            (response) => {
                if (response.data.data != null) {
                    setCams(response.data.data.map((cam, i) => (
                        <CamViewCard
                            key={i}
                            camAlias={cam.alias}
                            camIcon={cam.icon.sourceimg}
                            camUrlVideo={cam.urlcamstream}
                            handleOpenModal={handleOpenModal}
                        />
                    )))
                }
            }
        )
    }

    useEffect(() => {
        getInfo()
    }, []);

    const handleOpenModal = (id, urlVideo) => {
        setCamId(id)
        setCamUrlVideo(urlVideo)
        setOpenModalCam(true)
    }
    const handleCloseModal = () => {
        setCamId(0)
        setOpenModalCam(false)
    }

    return (
        <div>
             <Box sx={{
                flexGrow: 1,
                width: "100%", justifyContent: "space-between"
            }}>
                <AppBar position="static" style={{
                    background: 'rgba(255,150,0,255)'
                }}>
                    <Toolbar>
                        <div className='homeHeaderLogo'>
                        <img src={logo} alt="logo" />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="listMyCams">
                {cams}
            </div>
            <ModalCam camId={camId}
                urlVideo={camUrlVideo}
                openModalCam={openModalCam}
                handleCloseModal={handleCloseModal} />
        </div>
    )
}