import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioListItem(props) {
    const radioGroupTitle = props.title
    const itens = props.itens

    const handleChange = (e) =>{
        props.handleChangeRadio(e)
    }
    
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{radioGroupTitle}</FormLabel>
            <RadioGroup
                defaultValue={itens[0].value}
                name="radio-buttons-group"
                onChange={handleChange}
                style={{
                    display : "flex",
                    flexDirection : "row"

                }}
            >
                {itens.map((item) => {
                    return (
                        <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
}
