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


export function TableListItem(props) {
    const navigate = useNavigate()

    const columns = props.columns
    const subUrl = props.subUrl
    const userData = props.userData

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getRequest(subUrl,localStorage.getItem('petdiniz-token')).then((response) => {
            if (response.data.data != null) {
                setRows(response.data.data)
            }
        })
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDeleteItem = (itemData) => {
        if (subUrl == 'cams') {
            if (userData.userType == 0) {
                deleteRequest(subUrl, id,localStorage.getItem('petdiniz-token')).then(() => {
                    const newList = rows.filter(id => {
                        return rows.id != id
                    })
                    setRows(newList)
                })
            } else {
                alert('Somente o Super Admin pode excluir cameras')
            }
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