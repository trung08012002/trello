"use client"
import React from "react"
import { Box, Button, IconButton, Typography } from "@mui/material";


import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CheckBox } from "@mui/icons-material";
import MenuButton from "@/components/appbar/menu_button";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { CustomGlobalStyle } from "@/components/styles/customGlobalStyle";
import MenuIcon from '@mui/icons-material/Menu';
import { useForm, FormProvider } from "react-hook-form";
import Attachment from "model/Attachment.model";
import CheckList from "model/check_list";
import Activity from "model/Activity.model";
import InputField from "../login/input-field";
import AvatarGroupField from "./avatar_group_field";
import UserMinimize from "model/userMinimize";
import MenuMembers from "./menu_members";
import LabelGroupField from "./label_group_field";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import LabelModel from "model/Label.model";




export interface CardPayload {
    background: string,
    cardName: string,
    columnName: string,
    visible: boolean,
    members: any[],
    labels: any[]
    dueDate: Date | null,
    description: string,
    attachments: Attachment[],
    checkList: CheckList[] | null,
    activity: Activity[],
}





const CardForm = ({ cardId }: { cardId: string }) => {
    const columnState = useSelector((state: RootState) => state.board.columns.find((column) => column.cardOrderIds.includes(cardId)))
    const cardState = columnState?.cards.find((card) => card._id == cardId)
    const formHanlder
        = useForm<CardPayload>({
            defaultValues: {
                background: cardState?.cover ?? '',
                cardName: cardState?.title ?? '',
                columnName: columnState?.name ?? '',
                visible: cardState?.visible ?? false,
                members: cardState?.members ?? [new UserMinimize({ _id: "1", name: "Ng Ha T", email: "Nguyen", role: "user" })],
                labels: cardState?.shownLabels ?? [],
                dueDate: cardState?.dueDate,
                description: cardState?.description ?? '',
                attachments: cardState?.attachments ?? [],
                checkList: cardState?.checkLists ?? [],
                activity: [],
            }
        })
    return <FormProvider {...formHanlder}>
        <Box display={"flex"} flexDirection={"column"} sx={{ backgroundColor: "rgb(241,242,244)", m: "auto", position: "relative", maxWidth: "770px" }} component="form">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                <CreditCardIcon sx={{ position: "absolute", top: "14px", left: 0 }} />
                <InputField name={"cardName"} control={formHanlder.control} size="small" defaultValue={"dsadsa"} fullWidth={false} sx={{ ml: "20px" }} />
                <Typography ml={"20px"} sx={CustomGlobalStyle.text14black}>in list d</Typography>
            </Box>
            <Box display={"flex"} >

                <Box display={"flex"} alignItems={"start"}>


                    <AvatarGroupField


                        avatarGroupProps={{
                            max: 4, sx: {

                                '& .MuiAvatar-root': {
                                    width: 40,
                                    height: 40,
                                    fontSize: 16, border: 'none', color: 'white', cursor: 'pointer', '&:first-of-type': {
                                        bgColor: '#a4b0be'
                                    },

                                }
                            }
                        }}

                        titleAddMenu="Members" buttonProps={{
                            style: { backgroundColor: "#E4E6EA" },
                            sx: { maxWidth: '43.2px', maxHeight: '43.2px', minWidth: '43.2px', minHeight: '43.2px', }

                        }}
                        childrenMenu={<MenuMembers boardMembers={[new UserMinimize({ _id: "2", name: "Ng Ha T", email: "Nguyen", role: "user" })]}
                            otherWorkSpaceMembers={[new UserMinimize({ _id: "1", name: "Ng Ha T", email: "Nguyen", role: "user" })]} />} />



                    <LabelGroupField idCard={cardId} labels={cardState?.shownLabels as LabelModel[]}>

                    </LabelGroupField>



                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography sx={CustomGlobalStyle.text12black600}>Notifications</Typography>
                        <Button
                            startIcon={<VisibilityIcon style={{ color: "#172b4d" }} />}
                            endIcon={<Box sx={{ height: "32px", width: "32px", backgroundColor: "#626f86", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ color: "white" }} /></Box>}
                        ><Typography>Watch</Typography></Button>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography sx={CustomGlobalStyle.text12black600}>Due date</Typography>
                        <Box display={"flex"} alignItems={"center"}>
                            <CheckBox />
                            <MenuButton title={"Sep 14 at 3:33 PM"} styleIcon={{ color: "#42526E" }} styleButton={{ style: { backgroundColor: "#091e420f", marginLeft: 2 }, size: "large" }} sx={CustomGlobalStyle.text14black}>


                            </MenuButton>
                        </Box>
                    </Box>


                </Box>

            </Box>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box display={"flex"}>
                    <MenuIcon />
                    <Typography sx={CustomGlobalStyle.text16black600}>Description</Typography>
                </Box>
                <Button style={{ backgroundColor: "#E4E6EA" }}>
                    <Typography sx={CustomGlobalStyle.text14black}>
                        Edit
                    </Typography></Button>
            </Box>
        </Box>


    </FormProvider >

};

export default CardForm;
