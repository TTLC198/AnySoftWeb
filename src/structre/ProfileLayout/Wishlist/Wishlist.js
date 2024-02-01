import React, {memo, useEffect, useRef, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {CartProductsLayout} from "../Cart/CartProductsLayout";
import {WishlistProductsLayout} from "./WishlistProductsLayout";

export const Wishlist = memo(function Wishlist({...rest}) {

    const [cardWidth, setCardWidth] = useState(0);

    const cardHeight = 150,
        cardAngle = -1 * Math.PI / 4,
        cardOffset = 40,
        cardBorderWidth = 2,
        cardImageWidth = (cardHeight - cardBorderWidth * 2) / 0.5625,
        cardImageHeight = cardHeight - cardBorderWidth * 2;

    const cardWidthRef = useRef(null);

    useEffect(() => {
        if (cardWidthRef.current) {
            setCardWidth(cardWidthRef.current.offsetWidth)
        }
    }, [cardWidthRef.current])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 2,
                px: 4,
                py: 3
            }}
        >
            <Typography
                variant="h2_64"
                color="text.tertiary"
            >
                Wishlist
            </Typography>
            <Grid
                container
                sx={{
                    gap: 4
                }}
            >
                <Grid item xs={12} ref={cardWidthRef}>
                    <WishlistProductsLayout
                        width={cardWidth}
                        height={cardHeight}
                        angle={cardAngle}
                        offset={cardOffset}
                        borderWidth={cardBorderWidth}
                        cardImageWidth={cardImageWidth}
                        cardImageHeight={cardImageHeight}
                    />
                </Grid>
            </Grid>
        </Box>
    )
})