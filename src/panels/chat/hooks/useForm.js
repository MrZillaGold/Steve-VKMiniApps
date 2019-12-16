import { useState } from 'react';

function useForm(settings, callback) {
    const defaultvalues = {};
    Object.keys(settings).forEach((key) => {
        defaultvalues[key] = settings[key].default;
        if (defaultvalues[key] === undefined || defaultvalues[key] == null) {
            defaultvalues[key] = '';
        }
    });


    if (!callback) {
        callback = () => { /* empty because ... */ };
    }

    const [values, setValues] = useState(defaultvalues);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback(values);
    };

    const handleChange = (event) => {
        if (event.persist) {
            if (typeof event.persist === "function") {
                event.persist();
            }

            const name = event.target.name;
            const value = event.target.value;

            if (settings[name] && typeof settings[name].handleChange === "function") {
                settings[name].handleChange(value);
            }

            if (value !== null) {
                setValues(values => ({...values, [name]: value}));
            }
        } else {
            const name = event.name;
            const value = event.value;
            setValues(values => ({...values, [name]: value}));
        }
    };

    return [
        values,
        handleChange,
        handleSubmit,
    ]
}

export default useForm;
