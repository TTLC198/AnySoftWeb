import {Box} from "@mui/material";
import React from "react";
import ArrowIcon from "../../../../components/Icons/ArrowIcon";

export default function SwiperArrowRight(props) {
    return (
        <Box
            onClick={() => props.on_click()}
            sx={{
                position: "absolute",
                zIndex: 1000,
                bottom: 0,
                right: 0,
                p: 0,
                m: 0,
                cursor: "pointer",
                width: Math.round(props.offset),
                height: props.height,
                bgcolor: "rgba(0, 0, 0, 0.62)",
                clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
            }}
        >
            <ArrowIcon
                sx={{
                    color: "#fafafa",
                    fontSize: 60,
                    marginLeft: "50px",
                    marginTop: "250px",
                    transform: "rotate(180deg)",
                }}
            />
        </Box>
    )
}