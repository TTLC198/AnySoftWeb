import React, {forwardRef, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import MyRating from "../MyRating";
import Discount from "../Discount";
import {ProductCardImage} from "../ProductCardImage";

export const CollapsedVersion = forwardRef((props, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;

        if (isHovered)
            interval = setTimeout(() => props.set_hover_state(true), 200);

        return () => clearTimeout(interval);
    }, [isHovered])

    return (
        <Box
            onMouseEnter={(event) => {
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            ref={ref}
        >
            <ProductCardImage
                image_url={props.product.images[0]}
                width={props.width}
                height={props.height}
                coordinates={props.coordinates}
                product_element={props.product.id}
            >
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                        pb: 2,
                        pl: 2,
                        boxSizing: "border-box"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            filter: "drop-shadow(0px 0px 7px black)",
                        }}
                    >
                        <MyRating
                            width={100}
                            gap={5}
                            grade={props.product.rating}
                            max_grade={5}
                            color={"#E85100"}
                            borderWidth={0.5}
                            name={`Top_Seller_${props.product.id}_`}
                        />

                        <Typography
                            variant="body18"
                            color="text.primary"
                            sx={{
                                overflow: "hidden"
                            }}
                        >
                            {props.product.name}
                        </Typography>
                        {
                            props.product.status !== "owned" &&
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: '10px'
                                }}
                            >
                                {props.product["discount"] &&
                                    <Discount
                                        variant="cost14"
                                    >
                                        {props.product["discount"]}
                                    </Discount>
                                }
                                <Typography
                                    variant="cost18"
                                    color="tertiary.main"
                                >
                                    ${props.product["cost"] * (100 - props.product["discount"]) / 100}
                                </Typography>
                            </Box>
                        }
                    </Box>
                </Box>
            </ProductCardImage>
        </Box>
    )
})