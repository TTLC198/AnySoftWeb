import {Box} from "@mui/material";

export default function ProductComments(props) {
    return (
        <Box sx={{
            width: props.width,
            height: props.height,
            overflow: "hidden",
        }}>
            {props.children}
        </Box>
    )
}