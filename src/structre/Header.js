import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    AppBar, Box,
    Stack,
    Toolbar, Typography,
} from "@mui/material";
import {NavButton} from "./Header/NavButton";
import NavSearch from "./Header/NavSearch";
import NavProfile from "./Header/NavProfile";
import SteamIcon from "./components/Icons/SteamIcon";
import NavGameMenu from "./Header/NavGameMenu";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "./ShopSection/UserContext";
import {NavProfileUnAuth} from "./Header/NavProfileUnAuth";

export default function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuAnchor = useRef(null);
    const [isActiveSearchField, setIsActiveSearchField] = useState(false);
    const navigate= useNavigate();
    const {user: {isLoggedIn}} = useContext(UserContext);

    function handleMenuClose(event) {
        if (menuAnchor.current && menuAnchor.current.contains(event.target)) {
            return;
        }
        setIsMenuOpen(false);
    }

    return (
        <AppBar
            sx={{
                boxShadow: 3,
                p: 0,
                backgroundColor: "background.header",
                mt: "5px",
                position: "static",
                flexShrink: "0",
            }}
        >
            <Toolbar disableGutters style={{minHeight: "53px"}}>
                <div style={{width: "120rem", display: "flex", margin: "0 auto"}}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <NavButton key="logo"
                                   click_handler={(event) => {
                                       navigate(`..//`);
                                   }}
                        >
                            <Stack direction="row" alignItems="center">
                                <SteamIcon sx={{mr: 1, color: "text.primary", fontSize: 40}}/>
                                <Typography
                                    variant="navLinkBold"
                                    color="text.primary"
                                    noWrap
                                    sx={{
                                        display: {xs: 'none', md: 'flex'},
                                        letterSpacing: '.1rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    AnySoft
                                </Typography>
                            </Stack>
                        </NavButton>
                        {
                            isActiveSearchField ?
                                null
                                :
                                <div style={{display: "flex"}}>
                                    <NavButton key="menu"
                                               ref={menuAnchor}
                                               mouse_enter_handler={(event) => {
                                                   setIsMenuOpen(true)
                                               }}
                                               mouse_leave_handler={handleMenuClose}
                                               click_handler={(event) => {
                                                   navigate("../shop");
                                                   setIsMenuOpen(false);
                                               }}
                                    >
                                        <Typography className="NavLinkText"
                                                    textAlign="center"
                                                    variant="navLink"
                                                    color="text.primary">
                                            Shop
                                        </Typography>
                                    </NavButton>
                                    <NavGameMenu
                                        isMenuOpen={isMenuOpen}
                                        menuAnchor={menuAnchor}
                                        handleClose={handleMenuClose}
                                    />
                                    <NavButton key="community"
                                               click_handler={(event) => {
                                                   console.log("Community")
                                               }}
                                    >
                                        <Typography className="NavLinkText"
                                                    textAlign="center"
                                                    variant="navLink"
                                                    color="text.primary">
                                            Community
                                        </Typography>
                                    </NavButton>
                                    <NavButton key="aboutUs"
                                               click_handler={(event) => {
                                                   console.log("About Us")
                                               }}
                                    >
                                        <Typography className="NavLinkText"
                                                    textAlign="center"
                                                    variant="navLink"
                                                    color="text.primary">
                                            About us
                                        </Typography>
                                    </NavButton>
                                </div>
                        }
                    </Stack>
                    <Box sx={{flexGrow: 1}}/>
                    <NavSearch
                        is_active_seach_field={isActiveSearchField}
                        set_is_active_seach_field={setIsActiveSearchField}
                    />
                    {
                        isActiveSearchField ?
                            <Box sx={{flexGrow: 1}}/>
                            :
                            null
                    }
                    {isLoggedIn ?
                        <NavProfile/>
                        :
                        <NavProfileUnAuth/>
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}