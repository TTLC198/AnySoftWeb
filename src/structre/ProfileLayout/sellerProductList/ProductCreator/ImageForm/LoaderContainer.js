import {memo} from "react";
import {Pages} from "@mui/icons-material";
import {Box, Paper} from "@mui/material";

export const LoaderContainer = memo(({children}) => {
    return (
        <Paper
            elevation={5}
            sx={{
                aspectRatio: "16 / 9",
                borderRadius: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#506177"
            }}
        >
                {children}
        </Paper>
    )
})