import {Box, Typography} from "@mui/material";
import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import Discount from "../../components/Discount";
import {Link, useNavigate} from "react-router-dom";
import {MyButton} from "../../components/MyButton";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import {ProductButton} from "../../components/ProductButton";
import {baseURL} from "../../../generalUtilities";

export const CustomSearchOption = memo(function CustomSearchOption({
                                                                       option,
                                                                       properties,
                                                                       close_input
                                                                   }) {
        const {setters: {setWishlist, setCart}} = useContext(UserFunctionsContext),
            {user: {isLoggedIn, wishlist, shoppingCart}} = useContext(UserContext);

        const navigate = useNavigate();

        const [innerOptionState, setInnerOptionState] = useState(null);

        useEffect(() => {
            setInnerOptionState(option);
            setTimeout(() => { debugger; }, 1000);
        }, [option]);

        const handleCartClick = useCallback((product) => {
            setInnerOptionState({
                ...product,
                status: product.status === "cart" ? "none" : "cart"
            })
            setCart(product);
        }, [shoppingCart]);

        return (
            <>
                {
                    innerOptionState &&
                    <Box component="li"
                         {...properties}
                         style={{
                             display: "flex",
                             justifyContent: "space-between"
                         }}
                         onClick={() => {
                             navigate(`../product/${option.id}`);
                             close_input(false);
                         }}
                    >
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Box
                                style={{
                                    background: `url(${baseURL + option.images[0]})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    height: "50px",
                                    width: "60px"
                                }}
                            />
                            <Typography
                                variant="navLinkMenu"
                                color="text.black"
                                sx={{ml: 2}}
                            >
                                {option.name}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {
                                option.status !== "owned" &&
                                <>
                                    {option.discount !== 0 &&
                                        <Discount
                                            variant="navLink12"
                                        >
                                            {option.discount}
                                        </Discount>
                                    }
                                    <Typography
                                        variant="navLink12"
                                        color="secondary.main"
                                    >
                                        ${option.cost * (100 - option.discount) / 100}
                                    </Typography>
                                </>
                            }


                            <ProductButton
                                height="43px"
                                textVariant="navLink14"
                                product={innerOptionState}
                                cart_setter={handleCartClick}
                                style={{
                                    padding: 0
                                }}
                            />
                        </Box>
                    </Box>
                }
            </>
        )
    }
)