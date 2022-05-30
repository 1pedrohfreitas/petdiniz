import { Autocomplete, TextField } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import './style.css'
import { TableListItem } from '../../components/TableListItem';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import CamViewCard from '../../components/CamViewCard';
import RadioListItem from '../../components/RadioListItem';
import ModalCam from '../../components/ModalCam';
import { SnackBarCustom } from '../../components/SnackBarCustom';
import ModalQrCode from '../../components/ModalQrCode';
import { useSelector } from 'react-redux';
import { TableListCamAccessPermission } from '../../components/TableListCamAccessPermission';
import { useParams } from 'react-router-dom';
import { TableListItemSimple } from '../../components/TableListItemSimple';
import { formataDurationMin, formatDateDDMMYYYYHHMMss } from '../../services/DateUtil';
import { TableListItemCams } from '../../components/TableListItemCams';

export function MyCams(props) {
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

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
        getRequest(`cams/mycams/${userData.id}`, localStorage.getItem('petdiniz-token')).then(
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
        { id: 'status', label: 'Status:', minWidth: 200 },
    ];

    return (
        <div className="tableListItemArea">
            <TableListItemCams
                columns={columns}
            />
        </div>)
}

export function AddAccessCams(props) {
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user
    const now = new Date();
    const [startDate, setStartDate] = useState(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
    const [endDate, setEndDate] = useState(new Date(now.getTime() + 24 * 3600000 - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
    const [listCamPermission, setListCamPermission] = useState([]);
    const [durationDate, setDurationDate] = useState(20);
    const [onlyLink, setOnlyLink] = useState('');
    const [alias, setAlias] = useState('');
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
        getRequest(`users/`, localStorage.getItem('petdiniz-token')).then((response) => {
            if (response.data.data != null) {
                setUsers(response.data.data.map(user => ({
                    name: user.fullname,
                    id: user.id,

                })))
            }
        })
        getRequest(`cams/`, localStorage.getItem('petdiniz-token')).then((response) => {
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
            alias: alias,
            createbyuserid: userData.id,
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
        postRequest('cams/camaccesspermission', data, localStorage.getItem('petdiniz-token')).then((response) => {
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
                    <TextField id="alias" autoComplete="off" style={{ maxWidth: 600 }} value={alias} onChange={e => setAlias(e.target.value)} label="Nome Referência:" variant="outlined" />
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

export function ListAccessCams(props) {
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

    const [filterUserId, setFilterUserId] = useState(null);
    const [filterRef, setFilterRef] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [refList, setRefList] = useState([]);

    const handleRefList = (rows) => {
        const newArray = rows.map(row => {
            return {
                id: row.alias,
                label: row.alias
            }
        })
        setRefList(newArray)
    }

    useEffect(() => {
        getRequest('users/', localStorage.getItem('petdiniz-token')).then((response) => {
            const users = response.data.data.map(row => {
                return {
                    id: row.id,
                    label: row.fullname
                }
            })
            users.unshift({
                id: 0,
                label: "Token Unico"
            })
            setUsersList(users)
        })
    }, []);

    const columns = [
        { id: 'alias', label: 'Referência:', minWidth: 50 },
        { id: 'username', label: 'Usuario:', width: 150 },
        { id: 'startpermissiondate', label: 'Inicio da permissão:', minWidth: 200 },
        { id: 'stoppermissiondate', label: 'Fim da permissão:', minWidth: 200 },
        { id: 'durationpermitions', label: 'Duração da permissão:', minWidth: 200 },

    ];

    return (
        <div className="tableListItemArea">
            <div className="filter">
                <Autocomplete
                    disablePortal
                    id="filterReferencia"
                    options={refList}
                    onChange={(event, value) => {
                        if (value != null) {
                            setFilterRef(value.id)
                        } else {
                            setFilterRef(null)
                        }
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Buscar por referência" />}
                />
                <Autocomplete
                    disablePortal
                    id="filterUser"
                    options={usersList}
                    onChange={(event, value) => {
                        if (value != null) {
                            setFilterUserId(value.id)
                        } else {
                            setFilterUserId(null)
                        }
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Buscar usuario" />}
                />
            </div>
            <TableListCamAccessPermission
                userData={userData}
                idFilter={filterUserId}
                refFilter={filterRef}
                columns={columns}
                handleRefList={handleRefList}
            />
        </div>)
}

export function DetailsAccessCams(props) {
    let { token } = useParams()

    const [camsList, setCamsList] = useState([]);
    const [alias, setAlias] = useState('');
    const [durationPermitions, setDurationPermitions] = useState('');
    const [startPermissionDate, setStartPermissionDate] = useState('');
    const [stopPermissionDate, setStopPermissionDate] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [operator, setOperator] = useState('');

    useEffect(() => {
        getRequest(`cams/camaccesspermission/${token}`, localStorage.getItem('petdiniz-token')).then(response => {
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
        })

        getRequest(`onlyaccesscam/${token}`, localStorage.getItem('petdiniz-token')).then(response => {
            console.log(response)
            if (response.data.data != null) {
                setCamsList(response.data.data)
            }
        })
    }, []);



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

            <div className="tableListCams">
                <TableListItemSimple
                    columns={columns}
                    data={camsList}
                />
            </div>

        </div>)
}