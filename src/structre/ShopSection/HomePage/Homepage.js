import React, {memo, Suspense, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Box, Typography} from "@mui/material";

import "../../css/Homepage.css";
import {Await, defer, useLoaderData} from "react-router-dom";
import {MainCanvasCarousel} from "./components/MainCanvasCarousel";
import {SwiperGeneral} from "./components/Swiper/SwiperGeneral";
import SwiperFeaturedSection from "./components/Swiper/SwiperFeaturedSection";
import SwiperTopSellers from "./components/Swiper/SwiperTopSellers";
import {UserFunctionsContext} from "../UserContext";
import {getFeaturedSections, getGenres, getProducts} from "../../api";
import LoadingPage from "../../utils/LoadingPage";
import ErrorPage from "../../utils/ErrorPage";
import {element} from "prop-types";
import _ from "lodash";

export const loader = (apiClient) => async ({request, params}) => {
    let genres = await (await getGenres({
        pageCount: 4
    }, apiClient)).body;

    let mainBanner = getProducts({
        query: {
            rating: {
                Min: 4.0,
                Max: 5.0
            }
        },
        pageCount: 4,
        orderBy: {
            object: "id",
            isDesc: false
        }
    }, apiClient);
    let deals = getProducts({
        query: {
            discount: {
                Min: 0.1,
                Max: 100.0
            }
        },
        pageCount: 9,
        orderBy: {
            object: "id",
            isDesc: false
        }
    }, apiClient);
    let recommendations = getProducts({
        pageCount: 5,
        orderBy: {
            object: "id",
            isDesc: false
        }
    }, apiClient);
    let newAndUpdated = getProducts({
        pageCount: 9,
        orderBy: {
            object: "id",
            isDesc: false
        }
    }, apiClient);
    let topSellers = genres.map((genre) => getProducts({
        query: {
            genres: [genre.id]
        },
        pageCount: 9,
        orderBy: {
            object: "id",
            isDesc: false
        }
    }, apiClient));

    let featuredSection = getFeaturedSections();

    return defer(
        {
            data: Promise.all([
                Promise.all([
                    mainBanner,
                    deals,
                    recommendations,
                    newAndUpdated,
                    Promise.all(topSellers),
                ]),
                featuredSection,
                genres
            ])
        }
    );
}

export const HomePageContainer = memo(() => {
    const data = useLoaderData();
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
                        const genres = data[2],
                            products = {
                                mainBanner: data[0][0].body,
                                deals: data[0][1].body,
                                recommendations: data[0][2].body,
                                newAndUpdated: data[0][3].body,
                                topSellers: _.reduce(data[0][4], (result, value, index) => Object.assign(result, {[genres[index].id]: value.body}), {}),
                            },
                            featuredSection = data[1];
                        return (
                            <HomePage
                                products={products}
                                featuredSection={featuredSection}
                                genres={genres}
                            />
                        )
                    }
                }
            </Await>
        </Suspense>
    )
})

const HomePage = memo(({
                           products,
                           featuredSection,
                           genres
                       }) => {
    const mainRef = useRef(null);
    const [homePageWidth, setHomePageWidth] = useState(0);
    const {markProducts} = useContext(UserFunctionsContext);

    const markedProductsRef = useMemo(() => {
        let topSellers = {};
        for (let key in products.topSellers) {
            topSellers[key] = markProducts(products.topSellers[key])
        }

        return {
            mainBanner: markProducts(products.mainBanner),
            deals: markProducts(products.deals),
            recommendations: markProducts(products.recommendations),
            newAndUpdated: markProducts(products.newAndUpdated),
            topSellers: topSellers
        }
    }, [markProducts, products]);

    useEffect(() => {
        if (mainRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setHomePageWidth(entry.contentRect.width);
                }
            });
            resizeObserver.observe(mainRef.current.parentElement);
        }
    }, [homePageWidth])

    return (
        <Box sx={{pb: 10}} ref={mainRef}>
            {
                markedProductsRef ?
                    <Box>
                        <MainCanvasCarousel
                            offset={90}
                            angle={-7 * Math.PI / 18}
                            width={Math.round(homePageWidth)}
                            height={Math.round(homePageWidth * 0.55989583)}
                            products={markedProductsRef.mainBanner}
                        />
                        <Box
                            sx={{
                                mt: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                flexWrap: "wrap",
                                gap: "150px"
                            }}
                        >
                            <SwiperGeneral products={markedProductsRef.deals}
                                           angle={-7 * Math.PI / 18}
                                           width={Math.round(homePageWidth)}
                                           height={350}
                                           quantity={3}
                                           name={"Deals"}
                            />
                            <SwiperGeneral products={markedProductsRef.recommendations}
                                           angle={-7 * Math.PI / 18}
                                           width={Math.round(homePageWidth)}
                                           height={350}
                                           quantity={1}
                                           name={"Recommendation"}
                            />
                            <SwiperGeneral products={markedProductsRef.newAndUpdated}
                                           angle={-7 * Math.PI / 18}
                                           width={Math.round(homePageWidth)}
                                           height={350}
                                           quantity={3}
                                           name={"New & Updated"}
                            />
                            <SwiperFeaturedSection
                                sections={featuredSection}
                                width={Math.round(homePageWidth)}
                                offset={50}
                                angle={-1 * Math.PI / 4}
                                height={535}
                            />
                            <SwiperTopSellers
                                genres={genres}
                                products={markedProductsRef.topSellers}
                                width={Math.round(homePageWidth)}
                                offset={50}
                                angle={-1 * Math.PI / 4}
                                height={800}
                                columns={3}
                                rows={3}
                            />
                        </Box>
                    </Box>
                    :
                    <Typography>
                        Loading
                    </Typography>
            }
        </Box>
    )
})