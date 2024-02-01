import React, {memo, useContext, useRef, useState} from "react";
import {Box, Grid, Paper, Stack, Typography} from "@mui/material";
import {CustomStepper} from "./CustomStepper";
import {GeneralInformation} from "./GeneralInformation";
import {MyButton} from "../../../components/MyButton";
import {Form, useLocation, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import _ from "lodash";
import {ImageForm} from "./ImageForm/ImageForm";
import {DescriptionForm} from "./DescriptionForm";
import {SubmitForm} from "./SubmitForm";
import {useAuth} from "../../../Auth/useAuth";
import {GeneralContext} from "../../../GeneralLayout";
import {
    deleteGenres, deleteImages,
    deleteProperties,
    getIdList,
    postGenres,
    postImages,
    postProperties,
} from "./ProductCreatorUtils";
import {baseURL} from "../../../../generalUtilities";
import {UserFunctionsContext} from "../../../ShopSection/UserContext";
import ErrorPage from "../../../utils/ErrorPage";

const steps = [
    {
        label: "General info"
    },
    {
        label: "Images"
    },
    {
        label: "Description"
    },
    {
        label: "Final step"
    },
]

export const ProductCreatorContainer = memo(() => {
    const {axiosInstance} = useAuth(),
        {genres, properties} = useContext(GeneralContext),
        {dispatch} = useContext(UserFunctionsContext);

    const {state} = useLocation();

    console.log(state)

    const methods = useForm({
        defaultValues: {
            name: state?.name || "",
            cost: state?.cost || "",
            discount: state ? state.discount : "",
            genres: state?.genres ? getIdList(genres, state.genres) : [],
            properties: state?.properties ? getIdList(properties, state.properties) : [],
            images: state?.images ? _.map(state.images, (imageUrl, index) => {
                return {
                    id: index,
                    name: imageUrl.split("/").slice(-1)[0],
                    img: baseURL + imageUrl
                }
            }) : [],
            description: state?.description || ""
        },
        mode: "all"
    });

    const [activeStep, setActiveStep] = useState(0);

    const submitRef = useRef(null);

    const navigate = useNavigate();

    async function handleProductSubmit(data) {
        console.log(data)
        try {
            if (state?.id) {
                const newProduct = (await axiosInstance.put("/api/products", {
                    id: state.id,
                    name: data.name,
                    cost: data.cost,
                    discount: data.discount,
                    description: data.description
                })).data;

                const chosenGenres = genres.filter((element) => data.genres.includes(element.id) ? element : null),
                    chosenProperties = properties.filter((element) => data.properties.includes(element.id) ? element : null),
                    prevGenres = getIdList(genres, state.genres),
                    prevProperties = getIdList(properties, state.properties);

                deleteGenres(prevGenres, newProduct.id, axiosInstance);
                deleteProperties(prevProperties, newProduct.id, axiosInstance);
                await deleteImages(newProduct.id, axiosInstance);

                postGenres(chosenGenres, newProduct.id, axiosInstance);
                postProperties(chosenProperties, newProduct.id, axiosInstance);
                postImages(data.images, newProduct.id, axiosInstance);
            } else {
                const newProduct = (await axiosInstance.post("/api/products", {
                    name: data.name,
                    cost: data.cost,
                    discount: data.discount,
                    description: data.description
                })).data

                const chosenGenres = genres.filter((element) => data.genres.includes(element.id) ? element : null),
                    chosenProperties = properties.filter((element) => data.properties.includes(element.id) ? element : null);

                postGenres(chosenGenres, newProduct.id, axiosInstance);
                postProperties(chosenProperties, newProduct.id, axiosInstance);
                postImages(data.images, newProduct.id, axiosInstance);

                dispatch({
                    type: "addOwnedProduct",
                    product: newProduct.id
                })
            }

            navigate("/profile/sellerProducts", {replace: true})
        } catch (error) {
            methods.setError("serverError", {
                message: error.response.data.message
            })
        }
    }

    return (
        <Stack spacing={2}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="h2_64"
                    color="text.tertiary"
                >
                    New product
                </Typography>
                <MyButton
                    height={"53px"}
                    main_color={"#FC7872"}
                    hover_color={"#E85100"}
                    style={{
                        padding: 0
                    }}
                    click_handler={() => navigate("/profile/sellerProducts", {replace: true})}
                >
                    <Typography
                        variant="body14"
                        color={"text.primary"}
                    >
                        Exit
                    </Typography>
                </MyButton>
            </Box>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <Paper
                        elevation={5}
                        sx={{
                            bgcolor: "primary.secondary",
                            pt: 3,
                            pb: 3,
                            px: 3
                        }}
                    >
                        <CustomStepper
                            activeStep={activeStep}
                            steps={steps}
                        />
                        {
                            Boolean(methods.formState.errors.serverError) &&
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
                                    {methods.formState.errors.serverError?.message}
                                </Typography>
                            </Box>
                        }
                        <FormProvider
                            {...methods}
                        >
                            <Form
                                noValidate
                                style={{
                                    marginTop: "20px"
                                }}
                                ref={submitRef}
                            >
                                <Box>
                                    {(() => {
                                        switch (activeStep) {
                                            case 0:
                                                return <GeneralInformation/>;
                                            case 1:
                                                return <ImageForm/>;
                                            case 2:
                                                return <DescriptionForm/>;
                                            case 3:
                                                return <SubmitForm/>;
                                            default:
                                                return <ErrorPage/>;
                                        }
                                    })()}
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 4
                                    }}
                                >
                                    {
                                        activeStep === 0 ?
                                            <MyButton
                                                height={"53px"}
                                                main_color={"#8b8b8b"}
                                                hover_color={"#8b8b8b"}
                                                style={{
                                                    padding: 0
                                                }}
                                            >
                                                <Typography
                                                    variant="body14"
                                                    color={"text.primary"}
                                                >
                                                    Back
                                                </Typography>
                                            </MyButton>
                                            :
                                            <MyButton
                                                height={"53px"}
                                                main_color={"#45A29E"}
                                                hover_color={"#66FCF1"}
                                                style={{
                                                    padding: 0
                                                }}
                                                click_handler={() => setActiveStep(prevState => prevState - 1)}
                                            >
                                                <Typography
                                                    variant="body14"
                                                    color={"text.primary"}
                                                >
                                                    Back
                                                </Typography>
                                            </MyButton>
                                    }
                                    {
                                        activeStep === steps.length - 1 ?
                                            <MyButton
                                                height={"53px"}
                                                main_color={"#45A29E"}
                                                hover_color={"#66FCF1"}
                                                style={{
                                                    padding: 0
                                                }}
                                                onClick={() => handleProductSubmit(methods.getValues())}
                                            >
                                                <Typography
                                                    variant={"body14"}
                                                    color={"text.primary"}
                                                >
                                                    Submit
                                                </Typography>
                                            </MyButton>
                                            :
                                            <MyButton
                                                height={"53px"}
                                                main_color={"#45A29E"}
                                                hover_color={"#66FCF1"}
                                                style={{
                                                    padding: 0
                                                }}
                                                click_handler={async () => {
                                                    if (await methods.trigger())
                                                        setActiveStep(prevState => prevState + 1)
                                                }}
                                            >
                                                <Typography
                                                    variant={"body14"}
                                                    color={"text.primary"}
                                                >
                                                    Next
                                                </Typography>
                                            </MyButton>
                                    }
                                </Box>
                            </Form>
                        </FormProvider>
                    </Paper>
                </Grid>
            </Grid>
        </Stack>
    )
})