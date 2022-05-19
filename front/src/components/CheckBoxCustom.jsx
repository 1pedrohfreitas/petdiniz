import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxCustom(props) {
    const [itensChecked, setItensChecked] = useState([]);

    const itens = props.itens

    const handleChange1 = (event) => {
        
    };

    const handleCheckBox = (item) => {
        if (itensChecked.length > 0 && itensChecked.findIndex(i => i.id == item.id) > 0) {
            const newCheckedList = itensChecked.filter(i => {i.id != item.id})
            if(newCheckedList == 1){
            }
            setItensChecked([])
        } else {
            if(Array.isArray(itensChecked)){
                setItensChecked(itensChecked.push(item))
            } else {
                setItensChecked([item])
            }
        }
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {itens.map((item) => (
                <FormControlLabel
                key={item.id}
                    label={item.label}
                    control={
                    <Checkbox onChange={() => handleCheckBox(item)} />}
                />
            ))}

        </Box>
    );

    return (
        <div>
            <FormControlLabel
                label="Cameras"
                control={
                    <Checkbox
                        checked={true}
                        indeterminate={true}
                        onChange={handleChange1}
                    />
                }
            />
            {children}
        </div>
    );
}
