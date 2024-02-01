import {Box, Typography} from "@mui/material";
import {useState} from "react";
import {Transition} from "react-spring";
import {animated} from "@react-spring/web";
import ExpandedDescription from "./ExpandedDescription";
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ProductDescription(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Box
            sx={{
                width: props.width,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5,
            }}
        >
            <Transition
                items={isExpanded}
                from={{maxHeight: 0}}
                enter={{maxHeight: 1}}
                leave={{maxHeight: 0}}
            >
                {({maxHeight}, item) => {
                    const AnimatedDescription = animated(ExpandedDescription);
                    return (
                        item && <AnimatedDescription
                            max_height={maxHeight}
                            product={props.product}
                            width={props.width}
                            margin={60}
                        />
                    )
                }
                }
            </Transition>
            <Box
                sx={{
                    width: props.width / 2,
                    height: 2,
                    background: "linear-gradient(90deg, rgba(102, 252, 241, 0) 0%, #66FCF1 49.99%, rgba(102, 252, 241, 0) 100%)",
                }}
            />
            <Button
                onClick={() => setIsExpanded(prevState => !prevState)}
                sx={{
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="body20"
                    color="text.accent"
                >
                    {
                        !isExpanded ?
                            "More details"
                            :
                            "Less details"
                    }
                </Typography>
                {
                    !isExpanded ?
                        <ExpandMoreIcon
                            sx={{
                                color:"secondary.main",
                                fontSize: 60
                            }}
                        />
                        :
                        <ExpandLessIcon
                            sx={{
                                color:"secondary.main",
                                fontSize: 60
                            }}
                        />
                }
            </Button>
        </Box>
    )
}