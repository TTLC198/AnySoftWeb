import {memo, useContext, useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {UserContext} from "../../ShopSection/UserContext";
import {PaymentCard} from "./PaymentCard";
import {MyButton} from "../../components/MyButton";
import {useNavigate} from "react-router-dom";

export const PaymentsLayout = memo(({}) => {
    const {user: {payments}} = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
        >
            {
                payments && payments.map((element) =>
                    <PaymentCard
                        key={element.id}
                        payment={element}
                    />
                )
            }
            <MyButton
                height="53px"
                main_color="secondary.main"
                hover_color="tertiary.main"
                click_handler={() => navigate("/profile/payments/change", {state: {}})}
            >
                <Typography
                    color="text.primary"
                >
                    Add new card
                </Typography>
            </MyButton>
        </Stack>
    )
})