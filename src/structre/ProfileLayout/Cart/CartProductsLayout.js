import React, {memo, useContext, useMemo} from "react";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../utils/ClipPathCaluculationsScript";
import {Box, Typography} from "@mui/material";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import {CardBackground} from "../components/CardBackground";
import {CardImage} from "../components/CardImage";
import Discount from "../../components/Discount";
import {MyButton} from "../../components/MyButton";
import {useNavigate} from "react-router-dom";

export const CartProductsLayout = memo(function CartProductLayout({
                                                                      width,
                                                                      height,
                                                                      angle,
                                                                      offset,
                                                                      borderWidth,
                                                                      cardImageWidth,
                                                                  }) {
    const {user: {shoppingCart}} = useContext(UserContext),
        {setters: {setCart}} = useContext(UserFunctionsContext);

    const navigate = useNavigate();

    const cardBackgroundCoordinates = useMemo(() => coordinatesOfBlock(
        [0, 0],
        [width, height],
        calculateOffsetForCard(
            {
                angle,
                height,
                width,
                offset,
            }
        ),
        angle), [width, height, angle, offset])

    const cardImageCoordinates = useMemo(() => coordinatesOfBlock(
        [0, 0],
        [cardImageWidth, height],
        calculateOffsetForCard(
            {
                angle,
                height,
                width: cardImageWidth,
                offset,
            }
        ),
        angle), [cardImageWidth, height, angle, offset])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2
            }}
        >
            {
                shoppingCart.length !== 0 ?
                    <>
                        {
                            shoppingCart.map((element, index) =>
                                <CardBackground
                                    key={index}
                                    width={width}
                                    height={height}
                                    coordinates={cardBackgroundCoordinates}
                                    borderWidth={borderWidth}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate(`/product/${element.id}`)}
                                >
                                    <Box
                                        sx={{
                                            display: "flex"
                                        }}
                                    >
                                        <CardImage
                                            width={cardImageWidth}
                                            height={height}
                                            coordinates={cardImageCoordinates}
                                            image={element.images[0]}
                                        />
                                        <Box
                                            sx={{
                                                mt: 1,
                                                mx: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                                flexGrow: 1,
                                            }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "start",
                                                    flexGrow: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="navLink"
                                                    color="text.primary"
                                                >
                                                    {element.name}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: "center",
                                                        gap: '10px'
                                                    }}
                                                >
                                                    {!element.discount ?
                                                        null
                                                        :
                                                        <Discount
                                                            variant="cost14"
                                                        >
                                                            {element.discount}
                                                        </Discount>
                                                    }
                                                    <Typography
                                                        variant="cost18"
                                                        color="tertiary.main"
                                                    >
                                                        ${element.cost * (100 - element.discount) / 100}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:"end"
                                                }}
                                            >
                                                <MyButton
                                                    height="59px"
                                                    angle={angle}
                                                    main_color={"#FC7872"}
                                                    hover_color={"#E85100"}
                                                    click_handler={() => {
                                                        setCart(element)
                                                    }}
                                                    style={{
                                                        marginRight: "-15px",
                                                        padding: 0
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body14"
                                                        color="text.primary"
                                                        sx={{
                                                            px: 5
                                                        }}
                                                    >
                                                        Delete
                                                    </Typography>
                                                </MyButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardBackground>
                            )
                        }
                    </>
                    :
                    <Typography
                        variant="h2"
                        color="text.primary"
                    >
                        No products
                    </Typography>
            }
        </Box>
    )
})