import React from "react";
import '../../App.css';
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

export default function ShopSection() {
    return (
        <Container maxWidth="xl"
                   sx={{
                       bgcolor: "background.primary",
                       mt: 1,
                       p: 0,
                       flexGrow: 1
                   }}
                   style={{
                       padding: "0px"
                   }}
        >
            <Outlet/>
        </Container>
    );
}
