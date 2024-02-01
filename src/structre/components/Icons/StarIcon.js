import {SvgIcon} from "@mui/material";

export default function StarIcon(props) {
    return (
        <SvgIcon fill="none" {...props}>
            <path
                d="M12 0.809018L14.4564 8.36905L14.5125 8.5418H14.6942H22.6433L16.2123 13.2142L16.0654 13.3209L16.1215 13.4937L18.5779 21.0537L12.1469 16.3813L12 16.2746L11.8531 16.3813L5.4221 21.0537L7.87851 13.4937L7.93464 13.3209L7.78769 13.2142L1.35674 8.5418H9.30583H9.48747L9.5436 8.36905L12 0.809018Z"
                fill={`url(#${props.name + props.number})`}
                stroke={props.color}
                strokeWidth={props.borderWidth}
                width="100%"
                height="100%"
            />
            <defs>
                <linearGradient id={props.name + props.number}
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor={props.color}/>
                    <stop offset={props.offset} stopColor={props.color}/>
                    <stop offset={props.offset} stopColor={props.back_color && props.color}
                          stopOpacity={props.back_color ? 1 : 0}/>
                    <stop offset="1" stopColor={props.back_color && props.color}
                          stopOpacity={props.back_color ? 1 : 0}/>
                </linearGradient>
            </defs>
        </SvgIcon>
    )
}