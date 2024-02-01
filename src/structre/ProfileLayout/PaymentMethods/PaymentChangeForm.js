import React, {memo, useContext} from "react";
import {Form, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Grid, Paper, Stack, Typography} from "@mui/material";
import {InputWithValidation} from "../../components/FormComponents/InputWithValidation";
import {
    card_name_validation,
    card_number_validation,
    card_month_validation,
    card_year_validation,
    card_cvc_validation
} from "../../Auth/AuthUtils";
import {SelectWithValidation} from "../../components/FormComponents/SelectWithValidation";
import {MyButton} from "../../components/MyButton";
import {UserFunctionsContext} from "../../ShopSection/UserContext";

export const PaymentChangeForm = memo(() => {
    const {setters: {setCard}} = useContext(UserFunctionsContext);

    const {state} = useLocation();

    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        setError,
        reset
    } = useForm({
            mode: "onChange",
            defaultValues: {
                number: state.number || "",
                cardName: state.cardName || "",
                month: state.expirationDate ? (new Date(state.expirationDate)).getMonth() : new Date().getMonth(),
                year: state.expirationDate ? (new Date(state.expirationDate)).getFullYear() : new Date().getFullYear(),
                cvc: state.cvc || ""
            },
        }
    )

    const cardHandleSubmit = async (data) => {
        const cardData = {
            number: data.number,
            cardName: data.cardName,
            expirationDate: new Date(data.year, data.month),
            cvc: data.cvc
        }
        if (state.id) {
            const response = await setCard("update", {...cardData, id: state.id});
            if (response.success)
                navigate("/profile/payments", {replace: true});
            else
                console.error(response);
        } else {
            const response = await setCard("create", cardData);
            if (response.success)
                navigate("/profile/payments", {replace: true});
            else
                console.error(response);
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid item xs/>
            <Grid item xs={8}>
                <Form
                    onSubmit={handleSubmit(cardHandleSubmit)}
                    method="post"
                    noValidate
                >
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={2}
                    >
                        <Paper
                            elevation={5}
                            sx={{
                                bgcolor: "primary.secondary",
                                pt: 3,
                                pb: 5,
                                px: 5
                            }}
                        >
                            <Stack
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="stretch"
                                spacing={2}
                            >
                                <InputWithValidation
                                    {...card_number_validation}
                                    control={control}
                                />
                                <InputWithValidation
                                    {...card_name_validation}
                                    control={control}
                                />
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2
                                        }}
                                    >
                                        <SelectWithValidation
                                            {...card_month_validation}
                                            control={control}
                                        />
                                        <SelectWithValidation
                                            {...card_year_validation(new Date().getFullYear())}
                                            control={control}
                                            style={{
                                                width: "140px"
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 95
                                        }}
                                    >
                                        <InputWithValidation
                                            {...card_cvc_validation}
                                            control={control}
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Paper>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                sx={{
                                    px: 0
                                }}
                            >
                                <MyButton
                                    height="53px"
                                    main_color={"#45A29E"}
                                    hover_color={"#66FCF1"}
                                    type="submit"
                                >
                                    <Typography
                                        variant="navLink"
                                        color="text.primary"
                                    >
                                        Save
                                    </Typography>
                                </MyButton>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    px: 0,
                                    ml: "-15px"
                                }}
                            >
                                <MyButton
                                    height="53px"
                                    main_color={"#FC7872"}
                                    hover_color={"#E85100"}
                                    click_handler={() => {
                                        reset({
                                            number: "",
                                            cardName: "",
                                            month: new Date().getMonth(),
                                            year: new Date().getFullYear(),
                                            cvc: ""
                                        });
                                        navigate("/profile/payments", {replace: true});
                                    }}
                                >
                                    <Typography
                                        variant="navLink"
                                        color="text.primary"
                                    >
                                        Cancel
                                    </Typography>
                                </MyButton>
                            </Grid>
                        </Grid>
                    </Stack>
                </Form>
            </Grid>
            <Grid item xs/>
        </Grid>
    )
})