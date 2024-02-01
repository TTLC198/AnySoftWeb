import React, {memo, useContext, useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {InputWithValidation} from "../../components/FormComponents/InputWithValidation";
import {email_validation, login_validation} from "../../Auth/AuthUtils";
import {MyButton} from "../../components/MyButton";
import {Form} from "react-router-dom";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import {useForm} from "react-hook-form";

export const AccountInfoForm = memo(({}) => {

    const [isChanging, setIsChanging] = useState(false);

    const {user: {user}} = useContext(UserContext),
        {setters: {setUser}} = useContext(UserFunctionsContext);
    const {
        handleSubmit,
        control,
        setError,
        getValues,
        formState: {isSubmitSuccessful, isDirty},
        reset
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            login: user.login,
            email: user.email
        }
    });

    const userSubmitHandler = async () => {
        if (isDirty) {
            const response = await setUser(getValues());
            if (response.type !== 200) {
                setError('root.serverError', response);
                setError("login",
                    {
                        type: "custom",
                        message: "invalid"
                    });
                setError("email",
                    {
                        type: "custom",
                        message: "invalid"
                    });
            } else {
                setIsChanging(false);
            }
        } else {
            reset({
                login: user.login,
                email: user.email
            });
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                login: user.login,
                email: user.email
            });
        }
    }, [isSubmitSuccessful, isDirty, reset]);

    return (
        <Form
            onSubmit={handleSubmit(userSubmitHandler)}
            method="put"
            noValidate
        >
            <Grid container
                  sx={{
                      gap: 1
                  }}>
                <Grid
                    container
                >
                    <Grid item xs={4}>
                        <Typography
                            variant="body18"
                            color="text.secondary"
                        >
                            Account id:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body18"
                            color="text.secondary"
                        >
                            {user.id}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <Typography
                            variant="body18"
                            color="text.secondary"
                        >
                            Login:
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <InputWithValidation
                            {...login_validation}
                            label={undefined}
                            isDisabled={!isChanging}
                            control={control}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <Typography
                            variant="body18"
                            color="text.secondary"
                        >
                            Email:
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <InputWithValidation
                            {...email_validation}
                            label={undefined}
                            isDisabled={!isChanging}
                            control={control}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    {
                        isChanging
                            ?
                            <>
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
                                            setIsChanging(false);
                                            reset({
                                                login: user.login,
                                                email: user.email
                                            });
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
                            </>
                            :
                            <>
                                <Grid item>
                                    <MyButton
                                        height="53px"
                                        main_color={"#45A29E"}
                                        hover_color={"#66FCF1"}
                                        click_handler={() => setIsChanging(true)}
                                    >
                                        <Typography
                                            variant="navLink"
                                            color="text.primary"
                                        >
                                            Edit profile
                                        </Typography>
                                    </MyButton>
                                </Grid>
                            </>
                    }
                </Grid>
            </Grid>
        </Form>
    )
})