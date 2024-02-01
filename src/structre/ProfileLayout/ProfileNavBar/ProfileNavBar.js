import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {ProfileTab} from "./ProfileTab";
import PersonIcon from '@mui/icons-material/Person';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {LockIcon} from "../../components/Icons/LockIcon";
import LibraryIcon from "../../components/Icons/LibraryIcon";
import {CartIcon} from "../../components/Icons/CartIcon";
import {PaymentIcon} from "../../components/Icons/PaymentIcon";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import {UserContext} from "../../ShopSection/UserContext";
import {login_validation} from "../../Auth/AuthUtils";

export function ProfileNavBar() {
    const {user: {user}} = useContext(UserContext);

    let location = useLocation();

    const [currentTab, setCurrentTab] = useState("");

    useEffect(()=>{
        const path = location.pathname.split("/");
        if (path.length < 3) {
            setCurrentTab("");
            return;
        }
        setCurrentTab(path[2]);
    }, [location])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            <ProfileTab
                name={""}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <PersonIcon
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Account information
                        </Typography>
                    </>
                }
            </ProfileTab>
            <ProfileTab
                name={"passwordChange"}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <LockIcon
                            borderColor={isActive ? "#FCBD58" : "#B08035"}
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Change password
                        </Typography>
                    </>
                }
            </ProfileTab>
            <ProfileTab
                name={"library"}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <LibraryIcon
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Library
                        </Typography>
                    </>
                }
            </ProfileTab>
            {
                user.role === "seller" &&
                <ProfileTab
                    name={"sellerProducts"}
                    currentPath={currentTab}
                >
                    {(isActive) =>
                        <>
                            <Inventory2SharpIcon
                                sx={{
                                    color: isActive ? "accent.third" : "accent.second",
                                    fontSize: 35
                                }}
                            />
                            <Typography
                                variant="body18"
                                color={isActive ? "text.primary" : "text.secondary"}
                            >
                                Your products
                            </Typography>
                        </>
                    }
                </ProfileTab>
            }
            <ProfileTab
                name={"notifications"}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <NotificationsOutlinedIcon
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Notifications
                        </Typography>
                    </>
                }
            </ProfileTab>
            <ProfileTab
                name={"cart"}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <CartIcon
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Cart
                        </Typography>
                    </>
                }
            </ProfileTab>
            <ProfileTab
                name={"payments"}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <PaymentIcon
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Payment methods
                        </Typography>
                    </>
                }
            </ProfileTab>
            <ProfileTab
                name={"wishlist"}
                currentPath={currentTab}
            >
                {(isActive) =>
                    <>
                        <FavoriteOutlinedIcon
                            sx={{
                                color: isActive ? "accent.third" : "accent.second",
                                fontSize: 35
                            }}
                        />
                        <Typography
                            variant="body18"
                            color={isActive ? "text.primary" : "text.secondary"}
                        >
                            Wishlist
                        </Typography>
                    </>
                }
            </ProfileTab>
        </Box>
    )
}