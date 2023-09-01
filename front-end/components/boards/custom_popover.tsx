import { IconButton, Popover, PopoverProps } from "@mui/material";
import React, { ReactNode } from "react"

type CustomPopoverProps = {
    anchorEl: HTMLElement | null,
    open: boolean,
    handlePopoverClose: () => void,

    icon: ReactNode
} & PopoverProps

const CustomPopover = ({ open, anchorEl, handlePopoverClose, icon, ...rest }: CustomPopoverProps) => {
    return (
        <Popover
            id="mouse-over-popover"

            {...rest}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus

        >
            {icon}
        </Popover>
    )
};

export default CustomPopover;
