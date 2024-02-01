import {Box, CircularProgress, Container, Grid, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import React from "react";

export default function LoadingPage(props) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "90vh"
            }}
        >
            <Container maxWidth="xl"
                       sx={{
                           bgcolor: "rgba(31, 40, 51, 0.5)",
                           my: 1,
                           p: 0,
                           flexGrow: 1,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center"
                       }}
            >

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                >
                    <CircularProgress
                        size={80}
                        thickness={4}
                        sx={{
                            color: "accent.fourth",
                        }}
                    />
                    <Typography
                        variant={"h2"}
                        color="text.primary"
                    >
                        Loading ...
                    </Typography>
                </Grid>
            </Container>
        </Box>
    )
}