import React, {memo} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {AccountInfoForm} from "./AccountInfoForm";
import {AccountPhotoForm} from "./AccountPhotoForm";

export const AccountInformation = memo(function AccountInformation({
                                                                       ...rest
                                                                   }) {


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
                Profile
            </Typography>
            <Grid
                container
            >
                <Grid item xs={8}>
                    <AccountInfoForm/>
                </Grid>
                <Grid item xs={4}>
                    <AccountPhotoForm/>
                </Grid>
            </Grid>
        </Box>
    )
})