import {memo} from "react";
import {Box} from "@mui/material";
import {baseURL} from "../../../generalUtilities";

export const CardImage = memo(function CardImage({
                                                     width,
                                                     coordinates,
                                                     height,
                                                     image,
                                                     children,
                                                     ...rest
                                                 }) {
    const clipPath = `polygon(
        ${Math.round(coordinates[0].X / width * 100)}% 0, 
        100% 0, 
        100% ${Math.round(coordinates[2].Y / height * 100)}%, 
        ${Math.round(coordinates[3]?.X / width * 100)}% 100%, 
        0 100%, 
        0 ${Math.round(coordinates[5]?.Y / height * 100)}%
        )`;

    return (
        <Box
            sx={{
                width: width,
                height: height,
                clipPath: clipPath,
                background: `url(${baseURL + image}) center center / cover no-repeat`
            }}
        />
    )
})