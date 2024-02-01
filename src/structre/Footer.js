import React from "react";
import {Box, Typography} from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer(props) {
    return (
        <Box
            sx={{
                width: "100%",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >
            <CopyrightIcon
                sx={{
                    color: "text.primary",
                    mr: 1
                }}
            />
            <Typography
                variant="h2"
                color="text.primary"
                sx={{
                    textDecoration: "underline",
                }}
            >
                AnySoft
            </Typography>
        </Box>
    )
}