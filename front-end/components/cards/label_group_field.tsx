import { Box, Button, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { ReactNode } from "react"
import AddIcon from '@mui/icons-material/Add';
import { useFormContext } from "react-hook-form";
import MenuButtonIcon from "../appbar/menuButtonIcon";
import MenuLayout from "../appbar/menu_layout";
import MenuButton from "../boards/Menu_Label";
import LabelModel from "model/Label.model";
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";



const LabelGroupField = ({ idCard, children, labels }: { idCard: string, children: ReactNode, labels: LabelModel[] }) => {

    return (

        <Box display={"flex"} flexDirection={"column"}>
            <Typography sx={CustomGlobalStyle.text12black600}>Labels</Typography>
            <Box sx={{ display: "flex" }}>
                {labels?.map((label, index) => <MenuButton key={index} style={{ backgroundColor: `${label.color}`, }}
                    sx={{
                        borderradius: "4px",

                        minwidth: "56px",
                        maxwidth: "100%",

                        boxsizing: "borderbox",


                        lineheight: "16px",
                        fontsize: "12px",
                        fontweight: 500,
                        textalign: "left",
                        verticalalign: "middle",
                        overflow: "hidden",
                        textoverflow: "ellipsis",
                        whitespace: "nowrap",
                    }}
                    title={`${label.text}`}
                >

                </MenuButton>)}
                <MenuButtonIcon icon={<AddIcon />} style={{ maxWidth: '43.2px', maxHeight: '43.2px', minWidth: '43.2px', minHeight: '43.2px', backgroundColor: "#E4E6EA" }}>
                    {children}
                </MenuButtonIcon>

            </Box>
        </Box>


    )
};

export default LabelGroupField;
