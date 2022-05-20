import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../services/Api';
import './style.css'
import { TableListItem } from '../../components/TableListItem';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import CamViewCard from '../../components/CamViewCard';
import RadioListItem from '../../components/RadioListItem';
import ModalCam from '../../components/ModalCam';
import jwt from 'jwt-decode'
import { SnackBarCustom } from '../../components/SnackBarCustom';
import CreateQrCode from '../../components/CreateQrCode';
import ModalQrCode from '../../components/ModalQrCode';

export function MyCams(props) {

    async function getIdUser() {
        const decodedJwt = await jwt(localStorage.getItem('petdiniz-token'))
        return decodedJwt.Sum
    }

    const [cams, setCams] = useState([]);
    const [camId, setCamId] = useState(0);
    const [camUrlVideo, setCamUrlVideo] = useState(0);

    const [openModalCam, setOpenModalCam] = useState(false);

    const handleOpenModal = (id, urlVideo) => {
        setCamId(id)
        setCamUrlVideo(urlVideo)
        setOpenModalCam(true)
    }
    const handleCloseModal = () => {
        setCamId(0)
        setOpenModalCam(false)
    }
    useEffect(() => {
        getIdUser().then((userId) => {
            getRequest(`cams/mycams/${userId}`).then(
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
        })

    }, []);

    return (
        <div className="myCamsArea">
            <div className="listMyCams">
                {cams}
            </div>
            <ModalCam camId={camId}
                urlVideo={camUrlVideo}
                openModalCam={openModalCam}
                handleCloseModal={handleCloseModal} />

        </div>)
}
const subUrl = `cams/`
export function ShowCams(props) {

    const columns = [
        { id: 'id', label: 'ID:', minWidth: 50 },
        { id: 'alias', label: 'Nome Amigavel:', width: 150 },
        { id: 'devicename', label: 'Nome:', minWidth: 200 },
        { id: 'streamtype', label: 'Status:', minWidth: 200 },
    ];

    return (
        <div className="tableListItemArea">
            <TableListItem
                subUrl={subUrl}
                columns={columns}
            />
        </div>)
}

export function AddAccessCams(props) {
    const now = new Date();
    const [startDate, setStartDate] = useState(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
    const [endDate, setEndDate] = useState(new Date(now.getTime() + 24 * 3600000 - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
    const [listCamPermission, setListCamPermission] = useState([]);
    const [durationDate, setDurationDate] = useState(20);
    const [onlyLink, setOnlyLink] = useState('');
    const [typeEndPermission, setTypeEndPermission] = useState(1);

    const [snackBarType, setSnackBarType] = useState('');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const [typeUserPermission, setTypeUserPermission] = useState(1);
    const [userIdPermission, setUserIdPermission] = useState('');

    const [users, setUsers] = useState([]);
    const [cams, setCams] = useState([]);
    const [openModal, setOpenModal] = useState(false);


    const getAllDates = () => {
        getRequest(`users/`).then((response) => {
            if (response.data.data != null) {
                setUsers(response.data.data.map(user => ({
                    name: user.fullname,
                    id: user.id,

                })))
            }
        })
        getRequest(`cams/`).then((response) => {
            if (response.data.data != null) {
                setCams(response.data.data.map(cam => ({
                    id: cam.id,
                    label: cam.alias
                })))
            }
        })
    }
    useEffect(() => {
        getAllDates()
    }, []);

    const handleSaveAccess = () => {
        let data = {
            startpermissiondate: `${startDate}.000000-03:00`,
            camid: listCamPermission
        }
        if (typeEndPermission == 1) {
            data.stoppermissiondate = `${endDate}.000000-03:00`
        }
        if (typeEndPermission == 2) {
            data.durationpermitions = durationDate
        }
        if (typeUserPermission == 1) {
            if (userIdPermission != null) {
                data.userid = userIdPermission
            } else {
                return alert("Erro")
            }

        }
        postRequest('cams/camaccesspermission', data).then((response) => {
            const token = response.data
            setOnlyLink(`${window.location.origin}/onlyviewcams/${token.split('.')[1]}`)
            openSnackBar("success", "Link gerado com sucesso!").then(() => {
            }).finally(() => {
                setTimeout(() => {
                    setSnackBarOpen(false)
                }, 3000);
            })

        }).catch(err => console.log(err))
    }
    function openSnackBar(sbType, sbMessage) {
        return new Promise((resolve, reject) => {
            setSnackBarType(sbType)
            setSnackBarMessage(sbMessage)
            setSnackBarOpen(true)
            resolve("Dados Atualizados")
        })
    }
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
    const handleChangeTypeEndPermission = (e) => {
        setTypeEndPermission(e.target.value)
    }
    const handleChangeTypeUserPermission = (e) => {
        setTypeUserPermission(e.target.value)
    }
    const handleChangeListCamPermission = (cheboxValue) => {
        setListCamPermission(cheboxValue)
    }
    const handleChangeAutoCompleteUser = (value) => {
        if (value != null) {
            setUserIdPermission(value.id)
        } else {
            setUserIdPermission(null)
        }
    }

    const defaultProps = {
        options: users,
        getOptionLabel: (option) => option.name,
    };

    const handleOpenModal = (id, urlVideo) => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    return (
        <div className="addAccessCams">
            <div className="addAccessCamsArea">

                <div className="dateTimeArea">
                    <TextField
                        id="startdatetime"
                        type={'datetime-local'}
                        onChange={e => setStartDate(e.target.value)}
                        autoComplete="off"
                        style={{ maxWidth: 600 }}
                        value={startDate}
                        label="Inicio da permissão:"
                        variant="outlined" />
                    <RadioListItem
                        handleChangeRadio={handleChangeTypeEndPermission}
                        title="Delimitação de tempo"
                        itens={[
                            {
                                value: 1,
                                label: "Data"
                            },
                            {
                                value: 2,
                                label: "Duração"
                            }
                        ]}
                    />

                    <TextField
                        id="fimdatetime"
                        type={'datetime-local'}
                        onChange={e => setEndDate(e.target.value)}
                        autoComplete="off"
                        style={{ maxWidth: 600, display: typeEndPermission == 1 ? "flex" : "none" }}
                        value={endDate}
                        label="Fim da permissão:"
                        variant="outlined" />
                    <TextField
                        id="durationdatetime"
                        type={'number'}
                        onChange={e => setDurationDate(e.target.value)}
                        autoComplete="off"
                        style={{ maxWidth: 600, display: typeEndPermission == 2 ? "flex" : "none" }}
                        value={durationDate}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="Duração: (min)"
                        variant="outlined" />

                </div>
                <div className="selectTypeArea">
                    <RadioListItem
                        handleChangeRadio={handleChangeTypeUserPermission}
                        title="Tipo de Licença"
                        itens={[
                            {
                                value: "1",
                                label: "Usuario"
                            },
                            {
                                value: "2",
                                label: "Acesso Unico"
                            }
                        ]}
                    />
                    <Autocomplete
                        {...defaultProps}
                        id="userIdPermission"
                        disableCloseOnSelect
                        style={{ maxWidth: 600, display: typeUserPermission == 1 ? "flex" : "none" }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(e, value) => handleChangeAutoCompleteUser(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Usuario" variant="standard" />
                        )}
                    />
                    <div className="linkAreaText" style={{ maxWidth: 600, display: typeUserPermission == 2 ? "flex" : "none" }}>
                        <TextField id="onlyLink" autoComplete="off" style={{ maxWidth: 600 }} value={onlyLink} label="Link de Liberação:" variant="outlined" />
                        <div className="linkAreaTextBtnArea">
                            <button
                                onClick={handleCopyOnlyLink}
                            >
                                Copiar!
                            </button>
                            <button
                                onClick={handleOpenModal}
                            >
                                Gerar QrCode
                            </button>
                        </div>
                    </div>
                </div>
                <div className="selectCamsArea">
                    <CheckBoxCustom
                        cheboxArrayValue={handleChangeListCamPermission}
                        mainTitle="Todas as câmeras"
                        itens={cams}
                    />
                </div>

            </div >
            <div>
                <button
                    className='btnSave'
                    onClick={handleSaveAccess}
                >Salvar</button>
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
        </div>
    )
}