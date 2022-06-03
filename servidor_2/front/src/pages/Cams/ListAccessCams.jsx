import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableListCamAccessPermission } from '../../components/TableListCamAccessPermission';
import './style.css';

export default function ListAccessCams(props) {
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
        import('../../services/Api').then(api =>{
            api.getRequest('users/', localStorage.getItem('petdiniz-token')).then((response) => {
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

