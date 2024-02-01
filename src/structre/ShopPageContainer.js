import {Box, Button, Grid, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {getProducts, serializeToSearchString} from "./api";
import ShopSearchInput from "./Shop/ShopSearchInput";
import {CardLayout} from "./Shop/CardLayout";
import AnimatedDropDownList from "./Shop/AnimatedDropDownList";
import CheckboxListWithSearch from "./Shop/CheckboxListWithSearch";
import {CostSlider} from "./Shop/CostSlider";
import {OrderSelection} from "./Shop/OrderSelection";
import Pagination from '@mui/material/Pagination';
import {GeneralContext} from "./GeneralLayout";
import {useAuth} from "./Auth/useAuth";
import LoadingPage from "./utils/LoadingPage";

export default function ShopPageContainer(props) {
    const {genres, properties} = useContext(GeneralContext),
        {axiosInstance} = useAuth();

    const mainRef = useRef(null);
    const [width, setWidth] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [productHeaders, setProductHeaders] = useState({
        totalCount: 0,
        currentPage: 1,
        totalPages: 0,
    });
    const [costRange, setCostRange] = useState({min: 0, max: 0});

    useEffect(() => {
        async function fetchProducts() {
            const _products = await getProducts({
                    query: {
                        name: searchParams.get("Name"),
                        genres: JSON.parse(searchParams.get("genres")),
                        properties: JSON.parse(searchParams.get("properties")),
                        cost: JSON.parse(searchParams.get("cost")),
                    },
                    pageCount: 30,
                    page: searchParams.get("page"),
                    orderBy: JSON.parse(searchParams.get("sort"))
                }, axiosInstance),
                _minCost = await getProducts({
                    query: {
                        name: searchParams.get("Name"),
                        genres: JSON.parse(searchParams.get("genres")),
                        properties: JSON.parse(searchParams.get("properties")),
                        cost: JSON.parse(searchParams.get("cost")),
                    },
                    pageCount: 1,
                    orderBy: {
                        object: "cost",
                        isDesc: false
                    }
                }, axiosInstance),
                _maxCost = await getProducts({
                    query: {
                        name: searchParams.get("Name"),
                        genres: JSON.parse(searchParams.get("genres")),
                        properties: JSON.parse(searchParams.get("properties")),
                        cost: JSON.parse(searchParams.get("cost")),
                    },
                    pageCount: 1,
                    orderBy: {
                        object: "cost",
                        isDesc: true
                    }
                }, axiosInstance);
            setProducts(
                await _products.body
            )
            setProductHeaders(_products.headers ? _products.headers : {
                totalCount: 0,
                currentPage: 1,
                totalPages: 0,
            })
            setCostRange({
                min: (await _minCost.body) ? (await _minCost.body)[0].cost : 0,
                max: (await _maxCost.body) ? (await _maxCost.body)[0].cost : 0,
            });
        }
        fetchProducts();
    }, [searchParams]);

    let markedGenres = useMemo(() => {
        let chosenGenres = searchParams.get('genres');

        if (chosenGenres !== null)
            return genres.map(genre => ({...genre, isChosen: chosenGenres.includes(genre.id)}));
        return genres.map(genre => ({...genre, isChosen: false}));
    }, [genres, searchParams]);

    let markedProperties = useMemo(() => {
        let chosenProperties = searchParams.get('properties');
        if (chosenProperties !== null)
            return properties.map(property => ({...property, isChosen: chosenProperties.includes(property.id)}));
        return properties.map(property => ({...property, isChosen: false}));
    }, [properties, searchParams]);

    useEffect(() => {
        if (mainRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setWidth(Math.round(entry.contentRect.width));
                }
            });
            resizeObserver.observe(mainRef.current.parentElement);
        }
    }, [width])

    function clearSearch() {
        setSearchParams([]);
    }

    return (
        <Box
            sx={{
                mx: 6,
                display: "flex",
                flexDirection: "column",
                minHeight: "100%"
            }}
            ref={mainRef}
        >
            <Box
                sx={{
                    display: "flex",
                    mb: 4,
                    pt: 6,
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "nowrap",
                        minWidth: "650px",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body30"
                        color="text.primary"
                    >
                        Products shown: {productHeaders.totalCount}
                    </Typography>
                    <Button
                        onClick={clearSearch}
                        sx={{
                            ml: 5,
                            bgcolor: 'secondary.main',
                            border: 0,
                            borderRadius: 0,
                            '&:hover': {
                                bgcolor: 'tertiary.main'
                            },
                        }}
                    >
                        <Typography
                            variant="navLink"
                            color="text.primary"
                            sx={{
                                px: 1,
                            }}
                        >
                            Clear
                        </Typography>
                    </Button>
                </Box>

                <Grid container columns={13}>
                    <Grid item xs={13}>
                        <ShopSearchInput
                            set_search_params={setSearchParams}
                            initial_value={searchParams.get("Name")}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    height: 2,
                    bgcolor: "secondary.main",
                    mb: 2,
                }}
            />
            <Grid
                container
                sx={{
                    pb: 5
                }}
            >
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}
                    >
                        <AnimatedDropDownList
                            name="Cost"
                            max_height={600}
                        >
                            <CostSlider
                                costRange={costRange}
                                set_search_params={setSearchParams}
                            />
                        </AnimatedDropDownList>
                        <AnimatedDropDownList
                            name="genres"
                            max_height={600}
                        >
                            <CheckboxListWithSearch
                                name="genres"
                                options={markedGenres}
                                set_checked_options={setSearchParams}
                            />
                        </AnimatedDropDownList>
                        <AnimatedDropDownList
                            name="properties"
                            max_height={600}
                        >
                            <CheckboxListWithSearch
                                name="properties"
                                options={markedProperties}
                                set_checked_options={setSearchParams}
                            />
                        </AnimatedDropDownList>
                    </Box>
                </Grid>
                <Grid item xs={8}
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2
                      }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: productHeaders.totalPages > 1 ? "space-between" : "end",
                            mx: 2
                        }}
                    >
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
                    </Box>
                    <Box
                        sx={{}}
                    >
                        {
                            products ?
                                products.length !== 0 ?
                                    <CardLayout
                                        products={products}
                                        offset={50}
                                        angle={-1 * Math.PI / 4}
                                        heightScale={2.75}
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
                </Grid>
            </Grid>
        </Box>
    )
}