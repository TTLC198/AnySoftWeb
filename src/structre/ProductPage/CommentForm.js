import {useForm} from "react-hook-form";
import {Box, Stack, Typography} from "@mui/material";
import {Form} from "react-router-dom";
import {InputWithValidation} from "../components/FormComponents/InputWithValidation";
import {comments_name_validation, comments_rating_validation, comments_text_validation} from "../Auth/AuthUtils";
import {RatingWithValidation} from "../components/FormComponents/RatingWithValidation";
import React, {useContext, useEffect, useState} from "react";
import {MyButton} from "../components/MyButton";
import {addComment, deleteComment, updateComment} from "../api";
import {useAuth} from "../Auth/useAuth";
import {UserContext} from "../ShopSection/UserContext";

export const CommentForm = ({
                                commentId,
                                productId,
                                commentName,
                                commentGrade,
                                commentText,
                                add_comment
                            }) => {
    const {axiosInstance} = useAuth(),
        {user: {user}} = useContext(UserContext);

    const {
        handleSubmit,
        control,
        setError,
        getValues,
        formState: {isSubmitSuccessful, isDirty, errors},
        reset
    } = useForm({
        mode: "all",
        defaultValues: {
            name: commentName || "",
            grade: commentGrade || 0,
            text: commentText || "",
        }
    });

    const [isEditing, setIsEditing] = useState(!Boolean(commentId));

    const CommentSubmit = async (data) => {
        if (commentId) {
            let commentData = {id: commentId, ...data}
            const response = await updateComment(axiosInstance, commentData);
            if (response.error) {
                setError('root.serverError', response.data);
                return;
            }

            add_comment(prevState => prevState.map(comment => {
                if (comment.id === response.data.id)
                    return {...response.data, user}
                return comment
            }))
            return;
        }
        let commentData = {productId: productId, ...data}
        const response = await addComment(axiosInstance, commentData);
        if (response.error) {
            setError('root.serverError', response.data);
            return;
        }

        console.log("hello")
        add_comment(prevState => [{...response.data, user}].concat(prevState));
    }

    const deleteCommentHandler = async () => {
        if (!commentId)
            return;

        const response = await deleteComment(axiosInstance, commentId)
        if (response) {
            setError('root.serverError', response.data);
            return;
        }

        add_comment(prevState => prevState.filter(comment => {
            if (comment.id !== commentId)
                return comment
        }))
    }

    return (
        <Box
            sx={{
                background: "rgba(123, 123, 123, 0.2)",
                border: 1,
                borderColor: "secondary.main",
                px: 7,
                py: 5,
                display: "flex",
                flexDirection: "column",
                gap: "30px"
            }}
            style={{
                width: !commentId ? "inherit" : ""
            }}
        >
            <Form
                noValidate
            >
                <Stack
                    spacing={2}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                minWidth: 400
                            }}
                        >
                            <InputWithValidation
                                {...comments_name_validation}
                                isDisabled={!isEditing}
                                control={control}
                            />
                            <RatingWithValidation
                                {...comments_rating_validation}
                                isDisabled={!isEditing}
                                control={control}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex"
                                }}
                            >
                                <Box>
                                    {
                                        (!commentId || isEditing) ?
                                            <MyButton
                                                height="53px"
                                                main_color={"#45A29E"}
                                                hover_color={"#66FCF1"}
                                                onClick={() => CommentSubmit(getValues())}
                                            >
                                                <Typography
                                                    variant="navLink"
                                                    color="text.primary"
                                                >
                                                    Submit
                                                </Typography>
                                            </MyButton>
                                            :
                                            <MyButton
                                                height="53px"
                                                main_color={"#45A29E"}
                                                hover_color={"#66FCF1"}
                                                click_handler={() => setIsEditing(true)}
                                            >
                                                <Typography
                                                    variant="navLink"
                                                    color="text.primary"
                                                >
                                                    Update
                                                </Typography>
                                            </MyButton>
                                    }
                                </Box>
                                <Box>
                                    {
                                        (!commentId || isEditing) ?
                                            <MyButton
                                                height="53px"
                                                main_color={"#FC7872"}
                                                hover_color={"#E85100"}
                                                click_handler={() => {
                                                    if (commentId)
                                                        setIsEditing(false);
                                                    reset({
                                                        name: commentName || "",
                                                        grade: commentGrade || 0,
                                                        text: commentText || "",
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
                                            :
                                            <MyButton
                                                height="53px"
                                                main_color={"#FC7872"}
                                                hover_color={"#E85100"}
                                                click_handler={() => {
                                                    deleteCommentHandler()
                                                }}
                                            >
                                                <Typography
                                                    variant="navLink"
                                                    color="text.primary"
                                                >
                                                    Delete
                                                </Typography>
                                            </MyButton>
                                    }
                                </Box>
                            </Box>
                            <Box>
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
                                            {errors.root.message}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Box>

                    </Box>
                    <Box>
                        <InputWithValidation
                            {...comments_text_validation}
                            isDisabled={!isEditing}
                            control={control}
                        />
                    </Box>

                </Stack>
            </Form>
        </Box>
    )
}