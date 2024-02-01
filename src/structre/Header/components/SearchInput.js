import {Box, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

export default function SearchInput(props) {
    return (
        <Box
            {...props}
            sx={{
                display:"flex",
                alignItems: "center",
            }}
        >
            <IconButton type="button" sx={{ p: '10px' }} onClick={props.search_input}>
                <SearchIcon sx={{fontSize: 30, color:"text.primary"}} />
            </IconButton>
            <TextField /* TODO переназначить кнопку очистки на собственный button */
                {...props.param}
                placeholder="Search"
                variant="standard"
                color="secondary"
                sx={{
                    "& .MuiInputBase-root": {
                        mt: 0
                    },
                    "& .MuiFormLabel-root": {
                        top:"-13px"
                    },
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter")
                        props.search_input(event);
                }}
            />
            <IconButton type="button" sx={{ p: '10px' }} onClick={props.close_input}>
                <CloseIcon sx={{fontSize: 30, color:"text.primary"}}/>
            </IconButton>
        </Box>
    )
}