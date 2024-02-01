import {Box, IconButton, List, ListItem, ListItemButton, Popover, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {serializeToSearchString} from "../api";

export function OrderSelection(props) {
    const [selectedOption, setSelectedOption] = useState(0);
    const [SortPopoverAnchorEl, setSortPopoverAnchorEl] = useState(null);
    const [isDescState, setIsDescState] = useState(true);

    function submitSearchOrder(sortOptions) {
        props.set_search_params(prev => serializeToSearchString(prev, {key: "sort", value: {object: sortOptions.object, isDesc: sortOptions.isDesc}}));
    }

    useEffect(() => {
        (async () => {
            if (props.initialState) {
                await setSelectedOption(props.sortParam.findIndex((element) => element.searchName === props.initialState.object));
                await setIsDescState(props.initialState.isDesc);
            }
        })();
    }, [props])

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
            }}
        >
            <Typography
                variant="body20"
                color="text.primary"
            >
                Sort:
            </Typography>
            <Box

            >
                <Typography
                    variant="body20"
                    sx={{
                        color:"text.accent",
                        cursor: "pointer",
                        "&:hover": {
                            color:"text.tertiary"
                        }
                    }}

                    onClick={(event)=>setSortPopoverAnchorEl(event.target)}
                >
                    {props.sortParam[selectedOption].name}
                </Typography>
                <Popover
                    open={Boolean(SortPopoverAnchorEl)}
                    anchorEl={SortPopoverAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onClose={()=> setSortPopoverAnchorEl(null)}
                >
                    <List
                        sx={{
                            bgcolor: "background.primary",
                            border: 1,
                            borderColor: "secondary.main",
                        }}
                    >
                        {
                            props.sortParam.map((element, index)=> (
                                <ListItemButton
                                    key={index}
                                    onClick={()=>{
                                        submitSearchOrder({
                                            object: props.sortParam[index].searchName,
                                            isDesc: isDescState
                                        })
                                        setSelectedOption(index);
                                        setSortPopoverAnchorEl(null);
                                    }}
                                >
                                    <Typography
                                        variant="body20"
                                        color={selectedOption === index ? "text.tertiary" : "text.accent"}
                                        sx={{
                                            textDecoration: selectedOption === index ? "underline" : "none"
                                        }}
                                    >
                                        {element.name}
                                    </Typography>
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Popover>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <IconButton
                    sx={{
                        mb: "-15px",
                        p: 0
                    }}
                    onClick={()=>{
                        setIsDescState(false);
                        submitSearchOrder({
                            object: props.sortParam[selectedOption].searchName,
                            isDesc: false
                        })
                    }}
                >
                    <ArrowBackIosIcon
                        sx={{
                            fontSize: 22,
                            transform: "rotate(90deg)",
                            color: !isDescState ? "tertiary.main" : "text.primary"
                        }}
                    />
                </IconButton>
                <IconButton
                    sx={{

                        p: 0
                    }}
                    onClick={()=>{
                        setIsDescState(true);
                        submitSearchOrder({
                            object: props.sortParam[selectedOption].searchName,
                            isDesc: true
                        })
                    }}
                >
                    <ArrowBackIosIcon
                        sx={{
                            fontSize: 22,
                            transform: "rotate(-90deg)",
                            color: isDescState ? "tertiary.main" : "text.primary"
                        }}
                    />
                </IconButton>
            </Box>
        </Box>
    )
}