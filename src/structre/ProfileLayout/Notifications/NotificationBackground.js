import {memo} from "react";
import {Box} from "@mui/material";

export const NotificationBackground = memo(function NotificationBackground({
                                                               width,
                                                               coordinates,
                                                               height,
                                                               borderWidth,
                                                               borderColor,
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: width,
                height: height,
                clipPath: clipPath,
                bgcolor: borderColor || "accent.third",
            }}
            {...rest}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: width - borderWidth * 2,
                    height: height - borderWidth * 2,
                    clipPath: clipPath,
                    bgcolor: "primary.main"
                }}
            >
                {children}
            </Box>
        </Box>
    )
})