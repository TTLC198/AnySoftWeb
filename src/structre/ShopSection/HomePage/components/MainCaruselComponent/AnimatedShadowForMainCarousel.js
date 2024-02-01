import {animated} from "@react-spring/konva";
import {Shape} from "react-konva";
import {Spring} from "react-spring";

export default function AnimatedShadowForMainCarousel(props) {
    return (
        <Spring
            from={{opacity: 0}}
            to={{opacity: props.is_hovered ? 0 : props.shadow_opacity}}
        >
            {({opacity}) => {
                const AnimatedShape = animated(Shape);
                return (<AnimatedShape
                    width={props.width}
                    height={props.height}
                    opacity={opacity}
                    fill={"#000"}

                    sceneFunc={(ctx, shape) => {
                        ctx.beginPath();
                        ctx.moveTo(props.coordinates[0].X, props.coordinates[0].Y);
                        for (let i = 1; i < props.coordinates.length; i++) {
                            ctx.lineTo(props.coordinates[i].X, props.coordinates[i].Y)
                        }
                        ctx.closePath();

                        ctx.fillStrokeShape(shape);
                    }
                    }
                />)
            }}
        </Spring>
    )
}