import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import languagesApi from '../../../apis/languagesApi';
SelectField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};
SelectField.defaultProps = {
    form: {},
    name: '',

    label: '',
    disabled: false,
}
function SelectField(props) {

    const [lang, setLang] = React.useState('');
    const [languages, setLanguages] = React.useState([])
    const handleChange = (event) => {
        setLang(event.target.value);
    };
    React.useEffect(() => {
        const fetchDataLangs = async () => {
            const langsList = await languagesApi.getAll();
            setLanguages(langsList)
        }
        fetchDataLangs()
    }, [])
    const {form, name, label, disabled} = props;
    const {errors} = form;
    const hasErrors = errors[name];
    return (

        <FormControl fullWidth error={!!hasErrors} margin='normal' size="small">
            <InputLabel id={name}>Country</InputLabel>
            <Controller
                name={name}
                control={form.control}
                labelId={name}
                id={name}
                as={
                    <Select
                        value={lang}
                        label="Age"
                        onChange={handleChange}
                    >
                        {
                            languages.map(lang => {
                                return (
                                    <MenuItem value={lang.code} key={lang.code}>
                                        {lang.code === 'vn' ? 'Việt Nam' : 'Anh Quốc'}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                }

                label={label}
                disabled={disabled}
            />

        </FormControl>
    );
}

export default SelectField;