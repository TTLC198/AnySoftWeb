import {Box} from "@mui/material";
import {Group, Layer, Stage} from "react-konva";
import useImage from "use-image";
import {memo, useRef, useState} from "react";
import MainPrevElementContainer from "./MainCaruselComponent/MainPrevElementContainer";
import MainNextElementContainer from "./MainCaruselComponent/MainNextElementContainer";
import MainCurrentElementContainer from "./MainCaruselComponent/MainCurrentElementContainer";
import {MainTextElement} from "./MainCaruselComponent/MainTextElement";
import _ from "lodash";
import {baseURL} from "../../../../generalUtilities";

export const MainCanvasCarousel = memo(function MainCanvasCarousel(props) {
    const [current, setCurrent] = useState(0);

    const prevRef = useRef(null);
    const currentRef = useRef(null);
    const nextRef = useRef(null);

    const elementsNeedsChangeRef = useRef([]);

    const [image_0] = useImage(baseURL + props.products[0].images[0]);

    const [image_1] = useImage(baseURL + props.products[1].images[0]);

    const [image_2] = useImage(baseURL + props.products[2].images[0]);

    const [image_3] = useImage(baseURL + props.products[3].images[0]);

    const products = [
        {
            ...props.products[0],
            "image": image_0,
        },
        {
            ...props.products[1],
            "image": image_1,
        },
        {
            ...props.products[2],
            "image": image_2,
        },
        {
            ...props.products[3],
            "image": image_3,
        },
    ]

    return (
        <Box style={{position: "relative", width: "100%"}}>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 50,
                    left: 100,
                    zIndex: 1000,
                    cursor: "pointer"
                }}
                onClick={() => console.log("current|" + current)}
            >
                <MainTextElement
                    product={products[current]}
                />
            </Box>
            <Stage width={props.width} height={props.height}>
                <Layer>
                    <Group ref={nextRef}>
                        {
                            products.slice(current + 1).map((element, id) => {

                                return (
                                    <MainNextElementContainer
                                        id={id}
                                        key={element.id}
                                        current={current}
                                        my_offset={props.offset}
                                        angle={props.angle}
                                        product_lenght={products.length}
                                        height={props.height}
                                        width={props.width}
                                        refs={{
                                            main: nextRef,
                                            current: currentRef,
                                            "forChange": elementsNeedsChangeRef
                                        }}
                                        on_click={setCurrent}
                                        element={element}
                                    />
                                )
                            })
                        }
                    </Group>

                    <Group ref={prevRef}>
                        {
                            products.slice(0, current).map((element, id) => {
                                return (
                                    <MainPrevElementContainer
                                        id={id}
                                        key={element.id}
                                        current={current}
                                        my_offset={props.offset}
                                        angle={props.angle}
                                        product_lenght={products.length}
                                        height={props.height}
                                        width={props.width}
                                        refs={{
                                            main: prevRef,
                                            current: currentRef,
                                            "forChange": elementsNeedsChangeRef
                                        }}
                                        on_click={setCurrent}
                                        element={element}
                                    />
                                )
                            })
                        }
                    </Group>

                    <Group ref={currentRef}>
                        <MainCurrentElementContainer
                            id={current}
                            element_id={products[current].id}
                            my_offset={props.offset}
                            angle={props.angle}
                            product_lenght={products.length}
                            height={props.height}
                            width={props.width}
                            refs={{
                                current: currentRef,
                                "forChange": elementsNeedsChangeRef
                            }}
                            on_click={setCurrent}
                            element={products[current]}
                        />
                    </Group>
                </Layer>
            </Stage>
        </Box>
    )
}, (prevProps, nextProps) =>
    prevProps.height === nextProps.height
    && prevProps.width === nextProps.width
    && prevProps.offset === nextProps.offset
    && prevProps.angle === nextProps.angle
    && _.differenceBy(prevProps.products, nextProps.products, 'id').length === 0
    && _.differenceBy(prevProps.products, nextProps.products, 'status').length === 0
)
