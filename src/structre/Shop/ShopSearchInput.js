import {Box, IconButton, Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from "react";
import {serializeToSearchString} from "../api";

export default function ShopSearchInput(props) {
    const [input, setInput] = useState("");

    function performSearch(param) {
        props.set_search_params(prev => serializeToSearchString(prev, {key: "Name", value: param !== undefined ? param : input}));
    }

    useEffect(() => {
        setInput(props.initial_value === null ? "" : props.initial_value);
    }, [props.initial_value])

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
            }}
        >
            <IconButton
                sx={{color: "text.primary"}}
                onClick={() => performSearch()}
            >
                <SearchIcon sx={{fontSize: 30}}/>
            </IconButton>
            <Input
                placeholder="Search ..."
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);

                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter")
                        performSearch()
                    else {
                        if (event.key === "Escape") {
                            setInput("");
                            performSearch("")
                        }
                    }
                }}
                sx={{
                    flexGrow: 1,
                    color: "accent.first",
                    underline: "secondary.main",
                    "&.MuiInput-underline": {
                        borderBottom: 1,
                        borderBottomColor: "secondary.main"
                    }
                }}
            />
            <IconButton
                sx={{color: "text.primary"}}
                onClick={() => {
                    setInput("");
                    performSearch("")
                }}
            >
                <CloseIcon sx={{fontSize: 30}}/>
            </IconButton>
        </Box>
    )
}