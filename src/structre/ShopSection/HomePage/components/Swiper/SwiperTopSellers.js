import {Box, Grid, IconButton, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import '../css/SwiperStyle.css';
import {useCarousel} from "use-carousel-hook";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../../../utils/ClipPathCaluculationsScript";
import ArrowIcon from "../../../../components/Icons/ArrowIcon";
import {PrefilledProductCard} from "../../../../components/PrefilledProductCard";

export default function SwiperTopSellers(props) {
    const {ref, previous, next, setCurrent, current} = useCarousel();

    const cardHeight = Math.round(props.height / props.rows),
        cardWidth = Math.round(1.6 * cardHeight);

    const [carouselWidth, setCarouselWidth] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setCarouselWidth(ref.current.clientWidth);
        }
    }, [carouselWidth, ref.current])

    const coordinates = coordinatesOfBlock(
        [0, 0],
        [cardWidth, cardHeight],
        calculateOffsetForCard(
            {
                angle: props.angle,
                height: cardHeight,
                width: cardWidth,
                offset: props.offset,
            }
        ),
        props.angle);

    return (
        <Box
            sx={{
                width: props.width,
                minHeight: props.height,
            }}
        >
            <Box
                sx={{
                    width: props.width,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    variant={"h2_64"}
                    sx={{
                        color: "secondary.main",
                        marginLeft: 4
                    }}
                >
                    Top Sellers
                </Typography>
                <ul className="carousel-indicators-topSeller">
                    {props.genres.slice(0, props.genres.length).map((element, index) => (
                        <li
                            onClick={() => setCurrent(index)}
                            key={index}
                            className={`${current === index ? "active" : ""}`}
                        >
                            <Typography
                                variant="h2"
                            >
                                {element.name}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Box>
            <div
                style={{
                    width: props.width,
                    height: props.height,
                    marginTop: 45,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <IconButton onClick={() => previous()}>
                    <ArrowIcon
                        sx={{
                            color: "#fafafa",
                            fontSize: 60,
                            p: 0,
                        }}
                    />
                </IconButton>
                <div ref={ref} className="carousel-list" style={{position:"none"}}>
                    {
                        props.genres.map((element, index) => {
                            return (
                                <Grid
                                    key={index}
                                    container
                                    sx={{
                                        minHeight: props.height,
                                        minWidth: carouselWidth,
                                    }}
                                >
                                    {
                                        props.products[element.id].map((element, index) => {
                                            return (
                                                <Grid
                                                    key={index}
                                                    sx={{
                                                        mx: 2,
                                                        my: 2,
                                                    }}
                                                >
                                                    <PrefilledProductCard
                                                        key={index}
                                                        height={cardHeight}
                                                        width={cardWidth}
                                                        coordinates={coordinates}
                                                        product={element}
                                                        width_scale={1.2}
                                                        height_scale={1.85}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                </Grid>
                            )
                        })
                    }
                </div>
                <IconButton onClick={() => next()}>
                    <ArrowIcon
                        sx={{
                            color: "#fafafa",
                            fontSize: 60,
                            p: 0,
                            transform: "rotate(180deg)",
                        }}
                    />
                </IconButton>
            </div>
        </Box>
    )
}