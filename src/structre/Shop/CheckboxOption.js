import {memo, useEffect, useState} from "react";
import {Checkbox, ListItem, Typography} from "@mui/material";
import {serializeToSearchString} from "../api";

export const CheckboxOption = memo(function CheckboxOption(props) {
    const [innerOption, setInnerOption] = useState({isChosen: false});

    useEffect(() => {
        if (props.element)
            setInnerOption(props.element)
    }, [props.element])

    function handleChange() {
        if (innerOption.isChosen) {
            setInnerOption({...innerOption, isChosen: false});
            props.delete_option(innerOption.id);
        } else {
            setInnerOption({...innerOption, isChosen: true});
            props.add_option(innerOption.id);
        }
    }

    return (
        <ListItem
            sx={{
                p: 0,
            }}
        >
            <Checkbox
                sx={{
                    color: "accent.second",
                    '&.Mui-checked': {
                        color: "accent.second",
                    },
                }}
                checked={innerOption?.isChosen}
                onChange={handleChange}
            />
            <Typography
                variant="body18"
                sx={{
                    color: "accent.second"
                }}
            >
                {innerOption?.name}
            </Typography>
        </ListItem>
    )
}, (prevProps, nextProps) => prevProps.id === nextProps.id || prevProps.isChosen === nextProps.isChosen)