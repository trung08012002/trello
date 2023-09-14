
import React from "react"
import Modal from "@/components/modal/Modal";
import { Avatar, AvatarGroup, Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { deepOrange } from "@mui/material/colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CheckBox } from "@mui/icons-material";
import MenuButton from "@/components/appbar/menu_button";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { CustomGlobalStyle } from "@/components/styles/customGlobalStyle";
const CardModal = ({ params: { id: cardId } }: { params: { id: string } }) => {

    return (
        <Modal>
            <Box display={"flex"} flexDirection={"column"} sx={{ backgroundColor: "rgb(241,242,244)", m: "auto", maxWidth: "770px" }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
                    <Box display={"flex"}>
                        <CreditCardIcon />
                        <Box display={"flex"} flexDirection={"column"}>
                            <Typography sx={CustomGlobalStyle.text20black600}>dsadsa</Typography>
                            <Typography sx={CustomGlobalStyle.text14black}>in list d</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display={"flex"}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Box display={"flex"} >
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography sx={CustomGlobalStyle.text12black600}>Members</Typography>
                                <Box display={"flex"}>
                                    <AvatarGroup max={4}>
                                        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                                    </AvatarGroup>
                                    <IconButton style={{ backgroundColor: "#E4E6EA" }}><AddIcon /></IconButton></Box>

                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography sx={CustomGlobalStyle.text12black600}>Labels</Typography>
                                <Box display={"flex"}>
                                    <Button

                                        size="small"
                                        style={{ backgroundColor: "#4bce97", }}
                                        sx={{
                                            borderradius: "4px",

                                            minwidth: "56px",
                                            maxwidth: "100%",

                                            boxsizing: "borderbox",

                                            color: " #164b35",
                                            lineheight: "16px",
                                            fontsize: "12px",
                                            fontweight: 500,
                                            textalign: "left",
                                            verticalalign: "middle",
                                            overflow: "hidden",
                                            textoverflow: "ellipsis",
                                            whitespace: "nowrap",
                                        }}></Button>
                                    <IconButton style={{ backgroundColor: "#E4E6EA" }}><AddIcon /></IconButton>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography sx={CustomGlobalStyle.text12black600}>Notifications</Typography>
                                <Button
                                    startIcon={<VisibilityIcon style={{ color: "#172b4d" }} />}
                                    endIcon={<Box sx={{ height: "32px", width: "32px", backgroundColor: "#626f86", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ color: "white" }} /></Box>}
                                ><Typography>Watch</Typography></Button>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography sx={CustomGlobalStyle.text12black600}>Due date</Typography>
                                <Box display={"flex"}>
                                    <CheckBox />
                                    <MenuButton title={"Sep 14 at 3:33 PM"} styleIcon={{ color: "#42526E" }} styleButton={{ backgroundColor: "#091e420f", marginLeft: 2 }} sx={CustomGlobalStyle.text14black}>


                                    </MenuButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box display={"flex"}>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Typography sx={CustomGlobalStyle.text16black600}>Description</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Modal >
    )
};

export default CardModal;
