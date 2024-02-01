import React, {memo, useContext} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import {UserContext} from "../ShopSection/UserContext";
import LibraryIcon from "../components/Icons/LibraryIcon";
import {AchievementIcon} from "../components/Icons/AchievementIcon";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {baseURL} from "../../generalUtilities";

export const ProfileHeader = memo(function ProfileHeader() {
    const {user: {user, ownedProducts}} = useContext(UserContext);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                maxHeight: "300px",
                height: "23vh",
                width: "100%",
                background:"linear-gradient(272.66deg, rgba(255, 0, 212, 0.5) -2.19%, rgba(0, 221, 255, 0.5) 101.11%)",
            }}
        >
            <Box
                sx={{
                    px: 7,
                    display: "flex",
                    justifyContent: "space-between",
                    width:"100%"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        {
                            user.image === "" ?
                                <Avatar sx={{
                                    width: 120,
                                    height: 120,
                                    boxShadow: "0px 0px 5px 3px rgba(0, 0, 0, 0.4)",
                                }}>
                                    {user.login[0].toUpperCase()}
                                </Avatar>
                                :
                                <Avatar sx={{
                                    width: 120,
                                    height: 120,
                                    boxShadow: "0px 0px 5px 3px rgba(0, 0, 0, 0.4)",
                                }}
                                        src={baseURL + user.image}
                                />
                        }
                    </Box>
                    <Box sx={{ml: 2, display: 'flex', flexDirection: "column", alignItems: "start"}}>
                        <Typography className="ProfileText"
                                    textAlign="center"
                                    variant="h2"
                                    color="text.primary">
                            {user.login}
                        </Typography>
                        <Typography className="ProfileText"
                                    textAlign="center"
                                    variant="body14"
                                    color="text.primary">
                            status
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "35px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <LibraryIcon
                                sx={{
                                    color: "tertiary.main",
                                    fontSize: 30
                                }}
                            />
                            <Typography
                                variant="body20"
                                color="text.primary"
                            >
                                {ownedProducts.length}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body18"
                            color="text.primary"
                        >
                            Games on account
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <AchievementIcon
                                sx={{
                                    color: "accent.third",
                                    fontSize: 30
                                }}
                            />
                            <Typography
                                variant="body20"
                                color="text.primary"
                            >
                                120
                            </Typography>
                        </Box>
                        <Typography
                            variant="body18"
                            color="text.primary"
                        >
                            Achievements
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <WatchLaterIcon
                                sx={{
                                    color: "accent.fourth",
                                    fontSize: 30
                                }}
                            />
                            <Typography
                                variant="body20"
                                color="text.primary"
                            >
                                1344
                            </Typography>
                        </Box>
                        <Typography
                            variant="body18"
                            color="text.primary"
                        >
                            Hours played
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
})