import React, {memo, useContext} from "react";
import {UserContext} from "../ShopSection/UserContext";
import {useNavigate} from "react-router-dom";
import {Badge, Box, IconButton, Typography} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {MyButton} from "../components/MyButton";
import {NavButton} from "./NavButton";

export const NavProfileUnAuth = memo(function NavProfileUnAuth() {
    const {user: {shoppingCart}} = useContext(UserContext),
        navigate = useNavigate();

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <IconButton
                    onClick={() => navigate("/profile/cart")}
                >
                    <Badge color="secondary" badgeContent={shoppingCart.length} sx={{color: 'text.primary'}}>
                        <ShoppingCartOutlinedIcon fontSize='large' sx={{color: '#FAFAFA'}}/>
                    </Badge>
                </IconButton>
                <MyButton
                    height="53px"
                    style={{
                        padding: 0
                    }}
                    click_handler={() => navigate("/authorization/signin")}
                >
                    <Typography className="NavLinkText"
                                textAlign="center"
                                variant="navLink"
                                color="text.primary">
                        Sign in
                    </Typography>
                </MyButton>
                <NavButton
                    click_handler={() => navigate("/authorization/signup")}
                >
                    <Typography className="NavLinkText"
                                textAlign="center"
                                variant="navLink"
                                color="text.primary">
                        Sign up
                    </Typography>
                </NavButton>
            </Box>
        </React.Fragment>
    )
})