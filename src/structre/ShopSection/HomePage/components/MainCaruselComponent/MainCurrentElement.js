import {calculateOffsetForMainBanner, coordinatesOfBlock} from "../../../../utils/ClipPathCaluculationsScript";
import {Group, Image, Shape} from "react-konva";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

export default function MainCurrentElement(props) {
    const navigate = useNavigate();
    const coordinates = coordinatesOfBlock(
        [0, 0],
        [props.width, props.height],
        calculateOffsetForMainBanner(
            "current",
            props.id,
            {
                offset: props.my_offset,
                angle: props.angle,
                "productLength": props.product_lenght,
                height: props.height,
                width: props.width,
                time_for_start: props.time_for_start,
                time_for_end: props.time_for_end,
            }
        ),
        props.angle);

    return (
        <Group id={props.id.toString()}
               onClick={() => navigate(`../product/${props.element_id}`)}

               clipFunc={(ctx) => {

                   ctx.moveTo(coordinates[0].X, coordinates[0].Y);
                   for (let i = 1; i < coordinates.length; i++) {
                       ctx.lineTo(coordinates[i].X, coordinates[i].Y)
                   }
               }
               }

               onMouseEnter={e => {
                   const container = e.target.getStage().container();
                   container.style.cursor = "pointer";
               }}

               onMouseLeave={e => {
                   const container = e.target.getStage().container();
                   container.style.cursor = "default";
               }}
        >
            <Image
                image={props.element.image}
                width={props.width}
                height={props.height}
            />

            <Shape
                width={props.width}
                height={props.height}
                opacity={props.shadow_opacity}
                fill={"#000"}

                sceneFunc={(ctx, shape) => {
                    ctx.beginPath();
                    ctx.moveTo(coordinates[0].X, coordinates[0].Y);
                    for (let i = 1; i < coordinates.length; i++) {
                        ctx.lineTo(coordinates[i].X, coordinates[i].Y)
                    }
                    ctx.closePath();

                    ctx.fillStrokeShape(shape);
                }
                }
            />
        </Group>
    )
}