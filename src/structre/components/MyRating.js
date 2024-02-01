import {Box} from "@mui/material";
import StarIcon from "./Icons/StarIcon";

export default function MyRating(props) {
    const starSize = Math.round((props.width - props.gap * (props.max_grade - 1)) / props.max_grade);

    return (
        <Box
            sx={{
                width: props.width,
                height: starSize,
                display: "flex",
                gap: props.gap + "px",
            }}
        >
            {
                [...Array(props.max_grade).keys()].map((element) => {
                    const intPart = Math.floor(props.grade / element),
                        decimalPart = props.grade % element;
                    let offset = 0;
                    if (element === 0 && props.grade < 1)
                        offset = props.grade;
                    else
                        offset = intPart > 1 ? 1 : intPart === 1 ? decimalPart : 0;

                    return (
                        <StarIcon
                            key={element}
                            name={props.name}
                            number={element}
                            color={props.color}
                            offset={offset}
                            back_color={props.back_color}
                            borderWidth={props.borderWidth}
                            sx={{
                                fontSize: starSize,
                            }}
                        />
                    )

                })
            }
        </Box>
    )
}
