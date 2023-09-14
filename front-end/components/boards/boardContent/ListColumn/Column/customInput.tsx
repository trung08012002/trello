import { Input, InputProps } from "@mui/material";
import React from "react"

type CustomInputType = {
    placeholder: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
} & InputProps

const CustomInput = ({ setValue, placeholder, ...restProps }: CustomInputType) => {
    return (
        <Input
            placeholder={placeholder}
            disableUnderline={true}
            onChange={(event) => setValue(event.target.value)}
            fullWidth={true}
            {...restProps}
        ></Input>
    )
};

export default CustomInput;
