import {Typography} from "@mui/material";
import React from "react";
import TiltedBox from "../components/TiltedBox";

export default function Discount(props) {
    return (
        <TiltedBox
            {...props}
            bgcolor={"#FC7872"}
        >
            <Typography
                variant="navLink"
                color="text.primary"
            >
                -{props.children}%
            </Typography>
        </TiltedBox>
    )
}