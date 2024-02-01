import {PrefilledProductCard} from "../components/PrefilledProductCard";
import {Grid} from "@mui/material";
import React, {memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {calculateOffsetForCard, coordinatesOfBlock} from "../utils/ClipPathCaluculationsScript";
import {UserFunctionsContext} from "../ShopSection/UserContext";

export const CardLayout = memo(function CardLayout({
                                                       angle,
                                                       offset,
                                                       products,
                                                       widthScale = 1.6,
                                                       heightScale = 2.6
                                                   }) {
        const {markProducts} = useContext(UserFunctionsContext);

        const [cardWidth, setCardWidth] = React.useState(0),
            [cardHeight, setCardHeight] = useState(0);

        const cardWidthRef = useRef(null);

        const coordinates = coordinatesOfBlock(
            [0, 0],
            [cardWidth, cardHeight],
            calculateOffsetForCard(
                {
                    angle: angle,
                    height: cardHeight,
                    width: cardWidth,
                    offset: offset,
                }
            ),
            angle);

        useEffect(() => {
            if (cardWidthRef.current) {
                setCardWidth(cardWidthRef.current.clientWidth);
                setCardHeight(cardWidthRef.current.clientWidth * 0.5625)
            }
        }, [cardWidth, cardHeight])

        const markedProducts = useMemo(() => {
            return markProducts(products);
        }, [products, markProducts])

        return (
            <Grid
                container
                columns={34}
                justifyContent="space-between"
                rowSpacing={2}
            >
                {markedProducts.length > 0 &&
                    markedProducts.map((element, index) => {
                        return (
                            <Grid
                                key={index}
                                item
                                xs={11}
                                ref={cardWidthRef}
                            >
                                <PrefilledProductCard
                                    width_scale={widthScale}
                                    height_scale={heightScale}
                                    height={cardHeight}
                                    width={cardWidth}
                                    coordinates={coordinates}
                                    product={element}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    },
    (prevProps, nextProps) =>
        prevProps.cardHeight === nextProps.cardHeight
        && prevProps.angle === nextProps.angle
        && prevProps.offset === nextProps.offset
        && prevProps.products.every((element, index) => element.id === nextProps.products[index]?.id)
)