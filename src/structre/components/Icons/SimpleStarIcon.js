import {SvgIcon} from "@mui/material";

export default function SimpleStarIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                d="M12 0.809018L14.4564 8.36905L14.5125 8.5418H14.6942H22.6433L16.2123 13.2142L16.0654 13.3209L16.1215 13.4937L18.5779 21.0537L12.1469 16.3813L12 16.2746L11.8531 16.3813L5.4221 21.0537L7.87851 13.4937L7.93464 13.3209L7.78769 13.2142L1.35674 8.5418H9.30583H9.48747L9.5436 8.36905L12 0.809018Z"
                stroke={props.borderColor}
                strokeWidth={props.borderWidth}
                width="100%"
                height="100%"
            />
        </SvgIcon>
    )
}