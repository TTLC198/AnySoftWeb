import {Box, Input, Slider, Typography, Button, TextField} from "@mui/material";
import React, {memo, useEffect, useState} from "react";
import {serializeToSearchString} from "../api";

export const CostSlider = memo(function CostSlider(props) {
        const [minMaxCost, setMinMaxCost] = useState([0, 0]);

        useEffect(() => {
            setMinMaxCost([props.costRange.min, props.costRange.max]);
        }, [props.costRange])

        function setCostRange(newValue) {
            setMinMaxCost(newValue);
        }

        function submitCostRange() {
            props.set_search_params(prev => serializeToSearchString(prev, {
                key: "cost",
                value: {Min: minMaxCost[0], Max: minMaxCost[1]}
            }));
        }

        function handleBlur() {
            if (minMaxCost[0] < 0) {
                setMinMaxCost([0, minMaxCost[1]]);
            }
        }


        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mx: 4,
                    py: 4,
                    gap: 3
                }}

                onKeyDown={(event) => {
                    if (event.key === "Enter")
                        submitCostRange();
                }}
            >
                <Slider
                    value={minMaxCost}
                    onChange={(event, newValue) => setCostRange(newValue)}
                    color="tertiary"
                    min={0}
                    max={props.costRange.max}
                    valueLabelDisplay="auto"

                />
                <Box
                    sx={{
                        display: "flex",
                        gap: 3
                    }}
                >
                    <TextField
                        label={"Min"}
                        value={minMaxCost[0]}
                        onChange={(event) => setMinMaxCost(prevState => [event.target.value === '' ? '' : Number(event.target.value), prevState[1]])}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 100,
                            min: 0,
                            type: 'number',
                        }}
                        color="secondary"
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: 0,
                                bgcolor: "rgba(201, 201, 201, 0.2)"
                            }
                        }}
                    />
                    <TextField
                        label={"Max"}
                        value={minMaxCost[1]}
                        onChange={(event) => setMinMaxCost(prevState => [prevState[0], event.target.value === '' ? '' : Number(event.target.value)])}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 100,
                            min: 0,
                            type: 'number',
                        }}

                        color="secondary"
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: 0,
                                bgcolor: "rgba(201, 201, 201, 0.2)"
                            }
                        }}
                    />
                </Box>
                <Button
                    onClick={submitCostRange}
                    sx={{
                        bgcolor: 'secondary.main',
                        border: 0,
                        borderRadius: 0,
                        textTransform: 'uppercase',
                        '&:hover': {
                            bgcolor: 'tertiary.main'
                        },
                    }}
                >
                    <Typography
                        variant="navLink"
                        color="text.primary"
                    >
                        Show
                    </Typography>
                </Button>

            </Box>
        )
    },
    (prevProps, nextProps) => {
        return prevProps.costRange.min === nextProps.costRange.min || prevProps.costRange.max === nextProps.costRange.max
    })