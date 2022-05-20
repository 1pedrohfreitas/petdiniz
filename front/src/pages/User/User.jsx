import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../services/Api';
import './style.css'
import { TableListItem } from '../../components/TableListItem';
import { useOutletContext, useParams } from 'react-router-dom';
import { SnackBarCustom } from '../../components/SnackBarCustom';

const subUrl = `users/`
export function CreateUser(props) {
    let params = useParams()
    const [userData, setUserData] = useOutletContext();

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

    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [alias, setAlias] = useState('');
    const [status, setStatus] = useState('');
    const [isChangeStatus, setIsChangeStatus] = useState(true);
    const [userType, setUserType] = useState('');
    const [isChangeUserType, setIsChangeUserType] = useState(true);
    const [username, setUsername] = useState('');
    const [isChangeUsername, setIsChangeUsername] = useState(true);
    const [password, setPassword] = useState('');



    useEffect(() => {
        if (params.userid != null) {
            getUserData()
        } else {
            setId('')
            setFullname('')
            setAlias('')
            setStatus('')
            setUserType('')
            setUsername('')
            setIsChangeUserType(false)
            setIsChangeStatus(false)
            setIsChangeUsername(false)
        }
    }, [params.userid]);

    const getUserData = () => {
        getRequest(`${subUrl}${params.userid}`).then(response => {
            setId(params.userid)
            setFullname(response.data.fullname)
            setAlias(response.data.alias)
            setUserType(response.data.usertype)
            setUsername(response.data.username)
            setStatus(response.data.status)
            setIsChangeUserType(true)
            setIsChangeStatus(true)
            setIsChangeUsername(true)
        }).catch(err => {
            navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}`)
        })
    }
    const handleSelectByLevel = () => {
        switch (userData.usertype) {
            case 0:
                return [
                    <MenuItem key={0} value={0}>Administrador de Sistema</MenuItem>,
                    <MenuItem key={1} value={1}>Administrador</MenuItem>,
                    <MenuItem key={2} value={2}>Operador</MenuItem>,
                    <MenuItem key={3} value={3}>Usuario</MenuItem>
                ]

            case 1:
                return [
                    <MenuItem key={1} value={1}>Administrador</MenuItem>,
                    <MenuItem key={2} value={2}>Operador</MenuItem>,
                    <MenuItem key={3} value={3}>Usuario</MenuItem>
                ]
            case 2:
                return [
                    <MenuItem key={3} value={3}>Usuario</MenuItem>
                ]
            default:
                break
        }
    }

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

    const handleChangeUserType = (event) => {
        setUserType(event.target.value);
    };

    const handleSaveuser = () => {

        var data = {
            fullname,
            alias,
            status,
            username,
            password,
            userType
        }
        if (id == '') {
            postRequest(subUrl, data).then((response) => {
                setId(response.data.id)
                openSnackBar("success", "Usuario adicionado com sucesso").finally(() => {
                    setTimeout(() => {
                        setSnackBarOpen(false)
                    }, 3000);
                })
            })
        } else {
            data.id = parseInt(id)
            if (password == '') {
                delete data.password
            }
            putRequest(subUrl, data).then((response) => {

                setId(response.data.id)
            }).then(() => {
                openSnackBar("success", "Usuario editado com sucesso").finally(() => {
                    setTimeout(() => {
                        setSnackBarOpen(false)
                    }, 3000);
                })
            })
        }

    }
    return (
        <div style={{
            width: '100%'
        }} className='formCreate'>
            <div className="form-rows form-row-1">
                <TextField id="userid" value={id} style={{ width: '100px' }} label="ID:" disabled variant="outlined" />
            </div>
            <div className="form-rows form-row-2">
                <TextField id="userfullname" autoComplete="off" style={{ maxWidth: 600 }} value={fullname} onChange={handleChangeName} label="Nome:" variant="outlined" />
                <TextField id="useralias" autoComplete="off" style={{ maxWidth: 400 }} value={alias} onChange={handleChangeAlias} label="Nome Amigavel:" variant="outlined" />
                <Box sx={{ width: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="userstatuslabel">Status:</InputLabel>
                        <Select
                            labelId="userstatuslabel"
                            id="userstatus"
                            value={status}
                            label="Age"
                            onChange={handleChangeStatus}
                            disabled={isChangeStatus}
                            defaultValue={3}
                        >
                            <MenuItem value={0}>Inativo</MenuItem>
                            <MenuItem value={1}>Ativo</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel id="usertypelabel">Tipo de Usuario:</InputLabel>
                        <Select
                            labelId="usertypelabel"
                            id="usertype"
                            value={userType}
                            label="Age"
                            onChange={handleChangeUserType}
                            disabled={isChangeUserType}
                        >{handleSelectByLevel()}
                        </Select>

                    </FormControl>
                </Box>
            </div>
            <div className=" form-rows form-row-2">
                <TextField id="userusername" disabled={isChangeUsername} autoComplete='off' style={{ maxWidth: 600 }} value={username} onChange={handleChangeUserName} label="Usuario:" variant="outlined" />
                <TextField id="userpassword" inputProps={{
                    autoComplete: 'new-password',
                    form: {
                        autoComplete: 'off',
                    },
                }} type={"password"} style={{ maxWidth: 400 }} value={password} onChange={handleChangePassword} label="Senha:" variant="outlined" />
            </div>
            <div className=" form-rows form-row-4">
                <button
                    className='btnSave'
                    onClick={handleSaveuser}
                >Salvar</button>
            </div>
            <SnackBarCustom
                open={snackBarOpen}
                typeMessage={snackBarType}
                mensage={snackBarMessage}
            />
        </div>
    );
}

export function ShowUsers(props) {
    const [userData, setUserData] = useOutletContext();

    const columns = [
        { id: 'id', label: 'ID:', minWidth: 50 },
        { id: 'alias', label: 'Nome Amigavel:', width: 150 },
        { id: 'fullname', label: 'Nome:', minWidth: 200 },
        { id: 'status', label: 'Status:', minWidth: 200 },
        { id: 'usertype', label: 'Tipo de Usuario:', minWidth: 200 },
    ];

    return (
        <div className="tableListItemArea">
            <TableListItem
                userData={userData}
                subUrl={subUrl}
                columns={columns}
            />
        </div>)
}