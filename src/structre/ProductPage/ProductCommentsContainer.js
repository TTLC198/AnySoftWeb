import {Box, Typography} from "@mui/material";
import {memo, useContext, useEffect, useRef, useState} from "react";
import {Spring, animated} from "react-spring";
import Comment from "./Comment";
import ProductComments from "./ProductComments";
import {MyButton} from "../components/MyButton";
import {UserContext} from "../ShopSection/UserContext";
import {CommentForm} from "./CommentForm";
import _ from "lodash";

export const ProductCommentsContainer = memo(function ProductCommentsContainer({
                                                                                   productId,
                                                                                   productStatus,
                                                                                   width,
                                                                                   comments,
                                                                                   first_length,
                                                                                   margin
                                                                               }) {
    const {user: {user}} = useContext(UserContext);

    const [shownNumber, setShownNumber] = useState(0),
        [height, setHeight] = useState({
            actual: 0,
            desired: 0,
        }),
        [innerComments, setInnerComments] = useState([]);

    const commentsRef = useRef(null),
        [usersCommentId, setUsersCommentId] = useState(-1);

    useEffect(
        () => setUsersCommentId(
            _.findIndex(innerComments,
                (comment) => comment.user.id === user?.id
            )
        ), [innerComments, user])

    useEffect(() => setInnerComments(comments), [comments])

    useEffect(() => {
        if (innerComments.length > 0)
            setShownNumber(first_length);
    }, [innerComments, first_length])

    useEffect(() => {
        if (commentsRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setHeight({...height, desired: entry.contentRect.height});
                }
            });
            resizeObserver.observe(commentsRef.current);
        }
    }, [commentsRef])

    async function getMoreComments(params) {
        setShownNumber(prevState => prevState + 1);
    }

    return (
        <Box
            sx={{
                width: width,
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}
            >
                <Box
                    sx={{
                        mx: `${margin}px`
                    }}
                >
                    <Typography
                        variant="h2_64"
                        color="text.accent"
                    >
                        Reviews
                    </Typography>
                </Box>
                {
                    (productStatus === "owned" && usersCommentId === -1) &&
                    <Box
                        sx={{
                            width: width - margin * 2,
                            display: "flex",
                            mx: `${margin}px`
                        }}
                    >
                        <CommentForm
                            productId={productId}
                            add_comment={setInnerComments}
                        />
                    </Box>
                }

                <Spring from={{innerHeight: height.actual}} to={{innerHeight: height.desired}}
                        onRest={() => setHeight({...height, actual: height.desired})}>
                    {({innerHeight}) => {
                        const AnimatedProductComments = animated(ProductComments);
                        return (
                            <AnimatedProductComments
                                width={width}
                                height={innerHeight}
                            >
                                <Box
                                    sx={{
                                        width: width - margin * 2,
                                        mx: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4
                                    }}
                                    ref={commentsRef}
                                >
                                    {
                                        shownNumber === 0 ?
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography
                                                    variant="h2_32"
                                                    color="text.primary"
                                                >
                                                    No reviews ;(
                                                </Typography>
                                            </Box>
                                            :
                                            <>
                                                {

                                                    innerComments.slice(0, shownNumber * 2).map((comment, index) => (
                                                        <>
                                                            {
                                                                comment.user.id === user?.id ?
                                                                    <CommentForm
                                                                        key={index}
                                                                        productId={productId}
                                                                        commentId={comment.id}
                                                                        commentName={"Comment's name"}
                                                                        commentText={comment.text}
                                                                        commentGrade={comment.grade}
                                                                        add_comment={setInnerComments}
                                                                    />
                                                                    :
                                                                    <Comment
                                                                        key={index}
                                                                        id={index}
                                                                        comment={comment}
                                                                    />
                                                            }
                                                        </>
                                                    ))
                                                }
                                            </>
                                    }
                                </Box>
                            </AnimatedProductComments>
                        )
                    }}
                </Spring>

            </Box>
            {
                innerComments.length > shownNumber * 2 &&
                (
                    <MyButton
                        height="53px"
                        main_color={"#45A29E"}
                        hover_color={"#66FCF1"}
                        click_handler={() => getMoreComments()}
                    >
                        <Typography
                            variant="body18"
                            color="text.primary"
                        >
                            See more reviews ({innerComments.length - shownNumber * 2})
                        </Typography>
                    </MyButton>
                )
            }
        </Box>
    )
})