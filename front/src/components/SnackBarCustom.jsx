// @ts-nocheck
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export function SnackBarCustom(props) {
    
    const [open, setOpen] = useState(false);
    const [msgType, setMsgType] = useState('info');
    const [style, setStyle] = useState({widht : "100%"});
    
    function setOpenSnackBarPropetis(){
        return new Promise((resolve)=>{
                setOpen(true)
                if(props.typeMessage != null){
                    setMsgType(props.typeMessage);
                }
                
                if(props.style != null){
                    setStyle(props.style)
                }
        })
    }

    async function handlerOpenSnackBar(){
        await setOpenSnackBarPropetis();
    }
    

    useEffect(() => {
        if(["error","info","success","warning"].indexOf(props.typeMessage) != -1){
            handlerOpenSnackBar()
            setTimeout(() => setOpen(false), 2000)
        }
       
    }, [props.typeMessage]);

    return (
        <Snackbar open={open}>
            <Alert severity={`${msgType}`} sx={style}>
                {props.mensage}
            </Alert>
        </Snackbar>
    )
}