import './admin.langpicker.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { useState } from 'react';

import {
    IconFlagDE,
    IconFlagES,
    IconFlagUS
} from 'material-ui-flags';

const BootstrapInput = withStyles((theme) => ({
    root: {},
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    display: {
        display: "flex",
        alignItems: "center"
    },
}));

export default function CustomizedSelects() {
    const classes = useStyles();
    const [lang, setLang] = useState('en');
    const handleChange = (event) => {
        setLang(event.target.value);
    };
    return (
        <div className="custom-lang-picker">
            <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label"></InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={lang}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={"en"}> <IconFlagUS /> &nbsp; English</MenuItem>
                    <MenuItem value={"es"}> <IconFlagES /> &nbsp;Spanish</MenuItem>
                    <MenuItem value={"val"}> <IconFlagDE /> &nbsp;Valencian</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
