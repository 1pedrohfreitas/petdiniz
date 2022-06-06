import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalQrCode from '../../components/ModalQrCode';
import { SnackBarCustom } from '../../components/SnackBarCustom';
import { TableListItemSimple } from '../../components/TableListItemSimple';
import { formataDurationMin, formatDateDDMMYYYYHHMMss } from '../../services/DateUtil';
import './style.css';

export default function DetailsAccessCams(props) {
    let { token } = useParams()

    const [camsList, setCamsList] = useState([]);
    const [alias, setAlias] = useState('');
    const [durationPermitions, setDurationPermitions] = useState('');
    const [startPermissionDate, setStartPermissionDate] = useState('');
    const [stopPermissionDate, setStopPermissionDate] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [operator, setOperator] = useState('');
    const [onlyLink, setOnlyLink] = useState('');

    const [openModal, setOpenModal] = useState(false);

    const [snackBarType, setSnackBarType] = useState('');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);


    function openSnackBar(sbType, sbMessage) {
        return new Promise((resolve, reject) => {
            setSnackBarType(sbType)
            setSnackBarMessage(sbMessage)
            setSnackBarOpen(true)
            resolve("Dados Atualizados")
        })
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        import('../../services/Api').then(api =>{
            api.getRequest(`cams/camaccesspermission/${token}`, localStorage.getItem('petdiniz-token')).then(response => {
                const { data } = response
                if (data != null) {
                    setAlias(data.alias)
                    setDurationPermitions(formataDurationMin(data.durationpermitions))
                    setStartPermissionDate(formatDateDDMMYYYYHHMMss(data.startpermissiondate))
                    setStopPermissionDate(formatDateDDMMYYYYHHMMss(data.stoppermissiondate))
                    setUserId(data.userid)
                    setUserName(data.username)
                    setOperator(data.createbyusername)
                }
            }).then(() => {
                if (userId == 0) {
                    setOnlyLink(`${window.location.origin}/onlyviewcams/${token}`)
                }
            })
    
            api.getRequest(`onlyaccesscam/${token}`, localStorage.getItem('petdiniz-token')).then(response => {
                if (response.data.data != null) {
                    setCamsList(response.data.data)
                }
            })
        })
        


    }, []);

    const handleCopyOnlyLink = (e) => {
        navigator.clipboard.writeText(onlyLink).then(() => {
            openSnackBar("success", "Link copiado com sucesso!").then(() => {
            }).finally(() => {
                setTimeout(() => {
                    setSnackBarOpen(false)
                }, 3000);
            })
        })
    }


    const columns = [
        { id: 'alias', label: 'Cameras:', width: 100 }
    ];

    return (
        <div className="tableListItemArea">
            <div className="accessInfo">
                <TextField id="alias" autoComplete="off" disabled={true} style={{ maxWidth: 600 }} value={alias} label="Nome Referência:" variant="outlined" />
                <TextField id="client" autoComplete="off" disabled={true} style={{ maxWidth: 600 }} value={userName} label="Usuario:" variant="outlined" />
                <TextField id="operator" autoComplete="off" disabled={true} style={{ maxWidth: 600 }} value={operator} label="Autorizado por:" variant="outlined" />
                <TextField id="startPermissionDate" autoComplete="off" disabled={true} style={{ maxWidth: 600 }} value={startPermissionDate} label="Inicio Permissão:" variant="outlined" />
                <TextField id="stopPermissionDate" autoComplete="off" disabled={true} style={{ maxWidth: 600 }} value={stopPermissionDate} label="Fim Permissão:" variant="outlined" />
                <TextField id="durationaccesspermission" autoComplete="off" disabled={true} style={{ maxWidth: 600 }} value={durationPermitions} label="Duração da Permissão:" variant="outlined" />
            </div>
            <div className="onlyLinkArea" style={{
                display : userId == 0 ? "flex" : "none"
            }}>
                <TextField id="onlyLink" autoComplete="off" value={onlyLink} label="Link de Liberação:" variant="outlined" />
                <div className="linkAreaTextBtnArea">
                    <button
                        onClick={handleCopyOnlyLink}
                    >
                        Copiar!
                    </button>
                    <button
                        onClick={() => setOpenModal(true)}
                    >
                        Gerar QrCode
                    </button>
                </div>
            </div>


            <div className="tableListCams">
                <TableListItemSimple
                    columns={columns}
                    data={camsList}
                />
            </div>
            <SnackBarCustom
                open={snackBarOpen}
                typeMessage={snackBarType}
                mensage={snackBarMessage}
            />
            <ModalQrCode
                openModalQrCode={openModal}
                qrCodeText={onlyLink}
                handleCloseModal={handleCloseModal}
            />

        </div>)
}