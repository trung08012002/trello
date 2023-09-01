import { TextField, TextFieldProps } from "@mui/material";
import { error } from "console";
import React from "react"
import { Control, useController } from "react-hook-form";
export type InputFieldProps = TextFieldProps & {
    name: string,

    control: Control<any>
}

const InputField = ({ name, control, label, type,
    onChange: externalOnChange,
    onBlur: externalOnBlur,
    ref: externalRef,
    value: externalValue,
    ...rest }: InputFieldProps) => {
    const { field: { onChange, onBlur, value, ref
    }, fieldState: { error } } = useController({ name, control })
    return (
        <TextField
            fullWidth
            type={type}
 
           
            margin="dense"
            sx={{
                '& label.Mui-focused': {
                    color: 'white',
                },
                '& .mui-1x51dt5-MuiInputBase-input-MuiInput-input': {
                    margin: "6px 0px 6px 20px"
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'rgba(227, 227, 227, 1)',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(227, 227, 227, 1)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(227, 227, 227, 1)',
                    },
                    '&.Mui-focused fieldset': {

                        borderColor: 'rgba(227, 227, 227, 1)',
                    },
                },
            }}

            error={!!error}
            helperText={error?.message}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            value={value}
            {...rest}
        />
    )
};

export default InputField;