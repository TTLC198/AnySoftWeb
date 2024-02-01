import {
    Box,
    FormControl, Grid,
    InputBase,
    Typography
} from "@mui/material";
import {Controller} from "react-hook-form";
import {styled} from "@mui/material/styles";
import React from "react";

const CustomInput = styled((props) => (<InputBase {...props}/>))(({theme}) => ({
    width: "100%",
    '& .MuiInputBase-input': {
        borderRadius: 2,
        backgroundColor: 'rgba(128, 128, 128, 0.15)',
        border: '1px solid',
        borderColor: theme.palette.secondary.main,
        fontSize: 18,
        padding: '5px 6px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
        ]),
        '&:focus': {
            borderColor: theme.palette.accent.third,
        },
    },
    "&.Mui-error .MuiInputBase-input": {
        borderColor: theme.palette.accent.danger,
    },
    "&.Mui-disabled": {
        color: theme.palette.text.secondary,
        "& .MuiInputBase-input": {
            borderColor: "transparent",
            "-webkit-text-fill-color": theme.palette.text.secondary,
        },
    }
}));

export function CreatorInputInline(
    {
        control,
        name,
        label = undefined,
        placeholder,
        type,
        rules,
    }) {
    return (
        <Controller
            render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid, isTouched, isDirty, error, defaultValues},
                     }) => {
                return (
                    <FormControl
                        error={invalid}
                    >
                        <Grid container
                            alignItems={"center"}
                        >
                            <Grid
                                item
                                xs={3}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    variant="h2_20"
                                    color="text.secondary"
                                >
                                    {label}
                                </Typography>
                                {
                                    invalid &&
                                    <Typography
                                        variant="h2_16"
                                        sx={{
                                            color: "accent.danger"
                                        }}
                                    >
                                        {error.message}
                                    </Typography>
                                }
                            </Grid>
                            <Grid item xs={5}>
                                <CustomInput
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    inputRef={ref}
                                    defaultValue={defaultValues}
                                    type={type}
                                    placeholder={placeholder}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                )
            }}
            name={name}
            control={control}
            rules={rules}
        />
    );
}