import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import ModalQrCode from '../../components/ModalQrCode';
import RadioListItem from '../../components/RadioListItem';
import { SnackBarCustom } from '../../components/SnackBarCustom';
import './style.css';


export default function AddAccessCams(props) {
    const reduxData = useSelector(state => state.user)
    const navigate = useNavigate()
    const userData = reduxData.user
    const now = new Date();
    const [startDate, setStartDate] = useState(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
    const [endDate, setEndDate] = useState(new Date(now.getTime() + 24 * 3600000 - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
    const [listCamPermission, setListCamPermission] = useState([]);
    const [durationDate, setDurationDate] = useState(20);
    const [onlyLink, setOnlyLink] = useState('');
    const [alias, setAlias] = useState('');
    const [typeEndPermission, setTypeEndPermission] = useState(1);
    const [disableButtonSave, setDisableButtonSave] = useState(false);

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

    const [typeUserPermission, setTypeUserPermission] = useState(1);
    const [userIdPermission, setUserIdPermission] = useState('');

    const [users, setUsers] = useState([]);
    const [cams, setCams] = useState([]);
    const [openModal, setOpenModal] = useState(false);


    const getAllDates = () => {

        import('../../services/Api').then(api => {
            api.getRequest(`users/`, localStorage.getItem('petdiniz-token')).then((response) => {
                if (response.data.data != null) {
                    setUsers(response.data.data.map(user => ({
                        name: user.fullname,
                        id: user.id,

                    })))
                }
            })
            api.getRequest(`cams/`, localStorage.getItem('petdiniz-token')).then((response) => {
                if (response.data.data != null) {
                    setCams(response.data.data.map(cam => ({
                        id: cam.id,
                        label: cam.alias
                    })))
                }
            })
        })
    }
    useEffect(() => {
        getAllDates()
    }, []);

    const handleSaveAccess = () => {
        let listErro = []
        let data = {
            alias: alias,
            createbyuserid: userData.id,
            startpermissiondate: `${startDate}.000000-03:00`,
            camid: listCamPermission
        }
        if (listCamPermission.length == 0) {
            listErro.push(`Voc?? prescisa selecionar pelo menos uma c??mera para liberar o acesso`)
        }
        if (typeEndPermission == 1) {
            data.stoppermissiondate = `${endDate}.000000-03:00`
        }
        if (typeEndPermission == 2) {
            data.durationpermitions = parseInt(durationDate)
            if (data.durationpermitions == 0) {
                listErro.push(`Para este tipo de delimita????o de tempo, o valor deve ser diferente de 0`)
            }
        }
        if (typeUserPermission == 1) {
            if (userIdPermission != null && userIdPermission != '') {
                data.userid = userIdPermission
            } else {
                listErro.push(`Para este tipo de licen??a, selecione um usuario`)
            }
        } else {
            data.userid = 0
        }
        if (listErro.length == 0) {
            if (alias == '') {
                const now = new Date(Date.now()).toISOString().replace('T', ' ').split('.')[0]
                const nowDateSplit = now.split(' ')[0].split('-')
                const nowDate = `${nowDateSplit[2]}-${nowDateSplit[1]}-${nowDateSplit[0]}`
                const nowHour = now.split(' ')[1]
                if (userIdPermission == null || userIdPermission == '') {
                    setAlias(`${nowDate} ${nowHour} - Acesso ??nico`)
                    data.alias = `${nowDate} ${nowHour} - Acesso ??nico`
                } else {
                    setAlias(`${nowDate} ${nowHour} - ${users.filter(user => user.id == userIdPermission)[0].name}`)
                    data.alias = `${nowDate} ${nowHour} - ${users.filter(user => user.id == userIdPermission)[0].name}`
                }

            }
            setDisableButtonSave(true)
            import('../../services/Api').then(api => {
                api.postRequest('cams/camaccesspermission', data, localStorage.getItem('petdiniz-token')).then((response) => {
                    const token = response.data
                    navigate(`/home/${localStorage.getItem('petdiniz-token')}/detailsaccesscams/${token}`)
                    // setOnlyLink(`${window.location.origin}/onlyviewcams/${token}`)
                    openSnackBar("success", "Link gerado com sucesso!").then(() => {
                    }).finally(() => {
                        setDisableButtonSave(false)
                        setTimeout(() => {
                            setSnackBarOpen(false)
                        }, 3000);
                    })

                }).catch(err => { })
            })

        } else {
            listErro.forEach(erro => {
                openSnackBar("erro", erro).then(() => {
                }).finally(() => {
                    setTimeout(() => {
                        setSnackBarOpen(false)
                    }, 3000);
                })
            })
        }

    }

    const handleCopyOnlyLink = (e) => {
        navigator.clipboard.writeText(onlyLink).then(() => {
            openSnackBar("success", "Link copiado com sucesso!").then(() => {
            }).finally(() => {
                setTimeout(() => {
                    setSnackBarOpen(false)
                }, 3000);
            })
        })
    }
    const handleChangeTypeEndPermission = (e) => {
        setTypeEndPermission(e.target.value)
    }
    const handleChangeTypeUserPermission = (e) => {
        setTypeUserPermission(e.target.value)
    }
    const handleChangeListCamPermission = (cheboxValue) => {
        setListCamPermission(cheboxValue)
    }
    const handleChangeAutoCompleteUser = (value) => {
        if (value != null) {
            setUserIdPermission(value.id)
        } else {
            setUserIdPermission(null)
        }
    }

    const defaultProps = {
        options: users,
        getOptionLabel: (option) => option.name,
    };

    const handleOpenModal = (id, urlVideo) => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    return (
        <div className="addAccessCams">
            <div className="addAccessCamsArea">

                <div className="dateTimeArea">
                    <TextField
                        id="startdatetime"
                        type={'datetime-local'}
                        onChange={e => setStartDate(e.target.value)}
                        autoComplete="off"
                        style={{ maxWidth: 600 }}
                        value={startDate}
                        label="Inicio da permiss??o:"
                        variant="outlined" />
                    <RadioListItem
                        handleChangeRadio={handleChangeTypeEndPermission}
                        title="Delimita????o de tempo"
                        itens={[
                            {
                                value: 1,
                                label: "Data"
                            },
                            {
                                value: 2,
                                label: "Dura????o"
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
                        label="Fim da permiss??o:"
                        variant="outlined" />
                    <TextField
                        id="durationdatetime"
                        type={'number'}
                        onChange={e => setDurationDate(e.target.value)}
                        autoComplete="off"
                        style={{ maxWidth: 600, display: typeEndPermission == 2 ? "flex" : "none" }}
                        value={durationDate}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="Dura????o: (min)"
                        variant="outlined" />

                </div>
                <div className="selectTypeArea">
                    <TextField id="alias" autoComplete="off" style={{ maxWidth: 600 }} value={alias} onChange={e => setAlias(e.target.value)} label="Nome Refer??ncia:" variant="outlined" />
                    <RadioListItem
                        handleChangeRadio={handleChangeTypeUserPermission}
                        title="Tipo de Licen??a"
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
                        onChange={(e, value) => handleChangeAutoCompleteUser(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Usuario" variant="standard" />
                        )}
                    />
                    <div className="linkAreaText" style={{ maxWidth: 600, display: typeUserPermission == 2 ? "flex" : "none" }}>
                        <TextField id="onlyLink" autoComplete="off" style={{ maxWidth: 600 }} value={onlyLink} label="Link de Libera????o:" variant="outlined" />
                        <div className="linkAreaTextBtnArea">
                            <button
                                onClick={handleCopyOnlyLink}
                            >
                                Copiar!
                            </button>
                            <button
                                onClick={handleOpenModal}
                            >
                                Gerar QrCode
                            </button>
                        </div>
                    </div>
                </div>
                <div className="selectCamsArea">
                    <CheckBoxCustom
                        cheboxArrayValue={handleChangeListCamPermission}
                        mainTitle="Todas as c??meras"
                        itens={cams}
                    />
                </div>

            </div >
            <div>
                <button
                    className='btnSave'
                    onClick={handleSaveAccess}
                    disabled={disableButtonSave}
                >Salvar</button>
            </div>
            <SnackBarCustom
                open={snackBarOpen}
                typeMessage={snackBarType}
                mensage={snackBarMessage}
            />
            <ModalQrCode
                openModalQrCode={openModal}
                qrCodeText={onlyLink}
                handleCloseModal={handleCloseModal}
            />
        </div>
    )
}

