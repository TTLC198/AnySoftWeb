import {Paper, Typography} from "@mui/material";
import ProductsLayout from "./ProductsLayout";
import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function MenuGamesPart(props) {
    const navigate = useNavigate();

    return (
        <Paper
            sx={{
                display: props.menu_game_hover_state ? 'flex' : 'none',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '20px 40px 20px',
                gap: '15px',
                borderRadius: 0,
                bgcolor: 'accent.first',
                border: 2,
                borderColor: 'accent.second',
                maxWidth: '824px',
                height: '454px',
                boxShadow: 6,
            }}
        >
            <Typography
                variant="navLink"
                color="text.black"
            >
                {props.menu_section_name}
            </Typography>
            {
                props.menu_products.length === 0 ?
                    <Typography>
                        Loading
                    </Typography>
                    :
                    <ProductsLayout
                        images={props.menu_products}
                    />
            }
            <Button
                onClick={(event) => {
                    navigate(props.shop_link);
                    props.menu_close(event);
                }}
                sx={{
                    width: '824px',
                    bgcolor: 'secondary.main',
                    border: 0,
                    borderRadius: 0,
                    textTransform: 'uppercase',
                    '&:hover': {
                        bgcolor: 'tertiary.main'
                    },
                }}
            >
                <Typography
                    variant="navLink"
                    color="text.primary"
                >
                    Browse all {props.menu_section_name === "Browse all games" ? "games" : props.menu_section_name}
                </Typography>
            </Button>
        </Paper>
    )
}