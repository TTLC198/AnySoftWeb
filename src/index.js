import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ShopSection from "./structre/ShopSection/ShopSection";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePageContainer} from "./structre/ShopSection/HomePage/Homepage";
import ErrorPage from "./structre/utils/ErrorPage";
import {loader as ProductLoader, ProductContainer} from "./structre/Product";
import ShopPageContainer from "./structre/ShopPageContainer";
import SignInPage from "./structre/Auth/SignInPage";
import myTheme from "./structre/Theme";
import {ThemeProvider} from "@mui/material";
import {GeneralLayout} from "./structre/GeneralLayout";
import LogLayout from "./structre/Auth/LogLayout";
import SignUpPage from "./structre/Auth/SignUpPage";
import axios from "axios";
import {loader as GeneralLoader} from "./structre/GeneralLayout";
import {loader as HomePageLoader} from "./structre/ShopSection/HomePage/Homepage";
import {ProfileLayout} from "./structre/ProfileLayout/ProfileLayout";
import {AccountInformation} from "./structre/ProfileLayout/AccountInformation/AccountInformation";
import {PasswordChange} from "./structre/ProfileLayout/PasswordChange/PasswordChange";
import {ProfileCart} from "./structre/ProfileLayout/Cart/ProfileCart";
import {Library} from "./structre/ProfileLayout/LIbrary/Library";
import {Wishlist} from "./structre/ProfileLayout/Wishlist/Wishlist";
import {Notifications} from "./structre/ProfileLayout/Notifications/Notifications";
import {PaymentMethods} from "./structre/ProfileLayout/PaymentMethods/PaymentMethods";
import {PaymentsLayout} from "./structre/ProfileLayout/PaymentMethods/PaymentsLayout";
import {PaymentChangeForm} from "./structre/ProfileLayout/PaymentMethods/PaymentChangeForm";
import {baseURL} from "./generalUtilities";
import {SellerProductsList} from "./structre/ProfileLayout/sellerProductList/SellerProductsList";
import {SellerProductsListContainer} from "./structre/ProfileLayout/sellerProductList/SellerProductsListContainer";
import {ProductCreatorContainer} from "./structre/ProfileLayout/sellerProductList/ProductCreator/ProductCreatorContainer";



function newApiClient() {
    return axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const apiClient = newApiClient();

const router = createBrowserRouter([
    {
        element: <GeneralLayout apiClient={apiClient}/>,
        loader: GeneralLoader(apiClient),
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <ShopSection/>,
                children: [
                    {
                        index: true,
                        element: <HomePageContainer/>,
                        loader: HomePageLoader(apiClient)
                    },
                    {
                        path: "/product/:id",
                        element: <ProductContainer/>,
                        loader: ProductLoader(apiClient)
                    },
                    {
                        path: "/shop",
                        element: <ShopPageContainer/>,
                    },
                ],
            },
            {
                path: "/authorization",
                element: <LogLayout/>,
                children: [
                    {
                        path: "/authorization/signin",
                        element: <SignInPage/>
                    },
                    {
                        path: "/authorization/signup",
                        element: <SignUpPage/>
                    },
                ]
            },
            {
                path: "/profile",
                element: <ProfileLayout/>,
                children: [
                    {
                        index: true,
                        element: <AccountInformation/>
                    },
                    {
                        path: "/profile/passwordChange",
                        element: <PasswordChange/>
                    },
                    {
                        path: "/profile/cart",
                        element: <ProfileCart/>
                    },
                    {
                        path: "/profile/library",
                        element: <Library/>
                    },
                    {
                        path: "/profile/sellerProducts",
                        element: <SellerProductsListContainer/>,
                        children: [
                            {
                                index: true,
                                element: <SellerProductsList/>
                            },
                            {
                                path: "/profile/sellerProducts/change",
                                element: <ProductCreatorContainer/>
                            }
                        ]
                    },
                    {
                        path: "/profile/wishlist",
                        element: <Wishlist/>
                    },
                    {
                        path: "/profile/notifications",
                        element: <Notifications/>
                    },
                    {
                        path: "/profile/payments",
                        element: <PaymentMethods/>,
                        children: [
                            {
                                index: true,
                                element: <PaymentsLayout/>
                            },
                            {
                                path: "/profile/payments/change",
                                element: <PaymentChangeForm/>
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={myTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
