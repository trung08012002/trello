import { Box, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import React from "react"
import { SelectProps } from "@mui/material";
import { Control, useController } from "react-hook-form"
import { CustomGlobalStyle } from "@/components/styles/customGlobalStyle";
export type SelectFieldProps = {
    name: string,
    control: Control<any>
    options: Array<any>
} & SelectProps


const SelectField = ({ name, control, options, ...rest }: SelectFieldProps) => {
    const { field: { onChange, ref, value } } = useController({ name, control })

    return (
        <Select name={name} onChange={onChange} value={value} renderValue={(value) => value} {...rest}>
            {options.map((option, index) =>
                <MenuItem key={index} value={option.name}>
                    {option.icon}
                    <Box sx={{ ml: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography sx={CustomGlobalStyle.text18gray}>{option.name}</Typography>
                        <Typography sx={{ whiteSpace: "pre-line" }}>{option.description}</Typography>
                    </Box>
                </MenuItem>
            )}
        </Select>
    )
};

export default SelectField;
