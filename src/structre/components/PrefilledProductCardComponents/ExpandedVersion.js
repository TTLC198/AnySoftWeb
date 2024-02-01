import {Box, IconButton, Typography} from "@mui/material";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../utils/ClipPathCaluculationsScript";
import {useCarousel} from "use-carousel-hook";
import Button from "@mui/material/Button";
import WindowsIcon from "../Icons/WindowsIcon";
import MyRating from "../MyRating";
import React, {useCallback, useContext, useEffect, useState} from "react";
import TiltedBox from "../TiltedBox";
import Discount from "../Discount";
import {MyButton} from "../MyButton";
import {ProductButton} from "../ProductButton";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import {useNavigate} from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {baseURL} from "../../../generalUtilities";

const tags = [
    "Sound",
    "Immersion"
];

export default function ExpandedVersion(props) {
    //console.log(props);
    const width = props.collapsed_element.offsetWidth * props.width_multiplier,
        height = props.collapsed_element.offsetHeight * props.height_multiplier,
        offsetLeft = props.collapsed_element.offsetLeft - (props.collapsed_element.offsetWidth * props.width_multiplier / 2 - props.collapsed_element.offsetWidth / 2),
        offsetTop = props.collapsed_element.offsetTop - (props.collapsed_element.offsetHeight * props.height_multiplier / 2 - props.collapsed_element.offsetHeight / 2);

    const navigate = useNavigate();

    const {setters: {setWishlist, setCart}} = useContext(UserFunctionsContext),
        {user: {isLoggedIn, wishlist, shoppingCart}} = useContext(UserContext);

    const handleCartClick = useCallback((product) => {
        setCart(product);
    }, [shoppingCart]);

    const handleWishlistClick = useCallback((product) => {
        setWishlist(product);
    }, [wishlist])

    const coordinates = coordinatesOfBlock(
        [0, 0],
        [width, height],
        calculateOffsetForCard(
            {
                angle: props.angle,
                height: height,
                width: width,
                offset: props.offset,
            }
        ),
        props.angle);

    const clipPath =
        `polygon(
        ${Math.round(coordinates[0].X / width * 100)}% 0, 
        100% 0, 
        100% ${Math.round(coordinates[2].Y / height * 100)}%, 
        ${Math.round(coordinates[3]?.X / width * 100)}% 100%, 
        0 100%, 
        0 ${Math.round(coordinates[5]?.Y / height * 100)}%
        )`;

    const imageHeight = Math.round(width * 0.5625);

    return (
        <Box
            sx={{
                position: "absolute",
                left: offsetLeft,
                top: offsetTop,
                zIndex: props.is_hover && 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                width: width,
                height: height,
                clipPath: clipPath,
                bgcolor: props.border_color || "secondary.main",
            }}

            onMouseLeave={() => props.set_hover_state(false)}
            onClick={() => {
                navigate(`../product/${props.product.id}`)
            }}
        >
            {
                props.product &&
                <Box
                    sx={{
                        width: width - 4,
                        height: height - 4,
                        clipPath: clipPath,
                        bgcolor: "primary.secondary",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "flex-start",
                        flexWrap: "no-wrap",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            width: Math.round(width - 4),
                            height: imageHeight,
                        }}
                    >
                        <Box
                            sx={{
                                width: Math.round(width - 4),
                                height: imageHeight,
                                background: `url(${baseURL + props.product.images[0]}) center center / cover no-repeat`
                            }}
                        />
                    </Box>
                    <Box
                        sx={{

                            display: "flex",
                            flexDirection: "column",
                            mt: 1,
                            mx: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body20"
                                color="text.tertiary"
                            >
                                {props.product.name}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex"
                                }}
                            >
                                <WindowsIcon/>
                                <WindowsIcon/>
                                <WindowsIcon/>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}
                            >

                                <Typography
                                    variant="body18"
                                    sx={{
                                        color: "accent.danger"
                                    }}
                                >
                                    {Math.round((props.product.rating + Number.EPSILON) * 100) / 100}
                                </Typography>
                                <MyRating
                                    width={120}
                                    gap={5}
                                    grade={props.product.rating}
                                    max_grade={5}
                                    color={"#E85100"}
                                    borderWidth={0.5}
                                    name={`Comment_${props.product.id}`}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                            }}
                        >
                            <Typography
                                variant="body14"
                                color="text.primary"
                                sx={{
                                    mr: 1
                                }}
                            >
                                Genres:
                            </Typography>
                            <Typography
                                variant="body14"
                                color="text.secondary"
                            >
                                {props.product.genres.map(element => element.name).join(", ")}
                            </Typography>

                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                mt: 2
                            }}
                        >
                            {
                                props.product.status !== "owned" &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        gap: '10px'
                                    }}
                                >
                                    {
                                        props.product.discount !== 0 &&
                                        <Discount
                                            variant="cost14"
                                        >
                                            {props.product["discount"]}
                                        </Discount>
                                    }
                                    <Typography
                                        variant="cost18"
                                        color="tertiary.main"
                                    >
                                        ${props.product["cost"] * (100 - props.product["discount"]) / 100}
                                    </Typography>
                                </Box>
                            }
                            {
                                isLoggedIn &&
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleWishlistClick(props.product);
                                    }}
                                >
                                    {
                                        props.product["isInWishlist"] ?
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
                                angle={props.angle}
                                product={props.product}
                                cart_setter={handleCartClick}
                                padding_x={"15px"}
                            />
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}