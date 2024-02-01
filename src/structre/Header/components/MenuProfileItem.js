import {MenuItem} from "@mui/material";
import React, {useState} from "react";

export default function MenuProfileItem(props) {
    const [isHovered, setIsHovered]=useState(false);
    return (
        <MenuItem
            onMouseEnter={(event) => {
                setIsHovered(true);
            }}
            onMouseLeave={(event) => {
                setIsHovered(false);
            }}
            sx={{
                display: "flex",
                justifyContent: "start",
                width: '300px',
                "&.hovered" : {
                    bgcolor: 'rgba(0, 0, 0, 0.1)',
                },
            }}
            className={isHovered ? "hovered": ""}
            {...props}
        >
            {props.children}
        </MenuItem>
    )
}