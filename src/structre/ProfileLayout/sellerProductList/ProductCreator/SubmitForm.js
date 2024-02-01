import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {useFormContext} from "react-hook-form";
import {Box, CircularProgress, ImageList, ImageListItem, List, ListItem, Stack, Typography} from "@mui/material";
import {GeneralContext} from "../../../GeneralLayout";
import {fileToBase64} from "./ProductCreatorUtils";
import _ from "lodash";
import {LoaderContainer} from "./ImageForm/LoaderContainer";

export const SubmitForm = memo(() => {
    const {genres, properties} = useContext(GeneralContext);

    const {
        getValues,
    } = useFormContext();

    const chosenGenres = useRef(genres.filter((element) => getValues("genres").includes(element.id) ? element : null)),
        chosenProperties = useRef(properties.filter((element) => getValues("properties").includes(element.id) ? element : null));

    return (
        <Stack gap={2}>
            <Box>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Name:
                </Typography>
                <Typography
                    variant="body18"
                    sx={{
                        pl: 2,
                        color: "accent.third"
                    }}
                >
                    {getValues("name")}
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Cost:
                </Typography>
                <Typography
                    variant="body18"
                    sx={{
                        pl: 2,
                        color: "accent.third"
                    }}
                >
                    ${getValues("cost")}
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Discount:
                </Typography>
                <Typography
                    variant="body18"
                    sx={{
                        pl: 2,
                        color: "accent.third"
                    }}
                >
                    -{getValues("discount")}%
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Genres:
                </Typography>
                <List dense={true} sx={{
                    py: 0
                }}>
                    {
                        chosenGenres.current.map((element) =>
                            <ListItem key={element.id}>
                                <Typography
                                    variant="body18"
                                    sx={{
                                        pl: 2,
                                        color: "accent.third"
                                    }}
                                >
                                    {element.name}
                                </Typography>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Properties:
                </Typography>
                <List dense={true} sx={{
                    py: 0
                }}>
                    {
                        chosenProperties.current.map((element) =>
                            <ListItem key={element.id}>
                                <Typography
                                    variant="body18"
                                    sx={{
                                        pl: 2,
                                        color: "accent.third"
                                    }}
                                >
                                    {element.name}
                                </Typography>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
            <Box>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Images:
                </Typography>
                <ImageList>
                    {
                        getValues("images").map((image, index) => {
                                if (!image) {
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
                                            src={image.img}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                )
                            }
                        )
                    }
                </ImageList>
            </Box>
            <Stack gap={1}>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Description:
                </Typography>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    {getValues("description")}
                </Typography>
            </Stack>
        </Stack>
    )
})