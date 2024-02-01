import {calculateOffsetForMainBanner, coordinatesOfBlock} from "../../../../utils/ClipPathCaluculationsScript";
import {Group, Image} from "react-konva";
import {useState} from "react";
import AnimatedShadowForMainCarousel from "./AnimatedShadowForMainCarousel";

export default function MainPrevElement(props) {
    const [isHovered, setIsHovered] = useState(false);

    const coordinates = coordinatesOfBlock(
        [0, 0],
        [props.width, props.height],
        calculateOffsetForMainBanner(
            "prev",
            props.id,
            {
                offset: props.my_offset,
                angle: props.angle,
                "productLength": props.product_lenght,
                height: props.height,
                width: props.width,
                time_for_start: props.time_for_start,
                time_for_end: props.time_for_end,
            }),
        props.angle);

    return (
        <Group
            {...props}
            id={props.id.toString()}

            clipFunc={(ctx) => {
                ctx.moveTo(coordinates[0].X, coordinates[0].Y);
                for (let i = 1; i < coordinates.length; i++) {
                    ctx.lineTo(coordinates[i].X, coordinates[i].Y)
                }
            }
            }

            onClick={() => {
                setIsHovered(false);

                let elements = [];
                elements.push({
                    role: "current",
                    id: props.refs.current.current.children[0].attrs.id
                });
                for (let i = 0; i < props.refs.main.current.children.length; i++) {
                    if (Number(props.refs.main.current.children[i].attrs.id) > props.id) {
                        elements.push(
                            {
                                role: "prev",
                                id: props.refs.main.current.children[i].attrs.id
                            }
                        )
                    }
                }
                props.refs["forChange"].current = elements;
                props.on_click(props.id);
            }
            }

            onMouseEnter={e => {
                setIsHovered(true);

                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
            }}
            onMouseLeave={e => {
                setIsHovered(false);

                const container = e.target.getStage().container();
                container.style.cursor = "default";
            }}
        >
            <Image
                image={props.element.image}
                width={props.width}
                height={props.height}
            />

            <AnimatedShadowForMainCarousel
                height={props.height}
                width={props.width}
                is_hovered={isHovered}
                shadow_opacity={props.shadow_opacity}
                coordinates={coordinates}
            />
        </Group>
    )
}