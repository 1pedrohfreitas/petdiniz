import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../services/Api";


export function TableListUser(props) {
    const navigate = useNavigate()

    const columns = props.columns
    const subUrl = 'users/'
    const userData = props.userData

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        getRequest(subUrl,localStorage.getItem('petdiniz-token')).then((response) => {
            if (response.data.data != null) {
                const dadosFormatados = response.data.data.map(row =>{
                    switch(row.status){
                        case 1:
                            row.statusDescription = "Ativo"
                            break
                        case 0:
                            row.statusDescription = "Inativo"
                            break
                        default:
                            row.statusDescription = "I"
                            break
                    }

                    switch(row.usertype){
                        case 3:
                            row.usertypeLabel = "Cliente"
                            break
                        case 2:
                            row.usertypeLabel = "Operador"
                            break
                        case 1:
                            row.usertypeLabel = "Administrador"
                            break
                        case 0:
                            row.usertypeLabel = "Super Administrador"
                            break
                        default:
                            row.usertypeLabel = "I"
                            break
                    }
                    return row
                })
                    setRows(dadosFormatados)
                    setDados(dadosFormatados)
                
                props.handleUserList(dadosFormatados)
            }
        })
    }, []);

    useEffect(() => {
        let dadosFormatadosFilter = dados
        if (props.idFilter != null) {
            dadosFormatadosFilter = dadosFormatadosFilter.filter(dado => {
                return dado.userid == props.idFilter
            })
        } 
        if (props.statusFilter != null) {
            dadosFormatadosFilter = dadosFormatadosFilter.filter(dado => {
                return dado.status == props.statusFilter
            })
        } 
        if (props.userTypeFilter != null) {
            dadosFormatadosFilter = dadosFormatadosFilter.filter(dado => {
                return dado.usertype == props.userTypeFilter
            })
        } 
        setRows(dadosFormatadosFilter)

    }, [props.idFilter,props.userTypeFilter,props.statusFilter]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDeleteItem = (itemData) => {
            if (userData.usertype < itemData.usertype) {
                deleteRequest(subUrl, itemData.id,localStorage.getItem('petdiniz-token')).then(() => {
                    const newList = rows.filter(row => {
                        return row.id != itemData.id
                    })
                    setRows(newList)
                })
            }
    };

    const handleGoToEdit = (itemData) => {
        navigate(`/home/${localStorage.getItem('petdiniz-token')}/${subUrl.substring(0, subUrl.length - 2)}/${itemData.id}`)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>

                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <React.Fragment key={row.id}>

                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <a onClick={() => handleDeleteItem(row)}><DeleteTwoToneIcon /></a>
                                            <a onClick={() => handleGoToEdit(row)}><FileOpenTwoToneIcon /></a>
                                        </TableCell>
                                    </TableRow>

                                </React.Fragment>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>)
}