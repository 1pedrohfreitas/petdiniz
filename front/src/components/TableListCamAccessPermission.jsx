import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone';
import TableRow from '@mui/material/TableRow';
import { deleteRequest, getRequest } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { formataDurationMin, formatDateDDMMYYYYHHMMss } from "../services/DateUtil";


export function TableListCamAccessPermission(props) {
    const navigate = useNavigate()

    const columns = props.columns

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        getRequest('cams/camaccesspermission', localStorage.getItem('petdiniz-token')).then((response) => {
            if (response.data.data != null) {
                const dadosFormatados = response.data.data.map(row => {
                    row.startpermissiondate = formatDateDDMMYYYYHHMMss(row.startpermissiondate)
                    row.stoppermissiondate = formatDateDDMMYYYYHHMMss(row.stoppermissiondate)
                    row.durationpermitions = formataDurationMin(row.durationpermitions)

                    return row

                })
                setRows(dadosFormatados)
                setDados(dadosFormatados)

                props.handleRefList(dadosFormatados)
            }
        })
    }, []);
    useEffect(() => {
        let dadosFormatadosFilter = dados
        console.log(dados)
        if (props.idFilter != null) {
            console.log(props.idFilter)
            dadosFormatadosFilter = dadosFormatadosFilter.filter(dado => {
                return dado.userid == props.idFilter
            })
        } else if (props.refFilter != null) {
            console.log(props.refFilter)
            dadosFormatadosFilter = dadosFormatadosFilter.filter(dado => {
                return dado.alias == props.refFilter
            })
        }
        setRows(dadosFormatadosFilter)

    }, [props.idFilter,props.refFilter]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDeleteItem = (itemData) => {
            deleteRequest(`cams/camaccesspermission/`,itemData.token, localStorage.getItem('petdiniz-token')).then(() => {
                const newList = rows.filter(row => {
                    return row.token != itemData.token
                })
                setRows(newList)
            })
    };

    const handleGoToEdit = (itemData) => {
        navigate(`/home/${localStorage.getItem('petdiniz-token')}/detailsaccesscams/${itemData.token}`)
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
                                <React.Fragment key={row.token}>

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