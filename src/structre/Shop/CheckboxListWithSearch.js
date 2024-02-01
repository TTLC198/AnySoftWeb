import {useCallback, useEffect, useRef, useState} from "react";
import {Box, Checkbox, Input, List, ListItem, TextField, Typography} from "@mui/material";
import {serializeToSearchString} from "../api";
import {CheckboxOption} from "./CheckboxOption";

export default function CheckboxListWithSearch(props) {
    const [searchInput, setSearchInput] = useState("");
    const [options, setOptions] = useState([]);
    const [isOverflowed, setIsOverflowed] = useState(true);
    const overflowRef = useRef(null),
        chosenOpitons = useRef([]);

    useEffect(() => {
        const element = overflowRef.current;
        if (element) {
            setIsOverflowed(element.offsetHeight < element.scrollHeight);
        }
    }, [options])

    useEffect(() => {
        setOptions(props.options.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase())));
    }, [searchInput, props.options])

    const addOptionToSearch = useCallback((id) =>{
        chosenOpitons.current.push(id)
        props.set_checked_options((prev) => {
            return (serializeToSearchString(prev, {key: props.name, value: chosenOpitons.current}));
        })
    }, [options, serializeToSearchString])

    const deleteOptionFromSearch = useCallback((id) =>{
        chosenOpitons.current = chosenOpitons.current.filter((option) => option !== id)
        props.set_checked_options((prev) => {
            return (serializeToSearchString(prev, {key: props.name, value: chosenOpitons.current}));
        })
    }, [options, serializeToSearchString])

    return (
        <Box
            sx={{
                maxHeight: "inherit",
                px: 1,
            }}
        >
            <Box sx={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                py: 2,
                maxHeight: "inherit",
            }}>
            <Input
                placeholder="Search ..."
                value={searchInput}
                onChange={(event) => {
                    setSearchInput(event.target.value)
                }}
                disableUnderline={true}
                sx={{
                    bgcolor: "rgba(201, 201, 201, 0.2)",
                    borderRadius: 0,
                    py: 1,
                    px: 2,
                }}
            />
                {
                    options.length === 0 ?
                        <Typography>
                            No {props.name}
                        </Typography>
                        :
                        <List
                            sx={{
                                overflowY: isOverflowed && "scroll",
                                mt: 1,
                                maxHeight: "inherit",
                            }}
                            ref={overflowRef}
                        >
                            {options.map((element) => {
                                return (
                                    <CheckboxOption
                                        key={element.id}
                                        element={element}
                                        add_option={addOptionToSearch}
                                        delete_option={deleteOptionFromSearch}
                                    />
                                )
                            })}
                        </List>
                }
            </Box>
        </Box>
    )
}