import {Box, IconButton, Typography} from "@mui/material";
import React, {useState} from "react";
import '../css/SwiperStyle.css';
import {useCarousel} from "use-carousel-hook";
import SwiperFeaturedSectionCard from "./SwiperFeaturedSectionCard";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../../../utils/ClipPathCaluculationsScript";
import ArrowIcon from "../../../../components/Icons/ArrowIcon";

export default function SwiperFeaturedSection(props) {
    const [filteredSections, setFilteredSections] = useState(props.sections);
    const {ref, previous, next, setCurrent, current} = useCarousel();

    const width = Math.round(0.6 * props.height);

    const coordinates = coordinatesOfBlock(
        [0, 0],
        [width, props.height],
        calculateOffsetForCard(
            {
                angle: props.angle,
                height: props.height,
                width: width,
                offset: props.offset,
            }
        ),
        props.angle);
    function sectionTimeOut(sectionId) {
        let indexToDelete = filteredSections.findIndex(object => object.id === sectionId);
        if (indexToDelete !== -1) {
            setFilteredSections(filteredSections.slice(0, indexToDelete).concat(filteredSections.slice(indexToDelete + 1)));
        }
    }

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
                    Featured Sections
                </Typography>
                <ul className="carousel-indicators">
                    {filteredSections.slice(0, filteredSections.length - 3).map((_, index) => (
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
                    marginTop: 15,
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
                <ul ref={ref} className="carousel-list" style={{gap: 33}}>
                    {
                        filteredSections.map((element, index) => {
                            return (
                                <li
                                    key={element.id}
                                    style={{}}
                                >
                                    <SwiperFeaturedSectionCard
                                        z_index={1000 - index}
                                        width={width}
                                        height={props.height}
                                        coordinates={coordinates}
                                        section={element}
                                        on_section_time_out={sectionTimeOut}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
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