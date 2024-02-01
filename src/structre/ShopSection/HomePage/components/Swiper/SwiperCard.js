import React, {forwardRef, useContext, useEffect, useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {SwiperProductCardImage} from "./SwiperProductCardImage";
import Discount from "../../../../components/Discount";
import {MyButton} from "../../../../components/MyButton";
import {Link, useNavigate} from "react-router-dom";
import MyRating from "../../../../components/MyRating";
import {UserContext, UserFunctionsContext} from "../../../UserContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {ProductButton} from "../../../../components/ProductButton";

export const SwiperCard = forwardRef(({
                                          product,
                                          width,
                                          height,
                                          angle,
                                          coordinates,
                                          z_index,
                                          ...rest
                                      }, ref) => {
    const {setters: {setWishlist, setCart}} = useContext(UserFunctionsContext),
        {user: {isLoggedIn}} = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: width,
                height: height,
                zIndex: z_index,
                cursor: "pointer"
            }}
            {...rest}
        >
            {
                product &&
                <SwiperProductCardImage
                    image_url={product.images[0]}
                    width={width}
                    height={height}
                    coordinates={coordinates}
                    onClick={() => {
                        navigate(`../product/${product.id}`)
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            top: `${height - 120}px`,
                            left: "50px",
                            width: Math.round(width - height / Math.tan(Math.abs(angle)) - 35),

                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="body20"
                                color="text.tertiary"
                            >
                                {product.name}
                            </Typography>
                            <MyRating
                                width={100}
                                gap={5}
                                grade={product.rating}
                                max_grade={5}
                                color={"#E85100"}
                                borderWidth={0.5}
                                name={`Swiper_Card_${product.id}_`}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "end",
                            }}
                        >
                            {
                                product.status !== "owned" &&
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: '10px'
                                }}>
                                    {product["discount"] &&
                                        <Discount
                                            variant="cost14"
                                        >
                                            {product["discount"]}
                                        </Discount>
                                    }
                                    <Typography
                                        variant="cost18"
                                        color="tertiary.main"
                                    >
                                        ${product["cost"] * (100 - product["discount"]) / 100}
                                    </Typography>
                                </Box>
                            }
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
                                                    fontSize: 35
                                                }}
                                            />
                                            :
                                            <FavoriteBorderIcon
                                                sx={{
                                                    color: "secondary.main",
                                                    fontSize: 35
                                                }}
                                            />
                                    }
                                </IconButton>
                            }

                            <ProductButton
                                height="53px"
                                product={product}
                                cart_setter={setCart}
                                style={{
                                    justifyContent: "start",
                                    padding: 0
                                }}
                            />
                        </Box>
                    </Box>
                </SwiperProductCardImage>
            }
        </Box>
    )
})