import {forwardRef} from "react";
import {Box} from "@mui/material";
import {baseURL} from "../../generalUtilities";

export const ProductCardImage = forwardRef((props, ref) => {
    const clipPath =
        `polygon(${Math.round(props.coordinates[0].X / props.width * 100)}% 0, 
        100% 0, 
        100% ${Math.round(props.coordinates[2].Y / props.height * 100)}%, 
        ${Math.round(props.coordinates[3]?.X / props.width * 100)}% 100%, 
        0 100%, 
        0 ${Math.round(props.coordinates[5]?.Y / props.height * 100)}%)`;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: props.width,
                height: props.height,
                clipPath: clipPath,
                bgcolor: props.border_color || "secondary.main",
            }}
            {...props}
        >
            <Box
                sx={{
                    width: props.width - 4,
                    height: props.height - 4,
                    clipPath: clipPath,
                }}
                style={{
                    background: `url(${props.image_url_old ? "" : baseURL}${props.image_url}) center center / cover no-repeat`,
                }}
                ref={ref}
            >
                {props.children}
            </Box>
        </Box>
    )
})