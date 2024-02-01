import {Box, Card, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

export function ProductCard(props) {
    return(
        <Card
            {...props}
            id={props.index}
            sx={{width:"100%"}}
        >
            <CardMedia
                component="img"
                alt="image"
                image={props.imgsource}
                sx={{
                    height: props.height,
                    width: props.width
            }}
            />
            <CardContent sx={{bgcolor: "background.transparent", position:"absolute", bottom: "8px", left: "16px"}}>
                <Rating name={props.name}
                        value={props.rating}
                        precision={0.1}
                        readOnly
                        emptyIcon={
                            <StarIcon
                                style={{color: "#FAFAFA"}}
                                fontSize="inherit"/>
                        }
                />
                <Typography gutterBottom variant="h4" component="div" color="text.primary" >
                    {props.name}
                </Typography>
                {!props.discount ?
                    <Typography variant="h6" color="text.primary">
                        {props.cost}
                    </Typography>
                    :
                    <Box sx={{display: "flex"}}>
                        <Typography variant="h6" color="text.primary" sx={{mr: 1, textDecoration: "line-through"}}>
                            {props.cost}
                        </Typography>
                        <Typography variant="h6" color="text.tertiary" sx={{}}>
                            {props.cost * (100 - props.discount) / 100}
                        </Typography>
                    </Box>
                }
            </CardContent>
        </Card>
    )
}