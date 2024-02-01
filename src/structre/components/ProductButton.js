import React, {forwardRef} from "react";
import {Box, Typography} from "@mui/material";
import {MyButton} from "./MyButton";

export const ProductButton = forwardRef(({
                                             product,
                                             padding_x,
                                             cart_setter,
    textVariant,
                                             ...rest
                                         }, ref) => {
    return (
        <Box
            ref={ref}
        >
            {
                product.status === "none" ?
                    <MyButton
                        main_color={"#45A29E"}
                        hover_color={"#66FCF1"}
                        click_handler={(event) => {
                            event.stopPropagation();
                            cart_setter(product)
                        }}
                        {...rest}
                    >
                        <Typography
                            className="NavLinkText"
                            textAlign="center"
                            variant={textVariant ? textVariant : "navLink"}
                            color="text.primary"
                            sx={{
                                paddingX: padding_x
                            }}
                        >
                            Buy
                        </Typography>
                    </MyButton>
                    :
                    product.status === "cart" ?
                        <MyButton
                            main_color={"#8b8b8b"}
                            hover_color={"#FC7872"}
                            click_handler={(event) => {
                                event.stopPropagation();
                                cart_setter(product)
                            }}
                            {...rest}
                        >
                            <Typography
                                className="NavLinkText"
                                textAlign="center"
                                variant={textVariant ? textVariant : "navLink"}
                                color="text.primary"
                                sx={{
                                    paddingX: padding_x
                                }}
                            >
                                In cart
                            </Typography>
                        </MyButton>
                        :
                        <MyButton
                            main_color={"#8b8b8b"}
                            hover_color={"#8b8b8b"}
                            {...rest}
                        >
                            <Typography
                                className="NavLinkText"
                                textAlign="center"
                                variant={textVariant ? textVariant : "navLink"}
                                color="text.primary"
                                sx={{
                                    paddingX: padding_x
                                }}
                            >
                                Owned
                            </Typography>
                        </MyButton>
            }
        </Box>
    )
})