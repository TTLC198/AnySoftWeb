import {Box, Paper} from "@mui/material";
import React from "react";

export default function CustomSearchPopup(props) {
    return (
        <Paper sx={{
            mt:1,
            bgcolor: 'accent.first',
            boxShadow: 6,
            border: 2,
            borderRadius:0,
            borderColor: 'accent.second',
        }}>
            {props.children}
        </Paper>
    )
}