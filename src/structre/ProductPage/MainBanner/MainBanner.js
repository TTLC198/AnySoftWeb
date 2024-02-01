import {Box, IconButton, Typography} from "@mui/material";
import Price from "../Price";
import Discount from "../Discount";
import {MyButton} from "../../components/MyButton";
import MyRating from "../../components/MyRating";
import React, {useContext, useEffect, useState} from "react";
import {ProductButton} from "../../components/ProductButton";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {baseURL} from "../../../generalUtilities";

export default function MainBanner({
                                       width,
                                       product,
                                       current
                                   }) {
    const height = Math.round(0.5625 * width);

    const {setters: {setWishlist, setCart}} = useContext(UserFunctionsContext),
        {user: {isLoggedIn}} = useContext(UserContext);

    return (
        <Box
            sx={{
                height: height,
                width: width,
                mb: 5
            }}
        >
            <div
                style={{
                    height: height,
                    width: width,
                    background: `radial-gradient(59.15% 59.15% at 55.19% 14.55%, rgba(0, 0, 0, 0) 51.56%, rgba(0, 0, 0, 0.5) 100%),url(${baseURL + product.images[current]}) center center / cover no-repeat`,
                    position: "absolute"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "40px",
                        left: "70px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            marginBottom: "-10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <MyRating
                            width={170}
                            gap={5}
                            grade={product.rating}
                            max_grade={5}
                            color={"#E85100"}
                            borderWidth={0.5}
                            name={`Product_`}
                        />
                        <Typography
                            variant="h2_32"
                            sx={{
                                color: "accent.danger"
                            }}
                        >
                            {Math.round((product.rating + Number.EPSILON) * 100) / 100}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h2_64"
                        color="text.primary"
                    >
                        {product.name}
                    </Typography>
                    <Typography
                        variant="body14"
                        color="text.secondary"
                        sx={{
                            my: "-10px"
                        }}
                    >
                        {product.seller.login}
                    </Typography>
                    <Typography
                        variant="h2"
                        color="text.primary"
                        sx={{
                            maxHeight: "75px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: Math.round(2 * width / 5),
                            whiteSpace: "nowrap",
                            display: "inline-block"
                        }}
                    >
                        {product.description}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        {
                            product.status !== "owned" &&
                            <>
                                {
                                    product.discount === 0 ?
                                        <Price
                                            height={53}
                                            angle={-6 * Math.PI / 18}
                                        >
                                            {product.cost}
                                        </Price>
                                        :
                                        <Box
                                            sx={{
                                                display: "flex",
                                            }}
                                        >
                                            <Discount
                                                height={53}
                                                angle={-6 * Math.PI / 18}
                                            >
                                                {product.discount}
                                            </Discount>
                                            <Price
                                                height={53}
                                                angle={-6 * Math.PI / 18}
                                                style={{
                                                    marginLeft: "-32px"
                                                }}
                                            >
                                                {product.cost * (100 - product.discount) / 100}
                                            </Price>
                                        </Box>
                                }
                            </>
                        }
                        <ProductButton
                            height="53px"
                            product={product}
                            cart_setter={setCart}
                            angle={-6 * Math.PI / 18}
                            style={{
                                padding: 0,
                                marginLeft: "-15px"
                            }}
                        />

                        {
                            isLoggedIn &&

                            <IconButton
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setWishlist(product);
                                }}
                            >
                                {
                                    product["isInWishlist"] ?
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
            </div>
        </Box>
    )
}