import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TableListUser } from '../../components/TableListUser';
import './style.css';


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