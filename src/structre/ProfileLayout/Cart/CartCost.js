import React, {memo, useContext, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {UserContext, UserFunctionsContext} from "../../ShopSection/UserContext";
import {MyButton} from "../../components/MyButton";
import {useForm} from "react-hook-form";
import {Form} from "react-router-dom";
import {SelectWithValidation} from "../../components/FormComponents/SelectWithValidation";
import {card_validation} from "../../Auth/AuthUtils";
import _ from "lodash";

export const CartCost = memo(function CartCost({}) {
    const {user: {shoppingCart, payments}} = useContext(UserContext),
        {setters: {checkoutOrder}} = useContext(UserFunctionsContext);

    const rawPrice = shoppingCart.reduce((sum, value) => sum + value.cost, 0),
        totalCost = shoppingCart.reduce((sum, value) => sum + value.cost * (100 - value.discount) / 100, 0),
        totalDiscount = Math.round((rawPrice - totalCost) / rawPrice * 100) || 0;

    const {
        control,
        setError,
        getValues,
        formState: {errors, isDirty},
    } = useForm({
            mode: "all",
            defaultValues: {
                card: !_.isEmpty(payments) ? payments[0].id : -1
            },
        }
    )

    async function handleOrderSubmit() {
        if (!getValues("card")) {
            setError("root", {
                message: "required"
            })
            return;
        }

        if (getValues("card") === -1) {
            setError("root", {
                message: "You don't have cards"
            })
            return;
        }

        const error = await checkoutOrder();

        if (error) {
            setError("root", {
                message: error.data.message
            })
        }
    }

    return (
        <Box
            sx={{
                bgcolor: "rgba(151, 151, 151, 0.25)",
                py: 3,
                px: 3,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                gap: 1
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="cost18"
                    color="text.primary"
                >
                    Full prise
                </Typography>
                <Typography
                    variant="cost18"
                    sx={{
                        color: "accent.third"
                    }}
                >
                    ${rawPrice}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="cost18"
                    color="text.primary"
                >
                    Discount
                </Typography>
                <Typography
                    variant="cost18"
                    color="text.tertiary"
                >
                    -{totalDiscount}%
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="cost18"
                    color="text.primary"
                >
                    Taxes
                </Typography>
                <Typography
                    variant="cost18"
                    sx={{
                        color: "accent.fourth"
                    }}
                >
                    $25
                </Typography>
            </Box>
            <Box
                sx={{
                    height: 2,
                    bgcolor: "secondary.main",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="cost18"
                    color="text.primary"
                >
                    Total prise
                </Typography>
                <Typography
                    variant="cost18"
                    sx={{
                        color: "accent.third"
                    }}
                >
                    ${Math.round((totalCost + Number.EPSILON) * 100) / 100 + 25}
                </Typography>
            </Box>
            <Form
                noValidate
            >
                <SelectWithValidation
                    {...card_validation}
                    options={
                        !_.isEmpty(payments) ?
                            payments.map((payment) => ({
                                label: `**** ${payment.number.slice(12)}`,
                                value: payment.id
                            }))
                            :
                            [{
                                label: `No card`,
                                value: -1
                            }]
                    }
                    control={control}
                />
                {
                    Boolean(errors.root) &&
                    <Box
                        sx={{
                            marginTop: "15px",
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
                <MyButton
                    height="59px"
                    main_color={"#45A29E"}
                    hover_color={"#66FCF1"}
                    click_handler={() => handleOrderSubmit()}
                    style={{
                        marginTop: "15px",
                        flexDirection: "column",
                        alignItems: "stretch",
                        padding: 0
                    }}
                >
                    <Typography
                        variant="body14"
                        color="text.primary"
                        sx={{
                            px: 5
                        }}
                    >
                        Checkout
                    </Typography>
                </MyButton>
            </Form>

        </Box>
    )
})