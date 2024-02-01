import React, {memo, useCallback, useContext, useEffect} from "react";
import {Box, Grid, IconButton, InputAdornment, Typography} from "@mui/material";
import {Form} from "react-router-dom";
import {InputWithValidation} from "../../components/FormComponents/InputWithValidation";
import {
    password_validation,
    repeat_password_validation
} from "../../Auth/AuthUtils";
import {MyButton} from "../../components/MyButton";
import {useForm} from "react-hook-form";
import {useAuth} from "../../Auth/useAuth";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {putUser} from "../../api";
import {UserContext} from "../../ShopSection/UserContext";

export const PasswordChange = memo(function PasswordChange({...rest}) {
    const {axiosInstance} = useAuth(),
        {user:{user}} = useContext(UserContext);

    const [showPassword, setShowPassword] = React.useState(false),
        [showRepPassword, setShowRepPassword] = React.useState(false),
        [isSuccess, setIsSuccess] = React.useState(false);

    const {
        handleSubmit,
        control,
        setError,
        getValues,
        formState: {isSubmitSuccessful},
        reset
    } = useForm({
            mode: "onChange",
            defaultValues: {
                password: "",
                repeat_password: ""
            },
        }
    )

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepPassword = () => setShowRepPassword((show) => !show);

    const passwordSubmitHandler = async () => {
        const response = await putUser(axiosInstance, {
            id: user.id,
            login: user.login,
            email: user.email,
            password: getValues("password"),
        });
        if (response) {
            setError('root.serverError', {
                type: response.error,
                message: response.data.message
            });
            setError("password",
                {
                    type: "custom",
                    message: "invalid"
                });
            setError("repeat_password",
                {
                    type: "custom",
                    message: "invalid"
                });
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            setIsSuccess(true);
            reset({
                password: "",
                repeat_password: ""
            });
        }
    }, [isSubmitSuccessful]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 2,
                px: 4,
                py: 3
            }}
            onClick={()=> setIsSuccess(false)}
        >
            <Typography
                variant="h2_64"
                color="text.tertiary"
            >
                Change password
            </Typography>
            {
                isSuccess &&
                    <Box
                        sx={{
                            border: 2,
                            borderColor: "tertiary.main",
                            borderRadius: 3,
                            py: 2,
                            px: 3
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                color: "tertiary.main"
                            }}
                        >
                            Password changed successfully
                        </Typography>
                    </Box>
            }
            <Form
                onSubmit={handleSubmit(passwordSubmitHandler)}
                method="put"
                noValidate
            >
                <Grid container
                      sx={{
                          gap: 1
                      }}
                >
                    <Grid container>
                        <Grid item xs={7}>
                            <InputWithValidation
                                {...password_validation}
                                label="New password"
                                control={control}
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {
                                                !showPassword ?
                                                    <VisibilityOff
                                                        fontSize="large"
                                                        sx={{
                                                            color: "text.primary"
                                                        }}
                                                    />
                                                    :
                                                    <Visibility
                                                        fontSize="large"
                                                        sx={{
                                                            color: "text.primary"
                                                        }}
                                                    />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={7}>
                            <InputWithValidation
                                {...repeat_password_validation}
                                label="Repeat new password"
                                control={control}
                                rules={{
                                    ...repeat_password_validation.rules,
                                    validate: (value, formValue) => value === formValue.password || "passwords should match"
                                }}
                                type={showRepPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowRepPassword}
                                        >
                                            {
                                                !showRepPassword ?
                                                    <VisibilityOff
                                                        fontSize="large"
                                                        sx={{
                                                            color: "text.primary"
                                                        }}
                                                    />
                                                    :
                                                    <Visibility
                                                        fontSize="large"
                                                        sx={{
                                                            color: "text.primary"
                                                        }}
                                                    />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
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
                                    setIsSuccess(false);
                                    reset({
                                        password: "",
                                        repeat_password: ""
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
                    </Grid>
                </Grid>
            </Form>
        </Box>
    )
})