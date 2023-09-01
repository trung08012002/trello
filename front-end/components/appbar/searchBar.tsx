"use client"
import { TextField, InputAdornment } from "@mui/material";
import { Container } from "postcss";
import React, { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setSearch(event.target.value) }

    return (

        <TextField
            id="search"
            type="search"

            label={search === "" ? "Search" : ""}

            value={search}
            onChange={handleChange}
            size={"small"}

            sx={{
                maxWidth: 300,
            }}
            InputLabelProps={{
                shrink: false,
            }}
            InputProps={{

                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />

    )
};

export default SearchBar;
