import {Box, Typography} from "@mui/material";
import {ProductCardImage} from "../../../../components/ProductCardImage";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";

export default function SwiperFeaturedSectionCard(props) {
    const [timeLeftMS, setTimeLeftMS] = useState((new Date(props.section.endTime)) - Date.now());

    useEffect(() => {
        setTimeout(() => setTimeLeftMS(timeLeftMS - 1000), 1000);
        if (timeLeftMS / 1000 / 60 <= 0) {
            props.on_section_time_out(props.section.id);
        }
    }, [timeLeftMS, props])

    return (
        <Box
            sx={{
                width: props.width,
                height: props.height,
                zIndex: props.z_index,
            }}
            {...props}
        >
            <ProductCardImage
                image_url={props.section.coverImage}
                image_url_old={true}
                width={props.width}
                height={props.height}
                coordinates={props.coordinates}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            filter: "drop-shadow(0px 0px 7px black)",
                        }}
                    >
                        <Typography
                            variant="cost18bold"
                            color="text.primary"
                            sx={{
                                mt: `${Math.round(props.height * 0.12)}px`,
                                textAlign: "center",
                            }}
                        >
                            {props.section.name}
                        </Typography>
                        <Typography
                            variant="body18"
                            color="text.tertiary"
                            sx={{
                                mt: `${Math.round(props.height * 0.35)}px`,
                                textAlign: "center",
                            }}
                        >
                            Up to
                        </Typography>
                        <Typography
                            variant="cost48medium"
                            color="text.tertiary"
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            -{props.section.discount}%
                        </Typography>
                        <Typography
                            variant="body14"
                            color="text.primary"
                            sx={{
                                mt: 2,
                                textAlign: "center",
                            }}
                        >
                            {Math.floor(timeLeftMS / 1000 / 60 / 60 / 24)}D {Math.floor(timeLeftMS / 1000 / 60 / 60 % 24)}H {Math.floor(timeLeftMS / 1000 / 60 % 60)}M {Math.floor(timeLeftMS / 1000 % 60)}S
                            left
                        </Typography>
                    </Box>
                    <Button
                        sx={{
                            bgcolor: "secondary.main",
                            borderRadius: 0,
                            mt: 1,
                            p: 0,
                            textTransform: 'none',
                            transition: "filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            "&:hover": {
                                bgcolor: "secondary.main",
                                filter: "brightness(80%)",
                            },
                        }}
                    >
                        <Typography
                            variant="body18"
                            color="text.primary"
                            sx={{
                                py: 1,
                                px: 2,
                                mt: 0
                            }}
                        >
                            Browse deals
                        </Typography>
                    </Button>
                </Box>
            </ProductCardImage>
        </Box>
    )
}