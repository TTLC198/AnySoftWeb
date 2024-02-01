import {Typography} from "@mui/material";
import React  from "react";
import TiltedBox from "../components/TiltedBox";

export default function Price(props) {
    return (
        <TiltedBox
            {...props}
            bgcolor={"#45A29E"}
        >
            <Typography
                variant="navLink"
                color="text.primary"
            >
                ${props.children}
            </Typography>
        </TiltedBox>
    )
}