import {Box} from "@mui/material";

export default function DropDownList(props) {
    return (
        <Box
            sx={{
                maxHeight: props.max_height * props.m_height + "px",
                overflow: "hidden",
                border: 1,
                borderColor: "accent.second",
            }}
        >
            {props.children}
        </Box>
    )
}