import { Box, Card, Button, IconButton } from "@mui/material";
import { cloneDeep } from "lodash";
import CardInfor from "model/card_infor.model";
import React, { useContext, useState } from "react"
import { cardApi } from "src/api-client/card-api";
import CustomInput from "../customInput";
import { BoardContext } from "../../../board_content";
import ClearIcon from '@mui/icons-material/Clear';
const AddItem = ({ id, setAdd }: { id: string, setAdd: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [value, setValue] = useState("");

    const { orderColumns, setOrderColumns } = useContext(BoardContext)
    return (
        <Box sx={{ display: "flex", flexDirection: "column", pb: "8px" }}>
            <Card sx={{ padding: "5px 10px 20px 10px", boxShadow: '0 1px 1px rgba(0,0,0,0.2)', borderRadius: "10px", }}>
                <CustomInput setValue={setValue} placeholder="Enter a title for this card..." multiline={true} minRows={3} />

            </Card>
            <Box display={"flex"} sx={{ mt: "8px" }}>
                <Button style={{ backgroundColor: "#0C66E4", color: "white" }} onClick={() => {
                    cardApi.insertCard({ title: value, columnId: id }).then((card) => {
                        console.log(card)
                        console.log("orderColumns", orderColumns)
                        const tempOrderColumns = cloneDeep(orderColumns)

                        const tempColumn = tempOrderColumns.find((column) => column._id == id);
                        tempColumn?.cards.push(new CardInfor({ _id: card._id, title: value }));
                        tempColumn?.cardOrderIds.push(card._id);
                        setOrderColumns(tempOrderColumns)
                        setAdd(false)
                    })

                }}>Add Card</Button>
                <IconButton onClick={() => setAdd(false)}><ClearIcon /></IconButton>
            </Box>
        </Box>
    )
};

export default AddItem;
