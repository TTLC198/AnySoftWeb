import {forwardRef} from "react";
import {Box} from "@mui/material";
import {baseURL} from "../../../../../generalUtilities";

export const SwiperProductCardImage = forwardRef((props, ref) => {
    return (
        <Box
            sx={{
                width: props.width,
                height: props.height,
                clipPath: `polygon(${Math.round(props.coordinates[0].X/props.width * 100)}% 0%, 100% 0%, ${Math.round(props.coordinates[2].X/props.width * 100)}% 100%, 0% 100%)`,
            }}
            style={{
                background: `linear-gradient(206.64deg, rgba(0, 0, 0, 0) 40.02%, rgba(0, 0, 0, 0.6) 76.15%), url(${baseURL +props.image_url}) center center / cover no-repeat`,
            }}
            {...props}
            ref={ref}
        >
            {props.children}
        </Box>
    )
})