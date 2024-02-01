import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {Box, Container, Grid, Typography} from "@mui/material";
import {matchPath, Navigate, Outlet, useLocation, useMatch, useMatches, useNavigate} from "react-router-dom";
import {UserContext} from "../ShopSection/UserContext";
import {ProfileHeader} from "./ProfileHeader";
import {ProfileNavBar} from "./ProfileNavBar/ProfileNavBar";

export const loader = (apiClient) => async ({request, params}) => {

}
export const ProfileLayout = memo(function ProfileLayout() {
    const {user: {isLoggedIn}} = useContext(UserContext);
    const loadingRef = useRef(null);
    const navigate = useNavigate();



    useEffect(()=>{
        if (loadingRef.current) {
            const timeout = setTimeout(() => navigate("/authorization/signin"), 5000);

            return () => clearTimeout(timeout);
        }
    }, [loadingRef.current])

    return (
        <Container maxWidth="xl"
                   sx={{
                       display: "flex",
                       flexDirection: "column",
                       bgcolor: "background.primary",
                       my: 1,
                       p: 0,
                       flexGrow: 1
                   }}
                   style={{
                       padding: "0px"
                   }}
        >
            {
                isLoggedIn ?
                    <>
                        <ProfileHeader/>
                        <Grid
                            container
                            sx={{
                                flexGrow: 1
                            }}

                        >
                            <Grid
                                xs={3}
                                item
                                sx={{
                                    borderRight: 1,
                                    borderRightColor: "rgba(197, 198, 199, 0.5)",
                                }}
                            >
                                <ProfileNavBar/>
                            </Grid>
                            <Grid xs={9} item>
                                <Outlet/>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <Box
                        sx={{
                            display: "flex",
                            height: "100%",
                            flexDirection:"row",
                            justifyContent:"center",
                            alignItems:"center",
                        }}
                    >
                        <Typography ref={loadingRef}>
                            Loading
                        </Typography>
                    </Box>
            }
        </Container>
    )
})