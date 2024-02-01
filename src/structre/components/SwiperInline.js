import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {ProductCard} from "./ProductCard";
import React from "react";
import {Typography} from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./css/SwiperInline.css"

export function SwiperInline(props) {
    return (
        <div className="mySwiper" style={{marginBottom:"5vh"}}>
            <div className="SwiperHeader">
                <Typography
                    className="SwiperName"
                    variant="h3"
                    color="text.secondary"
                >
                    {props.name}
                </Typography>
                <Typography className="SwiperPagination"></Typography>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={44}
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
            >
                {props.images["product"].map((element) => {
                    return (
                        <SwiperSlide>
                            <ProductCard
                                className={"card"}
                                name={element["name"]}
                                rating={element["rating"]}
                                cost={element["cost"]}
                                discount={element["discount"]}
                                imgsource={element["photosPath"][0]}
                                key={element["id"]}
                                width="28rem"
                                height="18rem"
                            >
                            </ProductCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
