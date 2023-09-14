import { Box, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, SxProps, Typography } from "@mui/material";
import UserMinimize from "model/userMinimize";
import React, { useState } from "react"
import StarIcon from '@mui/icons-material/Star';
import Board from "model/board.model";
import Background from "model/background.model";
function sxBoardNavbarItemByBackgroundType(background: Background): SxProps {

    if (background.type === 0) {
        return {
            width: "25px",
            height: "19px",
            backgroundImage: `url(${background.url})`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",


        };
    } else
        return {
            width: "25px",
            height: "19px",
            backgroundColor: background.backgroundColor,

        };
}
const BoardNavbarItem = ({ board }: { board: Partial<Board> }) => {
    const [isHover, setIsHover] = useState(false);
    const [isFavorite, setIsFavorite] = useState(board.favorite)
    const handelMouseEnter = () => {
        setIsHover(true);
    }
    const handleMouseLeave = () => {
        setIsHover(false);
    }
    const sxAvatar = sxBoardNavbarItemByBackgroundType(board.background!)
    return (
        <ListItem onMouseEnter={handelMouseEnter} onMouseLeave={handleMouseLeave} sx={{ pr: 0, height: "42px" }}>
            <ListItemAvatar>
                <Box sx={sxAvatar}

                ></Box>

            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{
                style: {


                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'

                }
            }}>{board.name}</ListItemText>
            <IconButton
                sx={{ display: isHover ? "block" : "none", }}
                onClick={() => {

                    setIsFavorite(!isFavorite)
                }}> <StarIcon sx={{ stroke: "#DFFF00", alignSelf: "flex-end", fill: `${isFavorite ? "#DFFF00" : "#FFFFFF"}` }} /></IconButton>
        </ListItem>
    )
};

export default BoardNavbarItem;
