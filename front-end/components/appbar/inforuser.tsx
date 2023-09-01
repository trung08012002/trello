import { Avatar, Box, Typography } from "@mui/material";
import React from "react"
import { deepOrange, deepPurple } from '@mui/material/colors';

interface Props {
    inforuser: {
        name: string,
        email: string,
    }

}

function getfirstLetter(name: string): string {
    const names = name.split(' ')
    let namecut = '';
    for (let i = 0; i < names.length; i++) {
        namecut += names[i][0].toUpperCase();
    }
    return namecut
}
function fetchInforUser(idUser: number): Promise<any> {
    return fetch(`http://localhost:3002/users/${idUser}`).then(res => res.json())
}

export async function generateStaticParams() {
    const inforusers = await fetch('http://localhost:3001/users').then((res) => res.json())

    return inforusers.map((inforuser: any) => ({
        idUser: inforuser.idUser
    }))
}
interface Params {
    params: {
        idUser: number
    }
}
const InforUser = async ({ params }: Params) => {
    const { idUser } = params;
    const { name, email } = await fetchInforUser(idUser);
    return (
        <Box display="flex" >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{getfirstLetter(name)}</Avatar>
            <Box display={"flex"} flexDirection={"column"}>
                <Typography>{name}</Typography>
                <Typography>{email}</Typography>
            </Box>
        </Box>

    )
};

export default InforUser;
