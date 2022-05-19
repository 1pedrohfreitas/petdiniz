import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioListItem(props) {
    const radioGroupTitle = 'Cameras'
    const itens = props.itens

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{radioGroupTitle}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {itens.map((item) => {
                    return (
                        <FormControlLabel value={item.id} control={<Radio />} label={item.label} />
                    );
                })}
            </RadioGroup>
        </FormControl>
    );
}
