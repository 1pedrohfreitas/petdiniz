import React from 'react';
import { TableListItemCams } from '../../components/TableListItemCams';
import './style.css';

export default function ShowCams(props) {

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