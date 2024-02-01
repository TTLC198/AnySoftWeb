import {MenuItem, Typography} from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function MyMenuItem(props) {
    return (
        <MenuItem
            onClick={props.handle_close}
            onMouseEnter={(event) => {
                props.menu_popper_enter(props.name);
                props.option_hover_set_state(props.id);
            }}
            onMouseLeave={(event) => {
                props.menu_popper_leave(event);
            }}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                "&.hovered" : {
                    bgcolor: 'rgba(0, 0, 0, 0.1)',
                }
            }}
            className={props.option_hover_state === props.id ? "hovered": ""}
        >
            <Typography
                variant="navLinkMenu"
                color="text.black"
                sx={{
                    minWidth: "200px"
                }}
            >
                {props.children}
            </Typography>
            {
                props.option_hover_state === props.id ?
                    <KeyboardDoubleArrowRightIcon color="primary"></KeyboardDoubleArrowRightIcon>
                    :
                    <KeyboardArrowRightIcon sx={{ color: "text.black" }}></KeyboardArrowRightIcon>
            }
        </MenuItem>
    )
}