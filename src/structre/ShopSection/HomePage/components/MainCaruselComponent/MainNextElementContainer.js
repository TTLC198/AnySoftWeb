import {animated} from '@react-spring/konva';
import {Transition} from "react-spring";
import MainNextElement from "./MainNextElement";

export default function MainNextElementContainer(props) {
    const innerId = props.id + props.current + 1;
    const prevState = props.refs["forChange"].current.find(element => Number(element.id) === innerId);

    return (
        <Transition
            items={props.element}
            from={() => {
                if (prevState) {
                    if (prevState.role === "current") {
                        return ({time_for_start: 0, time_for_end: 100, opacity: 0})
                    } else {
                        return ({time_for_start: 0, time_for_end: 0, opacity: 0})
                    }
                } else {
                    return ({time_for_start: 100, time_for_end: 100, opacity: 0.2 * (props.id + 1)})
                }
            }}
            enter={() => {
                if (prevState) {
                    return ({time_for_start: 100, time_for_end: 100, opacity: 0.2 * (props.id + 1)})
                }
            }
            }
            config={{mass: 5, tension: 500, friction: 150}}

        >
            {({time_for_start, time_for_end, opacity}, item) => {
                const AnimatedMainNextElement = animated(MainNextElement);
                return (
                    <AnimatedMainNextElement
                        {...props}
                        time_for_start={time_for_start}
                        time_for_end={time_for_end}
                        shadow_opacity={opacity}
                    >
                        {item}
                    </AnimatedMainNextElement>)
            }
            }
        </Transition>
    )
}