import React, {memo} from "react";
import {Box, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";

export const PaymentMethods = memo(function PaymentMethods({}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                px: 4,
                py: 3
            }}
        >
            <Typography
                variant="h2_64"
                color="text.tertiary"
            >
                Payments
            </Typography>
            <Outlet/>
        </Box>
    )
})