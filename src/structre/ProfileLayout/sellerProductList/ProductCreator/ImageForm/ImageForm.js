import React, {memo, useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {
    Box,
    CircularProgress,
    FormControl, IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar, Paper, Stack,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {LoaderContainer} from "./LoaderContainer";
import _ from "lodash";
import {fileToBase64} from "../ProductCreatorUtils";

export const ImageForm = memo(() => {
    const [progress, setProgress] = useState(false);

    const {
        control,
        getValues,
        setValue,
        setError,
        clearErrors,
        formState: {errors},
    } = useFormContext();

    const imageDeleteHandler = (id) => {
        const formImages = getValues("images") || [];

        return formImages.filter((element) => element.id !== id ? element : null)
    }

    const imageUploadHandler = async (event) => {
        clearErrors("images")

        const formImages = getValues("images") || [];

        if (!event)
            return formImages;

        const file = event.target.files[0];

        if (!file.type.includes("image")) {
            setError("images", {
                message: "File should be image type"
            })
            return formImages;
        }

        return [...formImages, {
            id: formImages.length,
            name: file.name,
            img: await fileToBase64(file)
        }]
    }

    return (
        <Controller render={({
                                 field: {onChange, onBlur, value, name, ref},
                                 fieldState: {invalid, isTouched, isDirty, error, defaultValues},
                             }) => {
            console.log(value)
            return (
                <Stack spacing={2}>
                    <ImageList cols={2} gap={8}>
                        {
                            value?.map(
                                (element, index) => {
                                    if (_.isEmpty(element)) {
                                        return (
                                            <LoaderContainer
                                                key={index}
                                            >
                                                <CircularProgress
                                                    size={40}
                                                    thickness={4}
                                                    sx={{
                                                        color: "accent.fourth",
                                                    }}
                                                />
                                            </LoaderContainer>
                                        )
                                    }
                                    return (
                                        <ImageListItem
                                            key={index}
                                            sx={{
                                                bgcolor: "text.primary",
                                                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
                                                aspectRatio: "16 / 9",
                                            }}
                                        >
                                            <img
                                                src={element.img}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                sx={{
                                                    background:
                                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                }}
                                                position="top"
                                                actionIcon={
                                                    <IconButton
                                                        sx={{
                                                            color: 'white',
                                                            "&:hover": {
                                                                color: "accent.danger"
                                                            }
                                                        }}
                                                        onClick={() => onChange(imageDeleteHandler(element.id))}
                                                    >
                                                        <CloseSharpIcon/>
                                                    </IconButton>
                                                }
                                                actionPosition="right"
                                            />
                                        </ImageListItem>
                                    )
                                }
                            )
                        }
                        <ImageListItem>
                            <LoaderContainer>
                                <FormControl
                                    error={invalid}
                                >
                                    {
                                        progress ?
                                            <CircularProgress
                                                size={80}
                                                thickness={4}
                                                sx={{
                                                    color: "accent.fourth",
                                                }}
                                            /> :
                                            <label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{
                                                        display: "none"
                                                    }}
                                                    onChange={ async (event) => onChange( await imageUploadHandler(event))}
                                                />
                                                <Button
                                                    variant="outlined"
                                                    size="medium"
                                                    color="secondary"
                                                    component="span"
                                                    sx={{
                                                        borderRadius: 0,
                                                        bgcolor: "rgba(0, 0, 0, 0.8)",
                                                        textTransform: "none",
                                                        "&:hover": {
                                                            bgcolor: "rgba(0, 0, 0, 0.9)",
                                                        }
                                                    }}

                                                >
                                                    <Typography
                                                        variant="navLink"
                                                        color="text.primary"
                                                    >
                                                        Add image
                                                    </Typography>
                                                </Button>
                                            </label>
                                    }
                                </FormControl>
                            </LoaderContainer>
                        </ImageListItem>
                    </ImageList>
                    {
                        Boolean(errors.images) &&
                        <Box
                            sx={{
                                border: 2,
                                borderColor: "accent.danger",
                                borderRadius: 3,
                                py: 2,
                                px: 3
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    color: "accent.danger"
                                }}
                            >
                                {errors.images?.message}
                            </Typography>
                        </Box>
                    }
                </Stack>
            )
        }}
                    name={"images"}
                    control={control}
                    rules={{
                        validate: (value) => {
                            if (_.isEmpty(value))
                                return "At-least one image is required"
                        }
                    }}
        />

    )
})