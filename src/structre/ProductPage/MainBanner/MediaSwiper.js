import {Box, IconButton, Typography} from "@mui/material";
import React, {forwardRef} from "react";
import ArrowIcon from "../../components/Icons/ArrowIcon";
import "../../ShopSection/HomePage/components/css/SwiperStyle.css";
import {baseURL} from "../../../generalUtilities";

export const MediaSwiper = forwardRef((props, ref) => {
    const imageHeight = Math.round(props.image_width * 0.8219);

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
                    Media
                </Typography>
            </Box>
            <div
                style={{
                    width: props.width,
                    height: props.height,
                    marginTop: 15,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <IconButton onClick={() => props.previous()}>
                    <ArrowIcon
                        sx={{
                            color: "#fafafa",
                            fontSize: 60,
                            p: 0,
                        }}
                    />
                </IconButton>
                <ul ref={ref} className="carousel-list" style={{alignItems: "center"}}>
                    {
                        props.images.map((element, index) => {
                            return (
                                <li
                                    key={index}
                                    style={{}}
                                >
                                    <Box
                                        onClick={()=>props.set_current(index)}
                                        sx={{
                                            height: imageHeight,
                                            width: props.image_width,
                                            background: `url(${baseURL + element}) center center / cover no-repeat`,
                                            border: props.current === index ? "4px solid #66FCF1" : null,
                                            cursor: "pointer"
                                        }}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
                <IconButton onClick={() => props.next()}>
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
})