import {Box, Typography} from "@mui/material";
import {SwiperCard} from "./SwiperCard";
import React, {memo} from "react";
import '../css/SwiperStyle.css';
import {useCarousel} from "use-carousel-hook";
import SwiperArrowLeft from "./SwiperArrowLeft";
import SwiperArrowRight from "./SwiperArrowRight";
import {calculateOffsetForSwiper, coordinatesOfBlock} from "../../../../utils/ClipPathCaluculationsScript";
import _ from "lodash";

export const SwiperGeneral = memo(function SwiperGeneral(props) {

    const {ref, previous, next, setCurrent, current} = useCarousel();

    const offset = (props.height) / Math.tan(Math.abs(props.angle)),
        width = (props.width + offset * (props.quantity - 1)) / props.quantity;

    const coordinates = coordinatesOfBlock(
        [0, 0],
        [width, props.height],
        calculateOffsetForSwiper(
            {
                angle: props.angle,
                height: props.height,
                width: width,
            }
        ),
        props.angle);


    return (
        <Box
            sx={{
                width: props.width,
                minHeight: props.height,
            }}
            {...props}
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
                    {props.name}
                </Typography>
                <ul className="carousel-indicators">
                    {props.products.slice(0, props.products.length - (props.quantity - 1)).map((_, index) => (
                        <li
                            onClick={() => setCurrent(index)}
                            key={index}
                            className={`${current === index ? "active" : ""}`}
                        />
                    ))}
                </ul>
            </Box>
            <div
                style={{
                    width: props.width,
                    height: props.height,
                    position: "absolute",
                    marginTop: 15
                }}
            >
                <SwiperArrowLeft offset={offset} height={props.height} on_click={previous}/>
                <ul ref={ref} className="carousel-list">
                    {
                        props.products.map((element, index) => {
                            return (
                                <li className="carousel-item"
                                    key={element.id}
                                    style={{marginLeft: `${-offset}px`}}
                                >
                                    <SwiperCard
                                        z_index={1000 - index}
                                        angle={props.angle}
                                        width={Math.round(width)}
                                        coordinates={coordinates}
                                        height={props.height}
                                        product={element}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
                <SwiperArrowRight offset={offset} height={props.height} on_click={next}/>
            </div>
        </Box>

    )
}, (prevProps, nextProps) => {
    if (prevProps.height !== nextProps.height || prevProps.width !== nextProps.width || prevProps.offset !== nextProps.offset || prevProps.quantity !== nextProps.quantity)
        return false
    else {
        return _.differenceBy(prevProps.products, nextProps.products, 'id').length === 0;
    }
})