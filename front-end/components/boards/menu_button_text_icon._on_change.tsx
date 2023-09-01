// "use client"
// import { Box, Button, TextFieldProps, Typography, TypographyProps } from "@mui/material";
// import React, { ReactNode, useState, createContext } from "react"

// type Props = {
//     icon: number,
//     children: ReactNode,
//     icons: ReactNode[],
//     types: string[]
// } & TypographyProps

// interface OpenContextIconOnChange {
//     open: boolean,
//     selectedOption: number,
//     handleClose: () => void,
//     setSelectedOption: React.Dispatch<React.SetStateAction<number>>,
//     anchorEl: null | HTMLElement
// }
// export const MenuButtonIconOnChangeContext = createContext<OpenContextIconOnChange | undefined>(undefined);


// const MenuButtonTextIconOnChange = ({ icon, icons, children, types, sx, ...rest }: Props) => {

//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//     const [selectedOption, setSelectedOption] = React.useState<number>(icon)
//     const open = Boolean(anchorEl);
//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     return (
//         <MenuButtonIconOnChangeContext.Provider value={{ open, handleClose, anchorEl, selectedOption, setSelectedOption }}>

//             <Button onClick={handleClick}
//                 style={{ width: "fit-content" }}
//                 sx={{
//                     "&.MuiButtonBase-root,.MuiButton-root,.css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
//                         padding: 0,

//                     }
//                 }}>

//                 <Box display="flex" alignItems={"center"}>
//                     {icons[selectedOption]}
//                     <Typography sx={sx}>{types[selectedOption]}</Typography>
//                 </Box>

//             </Button>
//             {
//                 children
//             }


//         </MenuButtonIconOnChangeContext.Provider>
//     )
// };








// export default MenuButtonTextIconOnChange;
