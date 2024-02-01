import {Box} from "@mui/material";
import React, {useLayoutEffect, useRef, useState} from "react";
import {calculateOffsetForSwiper, coordinatesOfBlock} from "../utils/ClipPathCaluculationsScript";

export default function TiltedBox(props) {
    const [coordinates, setCoordinates] = useState({leftCorner: 0, rightCorner: 100})
    const textRef=useRef(null);
    const clipPath= `polygon(${coordinates.leftCorner}% 0%, 100% 0%, ${coordinates.rightCorner}% 100%, 0% 100%)`;

    useLayoutEffect(() => {
        if (textRef.current) {
            const width = textRef.current.offsetWidth;
            const height = textRef.current.offsetHeight;
            const angle = props.angle ? props.angle : -7 * Math.PI / 18;
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
        <Box
            {...props}
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingX: 4,
                paddingY: 0,
                height: props.height,
                bgcolor: props.bgcolor,
                clipPath: clipPath,
            }}
            ref={textRef}
        >
            {props.children}
        </Box>
    )
}