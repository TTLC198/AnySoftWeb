import React, {forwardRef, useLayoutEffect, useRef, useState} from "react";
import {CustomButton} from "./CustomButton";
import {Box} from "@mui/material";
import {calculateOffsetForSwiper, coordinatesOfBlock} from "../utils/ClipPathCaluculationsScript";

export const MyButton = forwardRef((props, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [coordinates, setCoordinates] = useState({leftCorner: 0, rightCorner: 100})

    const textRef = useRef(null);

    useLayoutEffect(() => {
        if (textRef.current) {
            const width = textRef.current.offsetWidth;
            const height = textRef.current.offsetHeight;
            const angle = props.angle || -7 * Math.PI / 18;
            const coordinates = coordinatesOfBlock(
                [0, 0],
                [width, height],
                calculateOffsetForSwiper(
                    {
                        angle: angle,
                        height: height,
                        width: width,
                    }
                ),
                angle);
            setCoordinates(
                {
                    leftCorner: Math.round(coordinates[0].X/width * 100),
                    rightCorner: Math.round(coordinates[2].X/width * 100)
                }
            )
        }
    }, [props])

    return (
        <CustomButton
            style={{
                height: `${props.height}px`,
                ...props.style,
            }}
            onMouseEnter={(event) => {
                event.stopPropagation();
                if (typeof props.mouse_enter_handler === "function") {
                    props.mouse_enter_handler(event);
                }
                setIsHovered(true);
            }}
            onMouseLeave={(event) => {
                event.stopPropagation();
                if (typeof props.mouse_leave_handler === "function") {
                    props.mouse_leave_handler(event);
                }
                setIsHovered(false);
            }}
            onClick={(event) => {
                event.stopPropagation();
                if (typeof props.click_handler === "function") {
                    props.click_handler(event);
                }
            }}
            {...props}
            ref={ref}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingX: 4,
                    paddingY: 0,
                    height: props.height,
                    bgcolor: isHovered ? props.hover_color : props.main_color,
                    transition: "background 0.2s ease-in-out",
                    clipPath: `polygon(${coordinates.leftCorner}% 0%, 100% 0%, ${coordinates.rightCorner}% 100%, 0% 100%)`,
                }}
                ref={textRef}
            >
                {props.children}
            </Box>
        </CustomButton>
    )
})