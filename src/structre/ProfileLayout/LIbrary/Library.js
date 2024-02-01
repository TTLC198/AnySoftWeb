import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {UserContext} from "../../ShopSection/UserContext";
import {useSearchParams} from "react-router-dom";
import {getProducts, serializeToSearchString} from "../../api";
import {useAuth} from "../../Auth/useAuth";
import ShopSearchInput from "../../Shop/ShopSearchInput";
import {OrderSelection} from "../../Shop/OrderSelection";
import Pagination from "@mui/material/Pagination";
import {CardLayout} from "../../Shop/CardLayout";
import LoadingPage from "../../utils/LoadingPage";

export const Library = memo(() => {
    const {user: {ownedProducts}} = useContext(UserContext),
        {axiosInstance} = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]),
        [productHeaders, setProductHeaders] = useState({
            totalCount: 0,
            currentPage: 1,
            totalPages: 0,
        });

    useEffect(() => {
        async function fetchProducts() {
            const _products = await getProducts({
                query: {
                    ids: ownedProducts.length === 0 ? [-1] : ownedProducts,
                    name: searchParams.get("Name"),
                },
                pageCount: 21,
                page: searchParams.get("page"),
                orderBy: JSON.parse(searchParams.get("sort"))
            }, axiosInstance);
            setProducts(
                await _products.body
            )
            setProductHeaders(_products.headers ? _products.headers : {
                totalCount: 0,
                currentPage: 1,
                totalPages: 0,
            })
        }

        fetchProducts();
    }, [searchParams, axiosInstance, ownedProducts]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                px: 4,
                py: 3
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography
                        variant="h2_64"
                        color="text.tertiary"
                    >
                        Library
                    </Typography>
                </Grid>
                <Grid item xs={7} sx={{
                    bgcolor: "primary.secondary",
                    borderRadius: 1,
                    p: 1
                }}>
                    <ShopSearchInput
                        set_search_params={setSearchParams}
                        initial_value={searchParams.get("Name")}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent={productHeaders.totalPages !== 1 ? "space-between" : "end"}
                alignItems="center"
                sx={{
                    mt: 1
                }}
            >
                <Grid item>
                    {
                        productHeaders.totalPages > 1 &&
                        <Box>
                            <Pagination count={productHeaders.totalPages} page={productHeaders.currentPage}
                                        onChange={(event, page) => setSearchParams(prev => serializeToSearchString(prev, {
                                            key: "page",
                                            value: page
                                        }))}
                                        variant="outlined"
                                        shape="rounded"
                                        color="secondary"
                            />
                        </Box>
                    }
                </Grid>
                <Grid item>
                    <OrderSelection
                        set_search_params={setSearchParams}
                        initialState={JSON.parse(searchParams.get("sort"))}
                        sortParam={[
                            {
                                name: "Name",
                                searchName: "name"
                            },
                            {
                                name: "Price",
                                searchName: "cost"
                            },
                            {
                                name: "Rating",
                                searchName: "rating"
                            },
                            {
                                name: "Publication date",
                                searchName: "ts"
                            },
                        ]}
                    />
                </Grid>
            </Grid>
            <Box>
                {
                    products ?
                        products.length !== 0 ?
                            <CardLayout
                                products={products}
                                offset={50}
                                angle={-1 * Math.PI / 4}
                            />
                            :
                            <LoadingPage/>
                        :
                        <Typography>
                            No such products
                        </Typography>
                }
            </Box>
            {
                productHeaders.totalPages > 1 &&
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end"
                    }}
                >
                    <Pagination count={productHeaders.totalPages} page={productHeaders.currentPage}
                                onChange={(event, page) => setSearchParams(prev => serializeToSearchString(prev, {
                                    key: "page",
                                    value: page
                                }))}
                                variant="outlined"
                                shape="rounded"
                                color="secondary"
                    />
                </Box>
            }
        </Box>
    )
})