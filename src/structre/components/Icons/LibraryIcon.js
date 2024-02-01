import * as React from "react";
import {SvgIcon} from "@mui/material";

export default function LibraryIcon(props) {
    return (
        <SvgIcon
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M3 11h20v21H3z" />
            <path
                d="M1.063 31.344V11.156a1.594 1.594 0 011.593-1.594h20.188a1.594 1.594 0 011.593 1.594v20.188a1.594 1.594 0 01-1.593 1.593H2.656a1.594 1.594 0 01-1.594-1.593zm21.25-.532V11.688H3.188v19.126h19.125z"
            />
            <path
                d="M26.563 7.438H5.313V5.313h21.78a1.594 1.594 0 011.595 1.593v21.782h-2.125V7.438z"
            />
            <path
                d="M30.813 3.188H9.563V1.062h21.78a1.594 1.594 0 011.595 1.594v21.782h-2.126V3.188z"
            />
        </SvgIcon>
    );
}