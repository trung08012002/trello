import { Box, Button, Input, TextField, Typography } from "@mui/material";
import UserMinimize from "model/userMinimize";
import React, { useState } from "react"
import MemberItem from "./member_item";
import { CustomGlobalStyle } from "../styles/customGlobalStyle";


const MenuMembers = ({ boardMembers, otherWorkSpaceMembers }: { boardMembers: UserMinimize[], otherWorkSpaceMembers: UserMinimize[] }) => {

   const [boardMembersSearch, setBoardMembersSearch] = useState(boardMembers)
   const [otherWorkSpaceMembersSearch, setOtherWorkSpaceMembersSearch] = useState(otherWorkSpaceMembers)
   const [showWorkSpaceMembers, setShowWorkSpaceMembers] = useState(false);
   return (
      <Box sx={{ display: "flex", flexDirection: "column", paddingX: "5px", pb: "10px" }}>
         <TextField placeholder="Search members" hiddenLabel={true} size="small"></TextField>
         {boardMembers.length == 0 && otherWorkSpaceMembers.length == 0 ?
            <Box><Typography>Looks like that person isn`&apos;`t a member yet.<br />Enter their email address to add them to<br /> the card and board.</Typography></Box>

            : <>
               <Typography>Board members</Typography>
               {boardMembersSearch.map((member, index) => {

                  return <MemberItem key={index} member={member} ></MemberItem>
               })}

               {showWorkSpaceMembers ? <>
                  <Typography>Workspace members</Typography>
                  {otherWorkSpaceMembers.length > 0 ? otherWorkSpaceMembersSearch.map((member, index) => {

                     return <MemberItem key={index} member={member} ></MemberItem>
                  }) : <Box>No result</Box>}
               </> :
                  <Button style={{ backgroundColor: "rgb(241,242,244)" }} sx={CustomGlobalStyle.text14black} onClick={() => { setShowWorkSpaceMembers(true) }}>
                     Show other Workspace members
                  </Button>
               }
            </>

         }


      </Box>
   )
};

export default MenuMembers;
