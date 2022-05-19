import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../services/Api';
import './style.css'
import { TableListItem } from '../../components/TableListItem';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import CamViewCard from '../../components/CamViewCard';
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
        getIdUser().then((userId)=>{
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const checkBoxItens = [
        { id: 'id', label: 'Cam'},
    ];

    return (
        <div className="addAccessCamsArea">
            <div>
            <CheckBoxCustom
            itens={checkBoxItens}
             />
            </div>
            
        </div>)
}