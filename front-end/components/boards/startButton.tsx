import { IconButton } from "@mui/material";
import React, { useState } from "react"
import StarIcon from '@mui/icons-material/Star';
const StartButton = ({ favorite }: { favorite: boolean }) => {
    const [isFavorite, setIsFavorite] = useState(favorite)
    return (
        <IconButton onClick={() => setIsFavorite(!isFavorite)} >
            <StarIcon sx={{ stroke: "#DFFF00", alignSelf: "flex-end", fill: `${isFavorite ? "#DFFF00" : "#FFFFFF"}` }} />
        </IconButton>
    )
};

export default StartButton;
