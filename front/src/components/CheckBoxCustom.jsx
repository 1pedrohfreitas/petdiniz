import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxCustom(props) {
    const itens = props.itens

    const [itensChecked, setItensChecked] = useState([]);

    const handleChangeCheboxLix = (id) => {
        const exist = itensChecked.indexOf(id)
        if(exist === -1){
            setItensChecked([...itensChecked,id])
        } else {
            setItensChecked(itensChecked.filter((item) => item !== id))
        }
    }

    useEffect(() => {
        props.cheboxArrayValue(itensChecked)
    }, [itensChecked]);
    
    const handleSelectAll = () => {
        if(itensChecked.length != itens.length){
            setItensChecked(itens.map((item)=> item.id))
        } else {
            setItensChecked([])
        }
    }

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {itens.map((item) => (
                <FormControlLabel
                    key={item.id}
                    label={item.label}
                    control={
                        <Checkbox
                            checked={itensChecked.includes(item.id)}
                            onClick={() => handleChangeCheboxLix(item.id)}
                        />
                    }
                />
            ))}

        </Box>
    );

    return (
        <div>
            <FormControlLabel
                label={props.mainTitle}
                control={
                    <Checkbox
                        checked={itensChecked.length == itens.length}
                        indeterminate={itensChecked.length != 0 && itensChecked.length != itens.length}
                        onClick={handleSelectAll}
                    />
                }
            />
            {children}
        </div>
    );
}
