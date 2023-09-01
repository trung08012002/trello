"use client"
import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react"
type AutoSizeTextFieldProps = { textDefault: string, onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> } & TextFieldProps
const AutoSizeTextField = ({ textDefault, onBlur, ...rest }: AutoSizeTextFieldProps) => {

    const [inputWidth, setInputWidth] = useState(`${textDefault.length * 8 + 30}px`);
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const newWidth = `${event.target.value.length * 8 + 30}px`;
        setInputWidth(newWidth);
    };
    return (
        <TextField
            {...rest}
            defaultValue={textDefault}
            InputProps={{
                style: {
                    width: inputWidth,
                },
            }}
            onBlur={onBlur}
            onChange={handleInputChange}
        />
    );
};

export default AutoSizeTextField;
