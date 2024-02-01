import {Typography} from "@mui/material";

export default function Discount(props) {
    return (
        <Typography
            variant={props.variant}
            color="accent.danger"
            sx={{
                padding:"0px 4px",
                border: 3,
                borderColor: 'accent.danger',
                borderRadius: 2,
                bgcolor: 'text.primary'
            }}
        >
            -{props.children}%
        </Typography>
    )
}