import React from "react";
import {useForm} from "react-hook-form";
import {Box, Grid, IconButton, InputAdornment, Typography} from "@mui/material";
import {Form, useNavigate} from "react-router-dom";
import {InputWithValidation} from "../components/FormComponents/InputWithValidation";
import {email_validation, login_validation, password_validation, repeat_password_validation} from "./AuthUtils";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {MyButton} from "../components/MyButton";
import {postUser} from "../api";
import {useAuth} from "./useAuth";

export default function SignUpPage(props) {
    const {axiosInstance} = useAuth();

    const [showPassword, setShowPassword] = React.useState(false),
        [showRepPassword, setShowRepPassword] = React.useState(false);

    const {handleSubmit,
        control,
        getValues,
        setError,
        formState: {errors}
    } = useForm({
        mode: "onChange",
        defaultValues: {
            login: "",
            email: "",
            password: "",
            repeat_password: ""
        }
    });
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepPassword = () => setShowRepPassword((show) => !show);
    const navigate = useNavigate();

    const myHandleSubmit = async () => {
        const response = await postUser(axiosInstance, getValues());
        if (!response)
            navigate("/authorization/signin");
        else {
            setError('root.serverError', {
                type: response.error,
                message: response.data.message
            });
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
        }
    }


    return (
        <Grid
            item
            xs={6}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "center",
                bgcolor: "background.primary",
                py: 4,
                px: 7,
                gap: 3
            }}
        >
            <Box
                sx={{
                    textAlign: "center"
                }}
            >
                <Typography
                    variant="h2_64"
                    color="text.tertiary"
                >
                    Sign up
                </Typography>
            </Box>
            {
                Boolean(errors.root) ?
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
                            {errors.root.serverError.message}
                        </Typography>
                    </Box>
                    :
                    null
            }
            <Form
                onSubmit={handleSubmit(myHandleSubmit)}
                method="post"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: "15px"
                }}
                noValidate
            >
                <InputWithValidation
                    {...login_validation}
                    control={control}
                />
                <InputWithValidation
                    {...email_validation}
                    control={control}
                />
                <InputWithValidation
                    {...password_validation}
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
                <InputWithValidation
                    {...repeat_password_validation}
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
                <Box
                    sx={{
                        marginTop: "15px",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <MyButton
                        height="53px"
                        main_color={"#45A29E"}
                        hover_color={"#66FCF1"}
                        angle={-6 * Math.PI / 18}
                        style={{
                            padding: 0,
                        }}
                        type="submit"
                    >
                        <Typography
                            variant="navLink"
                            color="text.primary"
                        >
                            Sign up
                        </Typography>
                    </MyButton>
                </Box>
            </Form>
        </Grid>
    )
}