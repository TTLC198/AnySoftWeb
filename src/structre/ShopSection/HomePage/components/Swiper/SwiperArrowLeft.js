import {Box} from "@mui/material";
import React from "react";
import ArrowIcon from "../../../../components/Icons/ArrowIcon";

export default function SwiperArrowLeft(props) {
    return (
        <Box onClick={() => props.on_click()}
             sx={{
                 position: "absolute",
                 zIndex: 1000,
                 top: 0,
                 left: 0,
                 p: 0,
                 m: 0,
                 cursor: "pointer",
                 width: Math.round(props.offset),
                 height: props.height,
                 bgcolor: "rgba(0, 0, 0, 0.62)",
                 clipPath: "polygon(100% 0, 0 0, 0 100%)",
             }}
        >
            <ArrowIcon
                sx={{
                    color: "#fafafa",
                    fontSize: 60,
                    marginLeft: "15px",
                    marginTop: "30px",
                }}
            />
        </Box>
    )
}