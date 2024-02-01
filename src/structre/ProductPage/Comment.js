import {Avatar, Box, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import MyRating from "../components/MyRating";
import {baseURL} from "../../generalUtilities";

export default function Comment(props) {
    const [isReadMore, setIsReadMore] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const overflowRef = useRef(null);

    useEffect(() => {
        const element = overflowRef.current;
        if (element) {
            setIsOverflowed(element.offsetHeight < element.scrollHeight);
        }
    }, [isOverflowed])

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
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px"
                }}
            >
                <Avatar src={baseURL + props.comment.user.image}
                        sx={{
                            width: 150,
                            height: 150
                        }}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        variant="body18"
                        color="text.primary"
                    >
                        {
                            props.comment.name || "Comment's name"
                        }
                    </Typography>
                    <Typography
                        variant="body14"
                        color="text.secondary"
                    >
                        {props.comment.user.login}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <MyRating
                            width={120}
                            gap={5}
                            grade={props.comment.grade}
                            max_grade={5}
                            color={"#E85100"}
                            borderWidth={0.5}
                            name={`Comment_${props.comment.user.login}_${props.comment.ts}_`}
                        />
                        <Typography
                            variant="body18"
                            sx={{
                                color: "accent.danger"
                            }}
                        >
                            {Math.round((props.comment.grade + Number.EPSILON) * 100) / 100}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body14"
                        color="text.secondary"
                    >
                        Posted {
                        new Intl.DateTimeFormat("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).format(new Date(props.comment.ts))}
                    </Typography>
                </Box>
            </Box>
            <Box
                ref={overflowRef}
                sx={{
                    maxHeight: isReadMore ? null : "400px",
                    overflow: "hidden",
                    whiteSpace: "pre-line"
                }}
            >
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    {props.comment.text}
                </Typography>
            </Box>
            {
                isOverflowed && (
                    <Button
                        onClick={() => {
                            setIsReadMore(true);
                            setIsOverflowed(false);
                        }}
                        sx={{
                            zIndex: 1000,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            variant="body14"
                            color="text.primary"
                        >
                            Read more
                        </Typography>
                        <ExpandMoreIcon
                            sx={{
                                color: "secondary.main",
                                fontSize: 30
                            }}
                        />
                    </Button>
                )
            }
        </Box>
    )
}