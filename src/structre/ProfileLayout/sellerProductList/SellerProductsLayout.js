import React, {memo, useMemo} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../utils/ClipPathCaluculationsScript";
import {CardImage} from "../components/CardImage";
import Discount from "../../components/Discount";
import {MyButton} from "../../components/MyButton";
import {CardBackground} from "../components/CardBackground";

export const SellerProductsLayout = memo(({
                                              products,
                                              width,
                                              height,
                                              angle,
                                              offset,
                                              borderWidth,
                                              cardImageWidth,
                                              cardImageHeight,
                                              deleteProduct
                                          }) => {

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
        [cardImageWidth, cardImageHeight],
        calculateOffsetForCard(
            {
                angle,
                height: cardImageHeight,
                width: cardImageWidth,
                offset: offset - 1,
            }
        ),
        angle), [cardImageWidth, cardImageHeight, angle, offset])

    return (
        <Stack
            spacing={2}
        >
            {
                products.map((element, index) =>
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
                                height={cardImageHeight}
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
                                        justifyContent: "end"
                                    }}
                                >
                                    <MyButton
                                    height="56px"
                                    angle={angle}
                                    main_color={"#45A29E"}
                                    hover_color={"#66FCF1"}
                                    style={{
                                        marginRight: "-30px",
                                        padding: 0
                                    }}
                                    click_handler={() => navigate("/profile/sellerProducts/change", {state: element})}
                                >
                                    <Typography
                                        variant="body14"
                                        color="text.primary"
                                        sx={{
                                            px: 5
                                        }}
                                    >
                                        Change
                                    </Typography>
                                </MyButton>
                                    <MyButton
                                        height="56px"
                                        angle={angle}
                                        main_color={"#FC7872"}
                                        hover_color={"#E85100"}
                                        style={{
                                            marginRight: "-18px",
                                            padding: 0
                                        }}
                                        click_handler={() => deleteProduct(element.id)}
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
        </Stack>
    )
})