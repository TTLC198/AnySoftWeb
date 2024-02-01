import {Await, defer, useLoaderData, useOutlet} from "react-router-dom";
import {AuthProvider} from "./Auth/useAuth";
import React, {createContext, Suspense} from "react";
import {UserLayout} from "./ShopSection/UserContext";
import Header from "./Header";
import {Box} from "@mui/material";
import Footer from "./Footer";
import ErrorPage from "./utils/ErrorPage";
import LoadingPage from "./utils/LoadingPage";

export const GeneralContext = createContext(null);

export const loader = (apiClient) => async ({request, params}) => {
    try {
        return defer(
            {
                data: Promise.all(
                    [
                        apiClient.get("/api/genres",
                            {
                                params: {PageCount: 10000}
                            }),
                        apiClient.get("/api/properties")
                    ])
            }
        )
    } catch (error) {
        if (error.response) {
            throw {
                error: error.response.status,
                data: error.response.data
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}

export const GeneralLayout = ({apiClient}) => {
    const data = useLoaderData(); //TODO error handling
    const outlet = useOutlet();

    return (
        <Suspense
            fallback={<LoadingPage/>}
        >
            <Await
                resolve={data.data}
                errorElement={
                    <ErrorPage/>
                }
            >
                {
                    (data) => {
                        const genres = data[0],
                            properties = data[1];
                        return (
                            <GeneralContext.Provider value={{genres: genres?.data, properties: properties?.data}}>
                                <AuthProvider apiClient={apiClient}>
                                    <UserLayout>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "100vh"
                                            }}
                                        >
                                            <Header/>
                                            {outlet}
                                            <Box
                                                sx={{
                                                    flexShrink: "0",
                                                }}
                                            >
                                                <Footer/>
                                            </Box>
                                        </Box>
                                    </UserLayout>
                                </AuthProvider>
                            </GeneralContext.Provider>
                        )
                    }
                }
            </Await>
        </Suspense>

    );
};
