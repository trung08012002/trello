import { Box, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import React from "react"
import { SelectProps } from "@mui/material";
import { Control, useController } from "react-hook-form"
import { CustomGlobalStyle } from "@/components/styles/customGlobalStyle";
export type SelectFieldNormalProps = {
    name: string,
    control: Control<any>
    options: Array<any>
} & SelectProps


const SelectFieldNormal = ({ name, control, options, ...rest }: SelectFieldNormalProps) => {
    const { field: { onChange, ref, value } } = useController({ name, control })

    return (
        <Select name={name} onChange={onChange} value={value} renderValue={(value) => value} {...rest}>
            {options.map((option, index) =>
                <MenuItem key={index} value={option}>
                    <Typography>{option}</Typography>
                </MenuItem>
            )}
        </Select>
    )
};

export default SelectFieldNormal;
