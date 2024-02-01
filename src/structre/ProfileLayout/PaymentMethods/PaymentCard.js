import {memo, useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {UserFunctionsContext} from "../../ShopSection/UserContext";

export const PaymentCard = memo(({
                                     payment
                                 }) => {
    const {setters: {setCard}} = useContext(UserFunctionsContext);

    const navigate = useNavigate();

    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{
                px: 2,
                py: 1,
                border: 1,
                borderColor: "accent.third"
            }}
        >
            <Grid item>
                <Typography
                    variant="body18"
                    color="text.primary"
                >
                    Visa card ends with {payment.number.slice(12)}
                </Typography>
            </Grid>
            <Grid
                item
                sx={{
                    display: "flex",
                    gap: 2
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        borderRadius: 0
                    }}
                    onClick={() => navigate("/profile/payments/change", {state: payment})}
                >
                    <Typography
                        variant="body18"
                        color="text.primary"
                    >
                        Update
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    color="danger"
                    sx={{
                        borderRadius: 0
                    }}
                    onClick={()=>setCard("delete", payment)}
                >
                    <Typography
                        variant="body18"
                        color="text.primary"
                    >
                        Delete
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )
})