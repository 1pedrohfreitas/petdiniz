import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import React, { useEffect, useRef, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../services/Api';
import './style.css'
import { TableListItem } from '../../components/TableListItem';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import CamViewCard from '../../components/CamViewCard';
import RadioListItem from '../../components/RadioListItem';
import ModalCam from '../../components/ModalCam';
import jwt from 'jwt-decode'

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
export function CreateCams(props) {

    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [alias, setAlias] = useState('');
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (props.id != null) {
            setId(props.id)
        }
    }, []);

    const handleChangeName = (event) => {
        setFullname(event.target.value);
    };

    const handleChangeAlias = (event) => {
        setAlias(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeUserName = (event) => {
        setUsername(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleSaveinstaller = () => {
        if (id == '') {
            postRequest(subUrl, {
                fullname,
                alias,
                status,
                username,
                password
            }).then((response) => {
                setId(response.data.id)
            })
        } else {
            putRequest(subUrl, {
                id,
                fullname,
                alias,
                status,
                username,
                password
            }).then((response) => {
                setId(response.data.id)
            })
        }

    }
    return (
        <div style={{
            width: '100%'
        }} className='formCreate'>
            <div className="form-rows form-row-1">
                <TextField id="installerid" value={id} style={{ width: '100px' }} label="ID:" disabled variant="outlined" />
            </div>
            <div className="form-rows form-row-2">
                <TextField id="installerfullname" style={{ maxWidth: 600 }} value={fullname} onChange={handleChangeName} label="Nome:" variant="outlined" />
                <TextField id="installeralias" style={{ maxWidth: 400 }} value={alias} onChange={handleChangeAlias} label="Nome Amigavel:" variant="outlined" />
                <Box sx={{ width: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="installerstatuslabel">Status:</InputLabel>
                        <Select
                            labelId="installerstatuslabel"
                            id="installerstatus"
                            value={status}
                            label="Age"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value={0}>Inativo</MenuItem>
                            <MenuItem value={1}>Ativo</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className=" form-rows form-row-2">
                <TextField id="installerusername" style={{ maxWidth: 600 }} value={username} onChange={handleChangeUserName} label="Usuario:" variant="outlined" />
                <TextField id="installerpassword" type={"password"} style={{ maxWidth: 400 }} value={password} onChange={handleChangePassword} label="Senha:" variant="outlined" />
            </div>
            <div className=" form-rows form-row-4">
                <button
                    className='btnSave'
                    onClick={handleSaveinstaller}
                >Salvar</button>
            </div>
        </div>
    );
}

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
    const [durationDate, setDurationDate] = useState(20);
    const [onlyLink, setOnlyLink] = useState('12354');
    const [typeEndPermission, setTypeEndPermission] = useState(1);

    const [typeUserPermission, setTypeUserPermission] = useState(1);
    const [userIdPermission, setUserIdPermission] = useState('');

    const [users, setUsers] = useState([]);
    const [cams, setCams] = useState([]);

    const getAllDates = () => {
        getRequest(`users/`).then((response) => {
            if (response.data.data != null) {
                console.log(response.data.data)
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

    const handleCopyOnlyLink = (e) => {
        navigator.clipboard.writeText(onlyLink).then(() => {
            console.log("Copiei")
        })
    }
    const handleChangeTypeEndPermission = (e) => {
        setTypeEndPermission(e.target.value)
    }
    const handleChangeTypeUserPermission = (e) => {
        setTypeUserPermission(e.target.value)
    }
    const defaultProps = {
        options: users,
        getOptionLabel: (option) => option.name,
    };
    return (
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
                    onChange={(e, value) => setUserIdPermission(value.id)}
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
                        <button>Gerar QrCode</button>
                    </div>
                </div>
            </div>
            <div className="selectCamsArea">
                <CheckBoxCustom
                    mainTitle="Todas as câmeras"
                    itens={cams}
                />
            </div>

        </div >)
}