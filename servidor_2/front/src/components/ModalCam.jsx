import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import PlayerVideo from './PlayerVideo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalCam(props) {
    const camId = props.camId
    const openModalCam = props.openModalCam

    const closeModal = () => {
        props.handleCloseModal()
    }

    return (
        <div>
            <Modal
                open={openModalCam}
            >

                <Box sx={style}>
                    <div className="modalContainer">
                        <span onClick={closeModal}><ExitToAppSharpIcon /></span>
                        <div className="modalCamContainerCamViewr">
                        <PlayerVideo
                        urlVideo={props.urlVideo}
                        />
                        </div>
                    </div>
                    {camId}
                </Box>
            </Modal>
        </div>
    );
}
