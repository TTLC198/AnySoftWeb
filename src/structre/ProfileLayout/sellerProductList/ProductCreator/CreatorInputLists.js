import {Controller} from "react-hook-form";
import {Box, Checkbox, FormControl, FormControlLabel, InputBase, Paper, Typography} from "@mui/material";
import React from "react";

export function CreatorInputLists(
    {
        control,
        name,
        label = undefined,
        list,
        rules,
        handleCheck,
        defaultValue = []
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
                        style={{
                            width: "100%"
                        }}
                    >
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
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
                            </Box>
                            <Paper
                                elevation={5}
                                sx={{
                                    maxHeight: 300,
                                    display: "flex",
                                    flexDirection: "column",
                                    overflowX: "hidden",
                                    overflowY: "scroll",
                                    bgcolor: "primary.main",
                                    mt: 1,
                                    px: 2
                                }}
                            >
                                {
                                    list.map((element) => {
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            onChange={() => onChange(handleCheck(element.id, name))}
                                                            checked={value.length !== 0 ? value.includes(element.id) : defaultValue.includes(element.id)}
                                                            sx={{
                                                                color: "accent.second",
                                                                '&.Mui-checked': {
                                                                    color: "accent.third",
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    key={element.id}
                                                    label={element.name}
                                                />
                                            )
                                        }
                                    )
                                }
                            </Paper>
                        </Box>

                    </FormControl>
                )
            }}
            name={name}
            control={control}
            rules={rules}
        />
    )
}