import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {Form} from "react-router-dom";
import {useAuth} from "../../Auth/useAuth";
import {baseURL} from "../../../generalUtilities";

export const AccountPhotoForm = memo(() => {
    const {user: {user: {id, image}}} = useContext(UserContext),
        {dispatch} = useContext(UserFunctionsContext),
        {axiosInstance} = useAuth();

    const [width, setWidth] = useState(0),
        [progress, setProgress] = useState(0);

    const widthRef = useRef(null)

    useEffect(() => {
        if (widthRef.current)
            setWidth(widthRef.current.clientWidth)
    }, [])

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        clearErrors
    } = useForm();

    const onUploadProgress = (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total))
    };

    const imageUploadHandler = async (data, event) => {
        clearErrors("root")

        if (!event.target.files[0].type.includes("image")) {
            setError("root", {
                message: "File should be image type"
            })
            return;
        }

        try {
            let formData = new FormData();
            formData.append("image", event.target.files[0]);
            formData.append("userId", id);

            if (image)
                await axiosInstance.delete(`/resources/image/delete/${image.split("/").slice(-1)}`)

            const response = await axiosInstance.post('/resources/image/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress
            })

            dispatch({
                type: "changeMajorData",
                image: response.data
            })
        } catch (serverError) {
            if (serverError.response) {
                setError("root", {
                    message: serverError.response.message
                })
            } else if (serverError.request) {
                console.log(serverError.request);
            } else {
                console.log('Error', serverError.message);
            }
            console.error(serverError.config);
        } finally {
            setProgress(0);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
                my: 2,
                ml: 4,
                position: "relative"
            }}
            ref={widthRef}
        >
            <Box
                sx={{
                    width: width,
                    height: width,
                    borderRadius: "50%",
                    boxShadow: "0px 0px 5px 3px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: image ? `url(${baseURL + image}) center center / cover no-repeat` : "#C5C6C7",
                }}
            >
                <Form
                    method="post"
                    noValidate
                >
                    {
                        progress !== 0 ?
                            <CircularProgress
                                variant="determinate"
                                value={progress}
                                size={80}
                                thickness={4}
                                sx={{
                                    color: "accent.fourth",
                                }}
                            /> :
                            <label>
                                <input
                                    {...register('image')}
                                    type="file"
                                    accept="image/*"
                                    style={{
                                        display: "none"
                                    }}
                                    onChange={handleSubmit(imageUploadHandler)}
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
                                        Change
                                    </Typography>
                                </Button>
                            </label>
                    }
                </Form>
            </Box>
            {
                Boolean(errors.root) &&
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
                        {errors.root?.message}
                    </Typography>
                </Box>
            }
        </Box>
    )
})