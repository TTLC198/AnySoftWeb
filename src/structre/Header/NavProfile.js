import React, {useContext, useRef, useState} from "react";
import {Avatar, Badge, Box, IconButton, MenuItem, MenuList, Typography} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import {Logout} from "@mui/icons-material";
import Button from "@mui/material/Button";
import NavMenu from "./NavMenu";
import MenuProfileItem from "./components/MenuProfileItem";
import LibraryIcon from "../components/Icons/LibraryIcon";
import {AuthContext} from "../Auth/useAuth";
import {UserContext} from "../ShopSection/UserContext";
import {useNavigate} from "react-router-dom";
import {baseURL} from "../../generalUtilities";

export default function NavProfile() {
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const profileAnchor = useRef(null);
    const {logout} = useContext(AuthContext);
    const {user: {user, shoppingCart, notifications, wishlist}} = useContext(UserContext);
    const navigate = useNavigate();

    function handleMouseEnter() {
        setIsProfileExpanded(true)
    }

    function handleClose() {
        setIsProfileExpanded(false)
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', gap: "10px"}}>
                <IconButton
                    onClick={() => navigate("/profile/cart")}
                >
                    <Badge color="secondary" badgeContent={shoppingCart.length} sx={{color: 'text.primary'}}>
                        <ShoppingCartOutlinedIcon fontSize='large' sx={{color: '#FAFAFA'}}/>
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={() => navigate("/profile/wishlist")}
                >
                    <Badge color="secondary" badgeContent={wishlist.length} sx={{color: 'text.primary'}}>
                        <FavoriteBorderOutlinedIcon fontSize='large' sx={{color: '#FAFAFA'}}/>
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={() => navigate("/profile/notifications")}
                >
                    <Badge color="secondary" badgeContent={notifications.length}
                           sx={{color: 'text.primary'}}>
                        <NotificationsNoneIcon fontSize='large' sx={{color: '#FAFAFA'}}/>
                    </Badge>
                </IconButton>
                <Button
                    ref={profileAnchor}
                    component="div"
                    onClick={()=>navigate("/profile")}
                    onMouseEnter={handleMouseEnter}
                >
                    {
                        user.image === "" ?
                            <Avatar sx={{width: 32, height: 32}}>
                                {user.login[0]}
                            </Avatar>
                            :
                            <Avatar sx={{width: 32, height: 32}} src={baseURL + user.image}/>
                    }
                </Button>
            </Box>
            <NavMenu
                isMenuOpen={isProfileExpanded}
                menuAnchor={profileAnchor}
                handleClose={handleClose}
                handleListKeyDown={(event) => {
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        handleClose(event);
                    } else if (event.key === 'Escape') {
                        handleClose(event);
                    }
                }}
                placement="bottom"
            >

                <Box>
                    <MenuList
                        id="composition-menu"
                        sx={{
                            p: 0,
                            bgcolor: 'accent.first',
                            boxShadow: 6,
                            border: 2,
                            borderColor: 'accent.second',
                        }}
                    >
                        <MenuItem
                            sx={{
                                py: 2,
                                px: 1,
                                "& .MuiTouchRipple-root": {
                                    display: "none",
                                    cursor: "auto"
                                }
                            }}
                            style={{
                                background: "linear-gradient(272.66deg, rgba(255, 0, 212, 0.5) -2.19%, rgba(0, 221, 255, 0.5) 101.11%)"
                            }}
                        >
                            <Box>
                                {
                                    user.image === "" ?
                                        <Avatar sx={{
                                            width: 100,
                                            height: 100,
                                            boxShadow: "0px 0px 5px 3px rgba(0, 0, 0, 0.4)",
                                        }}>
                                            {user.login[0].toUpperCase()}
                                        </Avatar>
                                        :
                                        <Avatar sx={{
                                            width: 100,
                                            height: 100,
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
                                            variant="body20"
                                            color="text.primary">
                                    status
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuProfileItem
                            onClick={()=> {
                                handleClose();
                                navigate("/profile/");
                            }}
                        >
                            <Avatar sx={{color: "secondary.main", mr: "5px"}}/>
                            <Typography className="ProfileText"
                                        textAlign="center"
                                        variant="navLinkMenu"
                                        color="text.black">
                                Account information
                            </Typography>
                        </MenuProfileItem>
                        <MenuProfileItem
                            onClick={()=> {
                                handleClose();
                                navigate("/profile/passwordChange");
                            }}
                        >
                            <LockTwoToneIcon sx={{color: "secondary.main", ml: "6px", mr: 1, fontSize: 30,}}/>
                            <Typography className="ProfileText"
                                        textAlign="center"
                                        variant="navLinkMenu"
                                        color="text.black">
                                Change password
                            </Typography>
                        </MenuProfileItem>
                        <MenuProfileItem
                            onClick={()=> {
                                handleClose();
                                navigate("/profile/library");
                            }}
                        >
                            <LibraryIcon sx={{color: "secondary.main", ml: "6px", mr: 1, fontSize: 30}}/>
                            <Typography className="ProfileText"
                                        textAlign="center"
                                        variant="navLinkMenu"
                                        color="text.black">
                                Library
                            </Typography>
                        </MenuProfileItem>
                        <MenuProfileItem
                            onClick={()=> {
                                logout();
                                handleClose();
                            }}
                        >
                            <Logout sx={{color: "accent.danger", fontSize: 30, mx: 1}}/>
                            <Typography className="ProfileText"
                                        textAlign="center"
                                        variant="navLinkMenu"
                                        color="text.black">
                                Logout
                            </Typography>
                        </MenuProfileItem>
                    </MenuList>
                </Box>
            </NavMenu>
        </React.Fragment>
    )
}
