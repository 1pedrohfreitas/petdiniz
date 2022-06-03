// @ts-nocheck
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export function SnackBarCustom(props) {

    const [msgType, setMsgType] = useState('info');
    const [style, setStyle] = useState({ widht: "100%" });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open)
        if (["error", "info", "success", "warning"].indexOf(props.typeMessage) != -1) {
            setMsgType(props.typeMessage)
        } else {
            setMsgType("error")
        }

        if (props.duration != null) {
            setTimeout(() => {
                setOpen(false)
            }, props.duration);
        }
    }, [props.open]);

    return (
        <Snackbar open={open}>
            <Alert severity={`${msgType}`} sx={style}>
                {props.mensage}
            </Alert>
        </Snackbar>
    )
}