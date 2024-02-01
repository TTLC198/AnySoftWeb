import {
    Box,
    FormControl,
    InputBase,
    Typography
} from "@mui/material";
import {Controller} from "react-hook-form";
import {styled} from "@mui/material/styles";
import React from "react";

const CustomInput = styled((props) => (<InputBase {...props}/>))(({ theme }) => ({
    marginTop: theme.spacing(1),
    '& .MuiInputBase-input': {
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

export function InputWithValidation(
    {
        control,
        name,
        label = undefined,
        placeholder,
        type,
        rules,
        isDisabled = false,
        endAdornment,
        multiline = false,
        minRows = 1
    }) {
    return (
        <Controller
            render={({
                         field: { onChange, onBlur, value, name, ref },
                         fieldState: { invalid, isTouched, isDirty, error , defaultValues},
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
                            {
                                invalid && <Typography
                                    variant="h2"
                                    sx={{
                                        color: "accent.danger"
                                    }}
                                >
                                    {error.message}
                                </Typography>
                            }
                        </Box>
                        <CustomInput
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputRef={ref}
                            defaultValue={defaultValues}
                            disabled={isDisabled}
                            type={type}
                            placeholder={placeholder}
                            focused={true}
                            endAdornment={endAdornment}
                            multiline={multiline}
                            minRows={minRows}
                        />
                    </FormControl>
                )
            }}
            name={name}
            control={control}
            rules={rules}
        />
    );
}