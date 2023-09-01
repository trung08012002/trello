"use client"
import React, { useState } from "react"



import { Box, } from "@mui/material";


import MenuCustomLayout from "./menu_custom_layout";
import ItemCreate from "./item_create";
import FormCreateBoard from "./formCreate/form_create_board";
import CreateWorkspaceDiaLog from "./formCreate/dialog";



const MenuCreate = ({ closeCreateFormAndPopUpDialog }: { closeCreateFormAndPopUpDialog: () => void }) => {
    const [choice, setChoice] = useState(-1)
    function createBoard() {
        setChoice(0)
    }
    function startWithTemplate() {
        setChoice(1)
    }
    function createWorkSpace() {
        closeCreateFormAndPopUpDialog()
    }
    function back() {
        setChoice(-1)
    }
    const Choice = new Map<string, () => void>([
        ["Create board", createBoard],
        ["Start with a template", startWithTemplate],
        ["Create WorkSpace", createWorkSpace],
    ])

    const onClickHandle = (name: string) => {

        return Choice.get(name)!()
    }

    const CreateChoiceComponent = (value: number) => {
        switch (value) {
            case 0:
                return <FormCreateBoard />



            default:

                break;
        }
    }

    const createChoice = [
        {
            icon: <Box component={"img"} src="/../../images/trello.png"></Box>,
            text: "Create board",
            description: 'A board is made up of cards ordered on lists. Use it \n to manage projects, track information, or organize\n anything.',
            onClick: () => onClickHandle("Create board")
        },
        {
            icon: <Box component={"img"} src="/../../images/social-media.png"></Box>,
            text: "Start with a template",
            description: "Get started faster with a board template.",
            onClick: () => onClickHandle("Start with a template")
        },
        {
            icon: <Box component={"img"} src="/../../images/friends.png"></Box>,
            text: "Create WorkSpace",
            description: 'A Workspace is a group of boards and people. Use it\n to organize your company, side hustle, family, or\n friends.',
            onClick: () => onClickHandle("Create WorkSpace")
        },
    ]


    return (

        <MenuCustomLayout title={choice !== -1 ? createChoice[choice].text : undefined} handleBack={back}
        >

            {choice == -1 ? createChoice.map((el, index) => <ItemCreate key={index} text={el.text} icon={el.icon} description={el.description} onClick={el.onClick} />) : null

            }
            {
                CreateChoiceComponent(choice)
            }

        </MenuCustomLayout>
    )
};

export default MenuCreate;
