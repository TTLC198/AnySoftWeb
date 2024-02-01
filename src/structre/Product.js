import {Box} from "@mui/material";
import {Await, defer, useLoaderData} from "react-router-dom";
import React, {memo, Suspense, useContext, useEffect, useMemo, useRef, useState} from "react";
import ProductDescription from "./ProductPage/ProductDescription";
import {ProductCommentsContainer} from "./ProductPage/ProductCommentsContainer";
import {SwiperGeneral} from "./ShopSection/HomePage/components/Swiper/SwiperGeneral";
import {getProduct, getProducts} from "./api";
import {UserContext, UserFunctionsContext} from "./ShopSection/UserContext";
import {MainSwiper} from "./ProductPage/MainBanner/MainSwiper";
import LoadingPage from "./utils/LoadingPage";
import ErrorPage from "./utils/ErrorPage";

export const loader = (apiClient) => async ({request, params}) => {
    let product = getProduct(params.id, apiClient);
    let products = (await getProducts({
        pageCount: 9,
        orderBy: {
            object: "id",
            isDesc: false
        }
    }, apiClient)).body;
    return defer(
        {
            data: Promise.all(
                [
                    product,
                    products
                ]
            )
        }
    );
}

export const ProductContainer = memo(() => {
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
                        const products = data[0],
                            comments = data[0].reviews,
                            similarProducts = data[1];

                        console.log(products, comments, similarProducts)

                        return (
                            <Product
                                product={products}
                                comments={comments}
                                similarProducts={similarProducts}
                            />
                        )
                    }
                }
            </Await>
        </Suspense>
    )
})

function Product({
                                    product,
                                    comments,
                                    similarProducts
                                }) {
    const {markProducts} = useContext(UserFunctionsContext);

    const [width, setWidth] = useState(0);

    const mainRef = useRef(null);

    const markedProducts = useMemo(() => {
        return {
            shownProduct: markProducts([product])[0],
            similarProducts: markProducts(similarProducts)
        }
    }, [product, similarProducts, markProducts]);

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

    return (
        <Box sx={{pb: 17}} ref={mainRef}>
            {
                (markedProducts.shownProduct && width !== 0) &&
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <MainSwiper
                        width={width}
                        product={markedProducts.shownProduct}
                    />
                    <ProductDescription
                        width={width}
                        product={markedProducts.shownProduct}
                    />
                    <ProductCommentsContainer
                        productId={markedProducts.shownProduct.id}
                        productStatus={markedProducts.shownProduct.status}
                        width={width}
                        comments={comments}
                        first_length={1}
                        margin={80}
                    />
                    <SwiperGeneral products={markedProducts.similarProducts}
                                   angle={-7 * Math.PI / 18}
                                   width={Math.round(width)}
                                   height={350}
                                   quantity={3}
                                   name={"More like this"}
                                   style={{
                                       marginTop: "70px"
                                   }}
                    />
                </Box>

            }
        </Box>
    )
}