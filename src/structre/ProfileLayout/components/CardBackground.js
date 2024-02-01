import {memo} from "react";
import {Box} from "@mui/material";

export const CardBackground = memo(function CardBackground({
                                                               width,
                                                               coordinates,
                                                               height,
                                                               borderWidth,
                                                               border_color,
                                                               bgcolor,
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
                bgcolor: border_color || "accent.third",
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
                <Box
                    sx={{
                        width: width - borderWidth * 2,
                        height: height - borderWidth * 2,
                        clipPath: clipPath,
                        bgcolor: bgcolor || "rgba(176, 128, 53, 0.3)",

                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
})