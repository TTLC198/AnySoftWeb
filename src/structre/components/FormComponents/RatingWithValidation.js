import {Controller} from "react-hook-form";
import {FormControl, InputBase, Rating, Typography} from "@mui/material";
import React, {forwardRef} from "react";
import {styled} from "@mui/material/styles";
import SimpleStarIcon from "../Icons/SimpleStarIcon";

const StyledRating = styled(
    forwardRef(
        (props, ref) => (
            <Rating {...props} ref={ref}/>
        )))
(({theme}) => ({
    '& .MuiRating-iconFilled': {
        color: theme.palette.accent.danger,
    },
    '& .MuiRating-iconHover': {
        color: theme.palette.accent.fourth,
    },
}));

export function RatingWithValidation(
    {
        control,
        name,
        rules,
        isDisabled = false
    }) {
    return (
        <Controller
            render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid},
                     }) => {
                return (
                    <FormControl
                        error={invalid}
                        fullWidth
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1
                        }}
                    >
                        <StyledRating
                            name={name}
                            value={value || 0}
                            onChange={onChange}
                            readOnly={isDisabled}
                            ref={ref}
                            precision={0.5}
                            sx={{
                                fontSize: 30
                            }}
                            emptyIcon={
                                <SimpleStarIcon fontSize="inherit"
                                                borderColor={"#E85100"}
                                                borderWidth={0.5}
                                />
                            }
                            icon={
                                <SimpleStarIcon fontSize="inherit"
                                                color={"#E85100"}
                                                borderWidth={0.5}
                                />
                            }
                        />
                        <Typography
                            variant="h2_32"
                            sx={{
                                color: "accent.danger"
                            }}
                        >
                            {value || 0}
                        </Typography>
                    </FormControl>
                )
            }}
            name={name}
            control={control}
            rules={rules}
        />
    );
}