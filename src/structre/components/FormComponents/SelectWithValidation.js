import {Controller} from "react-hook-form";
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";

const CustomSelect = styled((props) => (<Select {...props}/>))(({ theme }) => ({
    marginTop: theme.spacing(1),
    bgcolor: theme.palette.primary.main,
    '&:hover': {
        borderColor: theme.palette.accent.third,
    },
    '& .MuiSelect-select': {
        borderRadius: 4,
        backgroundColor: 'rgba(128, 128, 128, 0.15)',
        border: '1px solid',
        borderColor: theme.palette.secondary.main,
        fontSize: 26,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
        ]),
        '&:focus': {
            borderColor: theme.palette.accent.third,
        },
    },
    "&.Mui-error .MuiSelect-select": {
        borderColor: theme.palette.accent.danger,
    },
    "&.Mui-disabled": {
        color: theme.palette.text.secondary,
        "& .MuiSelect-select": {
            borderColor: "transparent",
            "-webkit-text-fill-color": theme.palette.text.secondary,
        },
    }
}));

export function SelectWithValidation(
    {
        control,
        name,
        label = undefined,
        rules,
        isDisabled = false,
        options,
        style
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
                        fullWidth
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography
                                variant="h2"
                                color="text.secondary"
                                sx={{
                                    pl: 2
                                }}
                            >
                                {label}
                            </Typography>
                        </Box>
                        <CustomSelect
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputRef={ref}
                            defaultValue={defaultValues}
                            disabled={isDisabled}
                            error={invalid}
                            autoWidth={true}
                            style={style}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        background: "#1F2833",
                                        borderRadius: 0,
                                        maxHeight: 300
                                    },
                                },
                            }}
                        >
                            {
                                options.map((element, index) =>
                                    <MenuItem
                                        key={index}
                                        value={element.value}
                                        sx={{
                                            bgcolor: "primary.main",
                                            "&:hover": {
                                                bgcolor:"primary.secondary"
                                            },
                                            "&.Mui-selected": {
                                                bgcolor: "secondary.main",
                                                "&:hover" : {
                                                    bgcolor:"secondary.dark"
                                                }
                                            }
                                        }}
                                    >
                                        {element.label}
                                    </MenuItem>
                                )
                            }
                        </CustomSelect>
                    </FormControl>
                )
            }}
            name={name}
            control={control}
            rules={rules}
        />
    )
}