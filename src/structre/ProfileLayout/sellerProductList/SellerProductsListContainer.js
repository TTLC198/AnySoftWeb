import React, {memo, useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {UserContext} from "../../ShopSection/UserContext";
import {Navigate, Outlet} from "react-router-dom";

export const SellerProductsListContainer = memo(() => {
    const {user: {user}} = useContext(UserContext);


    return (
        <>
            {
                user.role === "seller" ?
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            px: 4,
                            py: 3
                        }}
                    >
                        <Outlet/>
                    </Box>
                    :
                    <Navigate to={"/profile"} replace={true}/>
            }
        </>
    )
})