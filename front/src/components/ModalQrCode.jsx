import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import CreateQrCode from './CreateQrCode';

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

export default function ModalQrCode(props) {
    const qrCodeText = props.qrCodeText
    const openModalQrCode = props.openModalQrCode

    const closeModal = () => {
        props.handleCloseModal()
    }

    return (
        <div>
            <Modal
                open={openModalQrCode}
            >
                <Box sx={style}>
                    <div className="modalContainer">
                        <span onClick={closeModal}><ExitToAppSharpIcon /></span>
                        <CreateQrCode text={qrCodeText} />
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
