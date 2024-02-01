import {Transition} from "react-spring";
import {animated} from "@react-spring/web";
import ExpandedVersion from "./ExpandedVersion";
import {Box} from "@mui/material";

export default function AnimatedExpandedVersion(props) {
    return (
        <Transition
            items={props.is_hover}
            from={{
                widthMultiplier: 1,
                heightMultiplier: 1
        }}
            enter={{
                widthMultiplier: props.widthMultiplier,
                heightMultiplier: props.heightMultiplier
            }}
            leave={{
                widthMultiplier: 1,
                heightMultiplier: 1
            }}
        >
            {({widthMultiplier, heightMultiplier}, item) => {
                const AnimatedElement = animated(ExpandedVersion);
                return (
                    <Box>
                        {
                            item &&
                            <AnimatedElement
                                width_multiplier={widthMultiplier}
                                height_multiplier={heightMultiplier}
                                collapsed_element={props.collapsedElement}
                                product={props.product}
                                set_hover_state={props.set_hover_state}
                                is_hover={props.is_hover}
                                offset={50}
                                angle={-1 * Math.PI / 4}
                            />
                        }
                    </Box>
                )
            }}
        </Transition>
    )
}