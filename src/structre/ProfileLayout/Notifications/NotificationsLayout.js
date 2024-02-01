import React, {memo, useContext, useMemo} from "react";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../utils/ClipPathCaluculationsScript";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import ReportSharpIcon from '@mui/icons-material/ReportSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {NotificationBackground} from "./NotificationBackground";
import {NotificationDetails} from "./NotificationDetails";

export const NotificationsLayout = memo(function NotificationsLayout({
                                                                         width,
                                                                         height,
                                                                         angle,
                                                                         offset,
                                                                         borderWidth,
                                                                     }) {
    const {user: {notifications}} = useContext(UserContext),
        {setters: {setNotification}} = useContext(UserFunctionsContext);

    const notificationBackgroundCoordinates = useMemo(() => coordinatesOfBlock(
        [0, 0],
        [width, height],
        calculateOffsetForCard(
            {
                angle,
                height,
                width,
                offset,
            }
        ),
        angle), [width, height, angle, offset])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2
            }}
        >
            {
                notifications.length !== 0 ?
                    <>
                        {
                            notifications.map((element, index) =>
                                <NotificationBackground
                                    key={index}
                                    width={width}
                                    height={height}
                                    coordinates={notificationBackgroundCoordinates}
                                    borderWidth={borderWidth}
                                >
                                    <Grid
                                        container
                                        columns={16}
                                        alignItems="center"
                                        sx={{
                                            flexWrap:"nowrap",
                                        }}
                                    >
                                        <Grid item xs={1}
                                              sx={{
                                                  display: "flex",
                                                  justifyContent: "center"
                                              }}
                                        >
                                            <ReportSharpIcon
                                                sx={{
                                                    color: "accent.danger",
                                                    fontSize: 40
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography
                                                variant="body20"
                                                color="text.primary"
                                            >
                                                {element.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}
                                            sx={{
                                                display: "flex",
                                            }}
                                        >
                                            <NotificationDetails
                                                details={element.details}
                                                maxHeight={height}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={1}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => setNotification(element)}
                                            >
                                                <CloseSharpIcon
                                                    sx={{
                                                        color: "text.primary",
                                                        fontSize: 40
                                                    }}

                                                />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </NotificationBackground>
                            )
                        }
                    </>
                    :
                    <Typography
                        variant="h2"
                        color="text.primary"
                    >
                        No notifications
                    </Typography>
            }
        </Box>
    )
})