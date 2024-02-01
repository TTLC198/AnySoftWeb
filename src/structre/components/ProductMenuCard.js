import {Box} from "@mui/material";

export default function ProductMenuCard(props) {
    return (
        <Box
            sx={{
                border: 2,
                borderColor: 'tertiary.main',
                width: props.width,
                height: props.height,
                m: props.margin,
                clipPath: 'polygon(25% 0, 100% 0, 100% 66%, 75% 100%, 0 100%, 0 34%)',
            }}
            style={{
                background: `radial-gradient(100% 177.78% at 100% 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59.38%, #000000 100%), url(${props.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }}
        >
            {props.children}
        </Box>
    )
}