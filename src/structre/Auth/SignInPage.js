import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    Typography
} from "@mui/material";
import {Form} from "react-router-dom";
import {MyButton} from "../components/MyButton";
import React from "react";
import {useAuth} from "./useAuth";
import {useForm} from "react-hook-form";
import {InputWithValidation} from "../components/FormComponents/InputWithValidation";
import {login_validation, password_validation} from "./AuthUtils";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignInPage(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const {handleSubmit,
        control,
        setError,
        formState: {errors}
    } = useForm({
        mode: "onChange",
        defaultValues: {
            login: "",
            password: ""
        }
    });
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {login} = useAuth();

    function myHandleSubmit(data) {
        let response;
        if (data.login.includes("@")) {
            response = login({
                email: data.login,
                password: data.password
            })
        } else {
            response = login({
                login: data.login,
                password: data.password
            })
        }
        (async () => {
            let innerResponse = await response;
            if (innerResponse) {
                setError('root.serverError', {
                    type: innerResponse.statusCode,
                    message: innerResponse.data.message
                });
                setError("login",
                    {
                        type: "custom",
                        message: "invalid"
                    });
                setError("password",
                    {
                        type: "custom",
                        message: "invalid"
                    });
            }
        })()
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
                    Sign in
                </Typography>
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
                            {errors.root.serverError.message}
                        </Typography>
                    </Box>
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
                            Sign in
                        </Typography>
                    </MyButton>
                </Box>
            </Form>
        </Grid>
    )
}