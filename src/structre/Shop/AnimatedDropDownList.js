import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {animated} from "@react-spring/web";
import {Transition} from "react-spring";
import DropDownList from "./DropDownList";

export default function AnimatedDropDownList(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                mr: 3
            }}
        >
            <Button
                onClick={() => setIsExpanded(prevState => !prevState)}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    borderBottom: 1,
                    borderBottomColor: "accent.second",
                    borderRadius: 0,
                }}
            >
                <Typography
                    variant="body20"
                    color="text.tertiary"
                >
                    {props.name}
                </Typography>
                {
                    !isExpanded ?
                        <ExpandMoreIcon
                            sx={{
                                color: "secondary.main",
                                fontSize: 25
                            }}
                        />
                        :
                        <ExpandLessIcon
                            sx={{
                                color: "secondary.main",
                                fontSize: 25
                            }}
                        />
                }
            </Button>
            <Transition
                items={isExpanded}
                from={{maxHeight: 0}}
                enter={{maxHeight: 1}}
                leave={{maxHeight: 0}}
            >
                {({maxHeight}, item) => {
                    const AnimatedDropDownList = animated(DropDownList);
                    return (
                        item &&
                        <AnimatedDropDownList
                            max_height={props.max_height}
                            m_height={maxHeight}
                        >
                            {props.children}
                        </AnimatedDropDownList>
                    )
                }
                }
            </Transition>
        </Box>
    )
}