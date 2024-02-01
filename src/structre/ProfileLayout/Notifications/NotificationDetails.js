import {Box, IconButton, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useEffect, useRef, useState} from "react";

export function NotificationDetails({
                                        details,
                                        maxHeight,
                                        setMaxHeight
                                    }) {
    const [isReadMore, setIsReadMore] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);

    const overflowRef = useRef(null);

    useEffect(() => {
        const element = overflowRef.current;
        if (element) {
            console.log(overflowRef)
            setIsOverflowed(element.offsetHeight < element.scrollHeight);
        }
    }, [])

    return (
        <>
            <Box
                ref={overflowRef}
                sx={{
                    maxHeight: maxHeight - 10,
                    overflow: "hidden",
                    whiteSpace: "pre-line"
                }}
            >
                <Typography
                    variant="body14"
                    color="text.primary"
                >
                    {details}
                </Typography>
            </Box>
            {
                isOverflowed && (
                    <IconButton
                        onClick={() => {
                            setIsReadMore(true);
                            setIsOverflowed(false);
                        }}
                        sx={{
                            p: 0
                        }}
                    >
                        <ExpandMoreIcon
                            sx={{
                                color: "text.primary",
                                fontSize: 40
                            }}
                        />
                    </IconButton>
                )
            }
        </>
    )
}