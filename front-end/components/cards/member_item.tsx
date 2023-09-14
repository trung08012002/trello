import getBeginWordUppercase from "@/app/utils/getBeginWord";
import { Tooltip, Avatar, Box, Typography, Button } from "@mui/material";
import UserMinimize from "model/userMinimize";
import React, { useState } from "react"
import CheckIcon from '@mui/icons-material/Check';
import { useFormContext } from "react-hook-form";
import { cloneDeep } from "lodash";
const MemberItem = ({ member }: { member: UserMinimize }) => {
    const { setValue, getValues } = useFormContext()
    const [pushOrDelete, setPushOrDelete] = useState(false)
    const members = cloneDeep(getValues("members")) as UserMinimize[]
    const checkInCard = (members as UserMinimize[])?.findIndex((e) => e._id == member._id) !== -1
    return (
        <Tooltip
            title={member.email}>
            <Button onClick={() => {
                if (pushOrDelete) {

                    members.push(member)

                    setValue("members", members)
                }
                else {

                    const index = members.findIndex((e) => e._id == member._id)
                    members.splice(index, 1)

                    setValue("members", members)
                }
                setPushOrDelete(!pushOrDelete)
            }}>
                <Box sx={{ display: "flex", alignItems: "center", position: "relative", width: "100%" }}>
                    <Avatar sx={{ color: member.backgroundColor, mr: "5px" }}>{getBeginWordUppercase(member.name)}</Avatar>
                    <Typography>{member.name}</Typography>
                    {checkInCard ? <CheckIcon sx={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", }} /> : null}
                </Box>
            </Button></Tooltip>
    )
};

export default MemberItem;
