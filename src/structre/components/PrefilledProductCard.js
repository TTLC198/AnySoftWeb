import {Box} from "@mui/material";
import React, {memo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CollapsedVersion} from "./PrefilledProductCardComponents/CollapsedVersion";
import AnimatedExpandedVersion from "./PrefilledProductCardComponents/AnimatedExpandedVersion";
import _ from "lodash";

export const PrefilledProductCard = memo(function PrefilledProductCard({
                                                                           product,
                                                                           height_scale,
                                                                           width_scale,
                                                                           ...rest
                                                                       }) {
        const productRef = useRef(null);
        const [isHovered, setIsHovered] = useState(false);
        const navigate = useNavigate();

        return (
            <Box
                sx={{
                    width: rest.width,
                    height: rest.height,
                    cursor: "pointer",
                }}
                {...rest}
                onClick={() => {
                    navigate(`../../product/${product.id}`, {replace: true});
                }}
            >
                <CollapsedVersion
                    ref={productRef}
                    set_hover_state={setIsHovered}
                    product={product}
                    {...rest}
                />
                <AnimatedExpandedVersion
                    collapsedElement={productRef.current}
                    product={product}
                    widthMultiplier={width_scale === undefined ? 1.6 : width_scale}
                    heightMultiplier={height_scale === undefined ? 2.6 : height_scale}
                    is_hover={isHovered}
                    set_hover_state={setIsHovered}
                    {...rest}
                />
            </Box>
        )
    },
    (
        (prevProps, nextProps) =>
            prevProps.height === nextProps.height
            && prevProps.width === nextProps.width
            && _.differenceBy(prevProps.coordinates, nextProps.coordinates).length === 0
            && prevProps.products.id === nextProps.product.id
    )
)