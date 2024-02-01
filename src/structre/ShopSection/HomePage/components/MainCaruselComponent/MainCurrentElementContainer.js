import {Transition} from "react-spring";
import {animated} from "@react-spring/konva";
import MainCurrentElement from "./MainCurrentElement";

export default function MainCurrentElementContainer(props) {
    const prevState = props.refs["forChange"].current.find(element => element.role === "current");

    return (
        <Transition
            items={props.element}
            from={() => {
                if (prevState) {
                    if (prevState.id >= props.id) {
                        return ({time_for_start: 100, time_for_end: 0, opacity: 0.5})
                    } else {
                        return ({time_for_start: 0, time_for_end: 100, opacity: 0.5})
                    }
                } else {
                    return ({time_for_start: 100, time_for_end: 100, opacity: 0})
                }
            }}
            enter={() => {
                if (prevState) {
                    return ({time_for_start: 100, time_for_end: 100, opacity: 0})
                }
            }
            }
            config={{mass: 5, tension: 500, friction: 150}}

        >
            {({time_for_start, time_for_end, opacity}, item) => {
                const AnimatedMainCurrentElement = animated(MainCurrentElement);
                return (
                    <AnimatedMainCurrentElement
                        {...props}
                        time_for_start={time_for_start}
                        time_for_end={time_for_end}
                        shadow_opacity={opacity}
                    >
                        {item}
                    </AnimatedMainCurrentElement>)
            }
            }
        </Transition>
    )
}