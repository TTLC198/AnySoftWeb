import {SvgIcon} from "@mui/material";

export function LockIcon(props) { //TODO change color for icon
    return (
        <SvgIcon
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path opacity="0.35" d="M7.29102 16.0415H27.7077V30.6248H7.29102V16.0415Z"/>
            <path d="M11.666 16.0417V10.2083C11.666 8.26389 12.8327 4.375 17.4993 4.375C22.166 4.375 23.3327 8.26389 23.3327 10.2083V16.0417M11.666 16.0417H7.29102V30.625H27.7077V16.0417H23.3327M11.666 16.0417H23.3327" fill="none" stroke={props.borderColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
        </SvgIcon>
    )
}
