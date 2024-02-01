import {Box, IconButton, Typography} from "@mui/material";
import Discount from "../../../../components/Discount";
import React, {memo, useContext, useEffect, useState} from "react";
import MyRating from "../../../../components/MyRating";
import {ProductButton} from "../../../../components/ProductButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {UserContext, UserFunctionsContext} from "../../../UserContext";

export const MainTextElement = memo(function MainTextElement(props) {
    const {setters: {setWishlist, setCart}} = useContext(UserFunctionsContext),
        {user: {isLoggedIn, wishlist, shoppingCart, ownedProducts}} = useContext(UserContext);

    const [innerProductState, setInnerProductState] = useState(null);

    useEffect(() => {
        setInnerProductState(props.product);
    }, [props.product])

    useEffect(() => {
        if (wishlist.map((item) => item.id).includes(innerProductState?.id)) {
            setInnerProductState((prevState) => ({
                ...prevState,
                isInWishlist: true
            }))
        } else {
            setInnerProductState((prevState) => ({
                ...prevState,
                isInWishlist: false
            }))
        }
    }, [wishlist, innerProductState?.id])

    useEffect(() => {
        if (ownedProducts.includes(innerProductState?.id)) {
            setInnerProductState((prevState) => ({
                ...prevState,
                status: "owned"
            }))
        } else if (shoppingCart.map((item) => item.id).includes(innerProductState?.id)) {
            setInnerProductState((prevState) => ({
                ...prevState,
                status: "cart"
            }))
        } else {
            setInnerProductState((prevState) => ({
                ...prevState,
                status: "none"
            }))
        }
    }, [shoppingCart, innerProductState?.id])

    return (
        <>
            {
                innerProductState &&
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        gap: "15px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >

                        {innerProductState.status !== "owned" &&
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: "center",
                                gap: '10px'
                            }}>
                                {innerProductState["discount"] ?
                                    <Discount
                                        variant="cost18"
                                    >
                                        {innerProductState["discount"]}
                                    </Discount>
                                    :
                                    null
                                }
                                <Typography
                                    variant="cost24"
                                    color="tertiary.main"
                                >
                                    ${innerProductState["cost"] * (100 - innerProductState["discount"]) / 100}
                                </Typography>
                            </Box>
                        }
                    </Box>

                    <Typography
                        variant="body30"
                        color="text.primary"
                    >
                        {innerProductState.name}
                    </Typography>
                    <MyRating
                        width={170}
                        gap={5}
                        grade={innerProductState.rating}
                        max_grade={5}
                        color={"#E85100"}
                        borderWidth={0.5}
                        name={`TextElement_`}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "15px"
                        }}
                    >
                        <ProductButton
                            height="53px"
                            product={innerProductState}
                            cart_setter={setCart}
                            style={{justifyContent: "start", padding: 0, margin: "0 auto 0 0"}}
                        />

                        {
                            isLoggedIn &&

                            <IconButton
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setWishlist(innerProductState);
                                }}
                            >
                                {
                                    innerProductState["isInWishlist"] ?
                                        <FavoriteIcon
                                            sx={{
                                                color: "tertiary.main",
                                                fontSize: 40
                                            }}
                                        />
                                        :
                                        <FavoriteBorderIcon
                                            sx={{
                                                color: "secondary.main",
                                                fontSize: 40
                                            }}
                                        />
                                }
                            </IconButton>
                        }
                    </Box>
                </Box>
            }
        </>
    )
})