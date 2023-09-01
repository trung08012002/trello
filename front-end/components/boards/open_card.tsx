import { Dialog } from "@mui/material";
import React from "react"

const OpenCard = ({ open }: {
    open: boolean,

}) => {
    return <Dialog open={true}>
        open card
    </Dialog>

};

export default OpenCard;
