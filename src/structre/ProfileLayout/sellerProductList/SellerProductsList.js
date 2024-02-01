import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../ShopSection/UserContext";
import {useAuth} from "../../Auth/useAuth";
import {Box, Grid, Typography} from "@mui/material";
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {deleteProduct, getProducts, getSellerProducts, serializeToSearchString} from "../../api";
import ShopSearchInput from "../../Shop/ShopSearchInput";
import Pagination from "@mui/material/Pagination";
import {OrderSelection} from "../../Shop/OrderSelection";
import {CardLayout} from "../../Shop/CardLayout";
import LoadingPage from "../../utils/LoadingPage";
import {SellerProductsLayout} from "./SellerProductsLayout";
import {MyButton} from "../../components/MyButton";

export const SellerProductsList = memo(() => {
    const {user: {user}} = useContext(UserContext),
        {axiosInstance} = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const [products, setProducts] = useState([]),
        [productHeaders, setProductHeaders] = useState({
            totalCount: 0,
            currentPage: 1,
            totalPages: 0,
        });

    useEffect(() => {
        async function fetchProducts() {
            const _products = await getSellerProducts({
                query: {
                    name: searchParams.get("Name"),
                },
                pageCount: 10,
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
    }, [searchParams, axiosInstance]);

    const [cardWidth, setCardWidth] = useState(0);

    const cardHeight = 150,
        cardAngle = -1 * Math.PI / 4,
        cardOffset = 40,
        cardBorderWidth = 2,
        cardImageWidth = (cardHeight - cardBorderWidth * 2) / 0.5625,
        cardImageHeight = cardHeight - cardBorderWidth * 2;

    const cardWidthRef = useRef(null);

    useEffect(() => {
        if (cardWidthRef.current) {
            setCardWidth(cardWidthRef.current.offsetWidth)
        }
    }, [])

    async function deleteProductHandler(id) {
        const response = await deleteProduct(axiosInstance, id);
        if (response)
            return;

        setProducts(prevState => prevState.filter(product => { //TODO maybe not working
            if (product.id !== id)
                return product
        }))
    }

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography
                        variant="h2_64"
                        color="text.tertiary"
                    >
                        Your products
                    </Typography>
                </Grid>
                <Grid item>
                    <MyButton
                        height="56px"
                        main_color={"#45A29E"}
                        hover_color={"#66FCF1"}
                        click_handler={() => navigate("/profile/sellerProducts/change")}
                    >
                        <Typography
                            variant="h2"
                            color="text.primary"
                        >
                            Create new
                        </Typography>
                    </MyButton>
                </Grid>
                <Grid item xs={5} sx={{
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
            <Box
                ref={cardWidthRef}
            >
                {
                    products ?
                        products.length !== 0 ?
                            <SellerProductsLayout
                                products={products}
                                width={cardWidth}
                                height={cardHeight}
                                angle={cardAngle}
                                offset={cardOffset}
                                borderWidth={cardBorderWidth}
                                cardImageWidth={cardImageWidth}
                                cardImageHeight={cardImageHeight}
                                deleteProduct={deleteProductHandler}
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
        </>
    )
})