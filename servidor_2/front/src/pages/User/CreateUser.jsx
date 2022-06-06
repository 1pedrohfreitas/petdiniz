import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SnackBarCustom } from '../../components/SnackBarCustom';
import { TableListUser } from '../../components/TableListUser';
import { getRequest, postRequest, putRequest } from '../../services/Api';
import './style.css';


const subUrl = `users/`
export default function CreateUser(props) {
    let params = useParams()
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

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
            setPassword('')
            setUsername('')
            setIsChangeUserType(false)
            setIsChangeStatus(false)
            setIsChangeUsername(false)
        }
    }, [params.userid]);

    const getUserData = () => {
        getRequest(`${subUrl}${params.userid}`, localStorage.getItem('petdiniz-token')).then(response => {
            setId(params.userid)
            setFullname(response.data.fullname)
            setAlias(response.data.alias)
            setUserType(response.data.usertype)
            setUsername(response.data.username)
            setStatus(response.data.status)
            setIsChangeUserType(userData.usertype > response.data.usertype)
            setIsChangeStatus(userData.usertype > response.data.usertype)
            setIsChangeUsername(true)
        }).catch(err => {
            navigate(`/home/${localStorage.getItem('petdiniz-token')}`)
        })
    }
    const handleSelectByLevel = () => {
        switch (userData.usertype) {
            case 0:
                return [
                    <MenuItem key={0} value={0}>Administrador de Sistema</MenuItem>,
                    <MenuItem key={1} value={1}>Administrador</MenuItem>,
                    <MenuItem key={2} value={2}>Operador</MenuItem>,
                    <MenuItem key={3} value={3}>Cliente</MenuItem>
                ]

            case 1:
                return [
                    <MenuItem key={1} value={1}>Administrador</MenuItem>,
                    <MenuItem key={2} value={2}>Operador</MenuItem>,
                    <MenuItem key={3} value={3}>Cliente</MenuItem>
                ]
            case 2:
                return [
                    <MenuItem key={3} value={3}>Cliente</MenuItem>
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
        setUsername(event.target.value.toLowerCase());
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeUserType = (event) => {
        setUserType(event.target.value);
    };

    function validFields() {
        return new Promise((resolve, reject) => {
            if (fullname === '' ||
                alias === '' ||
                status === '' ||
                userType === '' ||
                username === '' ||
                password === '') {
                openSnackBar("error", "Favor preencher todos os campos").finally(() => {
                    setTimeout(() => {
                        setSnackBarOpen(false)
                    }, 3000);
                })
                reject("Erro")
            }
            resolve("Tudo ok")
        })
    }
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
            validFields().then(() => {
                getRequest(`users/validuser/${data.username}`, localStorage.getItem('petdiniz-token')).then(response => {
                    if (response.data) {
                        openSnackBar("error", "Nome de usuario já existe").finally(() => {
                            setTimeout(() => {
                                setSnackBarOpen(false)
                            }, 3000);
                        })
                    } else {
                        postRequest(subUrl, data, localStorage.getItem('petdiniz-token')).then((response) => {
                            setId(response.data.id)
                            openSnackBar("success", "Usuario adicionado com sucesso").finally(() => {
                                setTimeout(() => {
                                    setSnackBarOpen(false)
                                }, 3000);
                            })
                        })
                    }
                })
            })

        } else {
            data.id = parseInt(id)
            if (password === '') {
                delete data.password
            }
            putRequest(subUrl, data, localStorage.getItem('petdiniz-token')).then((response) => {

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
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

    const [filterUserId, setFilterUserId] = useState(null);
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterUserType, setFilterUserType] = useState(null);
    const [usersList, setUsersList] = useState([]);

    const handleUserList = (rows) => {
        const newArray = rows.map(row =>{
            return {
                id : row.id,
                label: row.fullname
            }
        })
        setUsersList(newArray)
    }
    const columns = [
        { id: 'id', label: 'ID:', width: 50 },
        { id: 'fullname', label: 'Nome:', minWidth: 200 },
        { id: 'alias', label: 'Nome Amigavel:', width: 150 },
        { id: 'username', label: 'Nome de Usuario:', width: 250 },
        { id: 'statusDescription', label: 'Status:', width: 200 },
        { id: 'usertypeLabel', label: 'Tipo de Usuario:', minWidth: 200 },
    ];

    const filterOptionsStatus = [
        {
            id :0,
            label: 'Inativo'
        },
        {
            id :1,
            label: 'Ativo'
        }
    ]

    const filterOptionsUserTipe = [
        {
            id :0,
            label: 'Super Administrador'
        },
        {
            id :1,
            label: 'Administrador'
        },
        {
            id :2,
            label: 'Operador'
        },
        {
            id :3,
            label: 'Cliente'
        }
    ]

    return (
        <div className="tableListItemArea">
            <div className="filter">
                <Autocomplete
                    disablePortal
                    id="filterUser"
                    options={usersList}
                    onChange={(event, value) => {
                        if(value != null){
                            setFilterUserId(value.id)
                        } else {
                            setFilterUserId(null)
                        }
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Buscar por nome" />}
                />
                <Autocomplete
                    disablePortal
                    id="filterUser"
                    options={filterOptionsStatus}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, value) => {
                        if(value != null){
                            setFilterStatus(value.id)
                        } else {
                            setFilterStatus(null)
                        }
                    }}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                />
                <Autocomplete
                    disablePortal
                    id="filterUser"
                    options={filterOptionsUserTipe}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, value) => {
                        if(value != null){
                            setFilterUserType(value.id)
                        } else {
                            setFilterUserType(null)
                        }
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Tipo de usuario" />}
                />
            </div>
            <TableListUser
                userData={userData}
                idFilter={filterUserId}
                statusFilter={filterStatus}
                userTypeFilter={filterUserType}
                columns={columns}
                handleUserList={handleUserList}
            />
        </div>)
}