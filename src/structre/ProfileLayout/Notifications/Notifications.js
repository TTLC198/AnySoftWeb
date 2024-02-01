import React, {memo, useEffect, useRef, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {NotificationsLayout} from "./NotificationsLayout";

export const Notifications = memo(function Notifications({...rest}) {

    const [notificationWidth, setNotificationWidth] = useState(0);
    const notificationHeight = 80,
        notificationAngle = -1 * Math.PI / 4,
        notificationOffset = 20,
        notificationBorderWidth = 2;


    const notificationWidthRef = useRef(null);


    useEffect(() => {
        if (notificationWidthRef.current) {
            setNotificationWidth(notificationWidthRef.current.offsetWidth)
        }
    }, [notificationWidthRef.current])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 2,
                px: 4,
                py: 3
            }}
        >
            <Typography
                variant="h2_64"
                color="text.tertiary"
            >
                Notifications
            </Typography>
            <Grid container sx={{
                gap: 4
            }}>
                <Grid item xs={12} ref={notificationWidthRef}>
                    <NotificationsLayout
                        width={notificationWidth}
                        height={notificationHeight}
                        angle={notificationAngle}
                        offset={notificationOffset}
                        borderWidth={notificationBorderWidth}
                    />
                </Grid>
            </Grid>
        </Box>
    )
})