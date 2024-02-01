import {Box, Typography} from "@mui/material";
import React from "react";
import Discount from "../../components/Discount";
import {ProductCardImage} from "../../components/ProductCardImage";
import {calculateOffsetForCard, coordinatesOfBlock} from "../../utils/ClipPathCaluculationsScript";
import {Link} from "react-router-dom";

export default function ProductsLayout(props) {
    const width = 250,
        height = 156,
        angle = -Math.PI / 4,
        offset = 50;

    const coordinates = coordinatesOfBlock(
        [0, 0],
        [width, height],
        calculateOffsetForCard(
            {
                angle: angle,
                height: height,
                width: width,
                offset: offset,
            }
        ),
        angle);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            {props.images.map((element) => {
                return (
                    <Link to={`../product/${element.id}`} style={{textDecoration: "none"}} key={element["id"]}>
                        <ProductCardImage
                            image_url={element.images[0]}
                            width={250}
                            height={156}
                            coordinates={coordinates}
                            border_color="#66FCF1"
                            style={{
                                margin: "0px 10px 16px 10px",
                            }}
                        >
                            {!element["discount"] ?
                                <Box sx={{
                                    position: 'relative',
                                    left: '10px',
                                    top: "114px",
                                    display: 'flex'
                                }}>
                                    <Typography
                                        variant="navLink"
                                        color="tertiary.main"
                                    >
                                        {element["cost"]}$
                                    </Typography>
                                </Box>
                                :
                                <Box sx={{
                                    position: 'relative',
                                    left: '10px',
                                    top: "84px",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    gap: '3px'
                                }}>
                                    <Discount
                                        variant="navLinkMenu"
                                    >
                                        {element["discount"]}
                                    </Discount>
                                    <Typography
                                        variant="navLink"
                                        color="tertiary.main"
                                    >
                                        {element["cost"] * (100 - element["discount"]) / 100}$
                                    </Typography>
                                </Box>
                            }
                        </ProductCardImage>
                    </Link>
                )
            })}
        </Box>
    )
}