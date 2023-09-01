"use client"
import React, { useContext } from "react"
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import MenuLayoutOnChangeIcon from "./menu_layout_icon_on_change";
import ItemVisibility from "./itemVisibility";
import { MenuButtonIconOnChangeContext } from "./menu_button_icon_on_change";
import DoneIcon from '@mui/icons-material/Done';
const MenuVisiBility = () => {
    const context = useContext(MenuButtonIconOnChangeContext);
    const selectedOption = context?.selectedOption
    const setSelectedOption = context?.setSelectedOption
    const handleClose = context?.handleClose
    const options = [
        { title: "Private", icon: <LockIcon style={{ color: "#EA7B6C" }} />, description: "Only board members can see and edit this board" },
        { title: "Workspace", icon: <PeopleIcon style={{ color: "#9EA6A8" }} />, description: "All members of workSpace Workspace can see and edit this board" },
        { title: "Public", icon: <PublicIcon style={{ color: "#22A06B" }} />, description: "Anyone on the internet can see this board. Only board members can edit" },
    ]

    return (
        <MenuLayoutOnChangeIcon title={"Change visibility"}>
            {options.map((el, index) =>
                <ItemVisibility key={index} text={el.title} icon={el.icon} description={el.description}
                    onClick={() => {
                        setSelectedOption?.(index)
                        handleClose?.()
                    }} iconOnChoose={selectedOption == index ? <DoneIcon /> : undefined} />
            )}
        </MenuLayoutOnChangeIcon>

    )
};

export default MenuVisiBility;
