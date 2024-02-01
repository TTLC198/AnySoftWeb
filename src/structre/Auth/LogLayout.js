import {Container, Grid, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import React, {useContext} from "react";
import {UserContext} from "../ShopSection/UserContext";

export default function LogLayout() {
    const {user: {isLoggedIn}} = useContext(UserContext);
    return (
        <Container maxWidth="xl"
                   sx={{
                       bgcolor: "rgba(31, 40, 51, 0.5)",
                       my: 1,
                       p: 0,
                       flexGrow: 1,
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center"
                   }}
        >

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                {
                    isLoggedIn ?
                        <Typography
                            variant="h2_64"
                            color="text.primary"
                        >
                            You already logged in
                        </Typography>
                        :
                        <Outlet/>
                }
            </Grid>
        </Container>
    )
}