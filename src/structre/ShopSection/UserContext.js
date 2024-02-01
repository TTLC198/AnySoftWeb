import {createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState} from "react";
import {AuthContext} from "../Auth/useAuth";
import {
    addToShoppingCart,
    checkoutOrderRequest,
    createPayments, deletePayments,
    delShoppingCart,
    getPayments,
    getUser,
    putUser, updatePayments
} from "../api";
import _ from "lodash";
import LoadingPage from "../utils/LoadingPage";

export const UserContext = createContext(null);
export const UserFunctionsContext = createContext(null);

export function UserLayout({children}) {

    const [isUserLoading, setIsUserLoading] = useState(true);

    const [user, dispatch] = useReducer(userReducer, userDefaultValues),
        {token, setToken, axiosInstance, parseJwt} = useContext(AuthContext);

    useEffect(() => {
        setIsUserLoading(true);
        if (token) {
            (async () => {
                const response = await getUser(axiosInstance, JSON.parse(window.atob(token.split('.')[1])).id);
                switch (response.error) {
                    case 401:
                    case 404: {
                        setToken(null);
                        dispatch({
                            type: "clearUserData"
                        });
                        break;
                    }
                    default: {
                        let newCart = _.unionBy(user.shoppingCart, response.data.shoppingCart, "id");
                        let cartToServer = _.differenceBy(newCart, _.unionBy(response.data.shoppingCart, response.data.orders, "id"), "id");
                        const paymentsResp = await getPayments(axiosInstance);
                        dispatch({
                            type: "storeUserData",
                            ...response.data,
                            role: parseJwt(token).role,
                            shoppingCart: newCart,
                            payments: paymentsResp.data.message ? [] : paymentsResp.data.filter((payment) => payment.isActive),
                        })
                        if (cartToServer.length) {
                            addToShoppingCart(axiosInstance, cartToServer)
                        }
                    }
                }
            })();
        } else {
            dispatch({
                type: "clearUserData"
            });
        }
        setIsUserLoading(false)
    }, [token, axiosInstance])

    const markProducts = useCallback((products) => { //TODO change all products to updated algorithm
        function findIndex(arr, element) {
            return _.findIndex(arr, ['id', element.id]) !== -1
        }

        let markedProducts = []

        for (let product of products) {
            let markedProduct = product;
            markedProduct['isInWishlist'] = findIndex(user.wishlist, product);
            markedProduct["status"] = findIndex(user.ownedProducts.map(element => ({id: element})), product)
                ? "owned"
                : findIndex(user.shoppingCart, product)
                    ?
                    "cart"
                    : "none";
            markedProducts.push(markedProduct);
        }
        return markedProducts
    }, [user.shoppingCart, user.ownedProducts, user.wishlist])

    const setCard = useCallback(async (type, cardData) => {
        switch (type) {
            case "create":
                const responseCard = await createPayments(axiosInstance, cardData)
                if (responseCard.error)
                    return responseCard
                dispatch({
                    type: "addToPlace",
                    place: "payments",
                    item: responseCard.data
                })
                return {
                    success: true
                }
            case "update":
                const updatedCard = await updatePayments(axiosInstance, cardData);
                if (updatedCard.error)
                    return updatedCard
                dispatch({
                    type: "deleteFromPlace",
                    place: "payments",
                    item: cardData
                })
                dispatch({
                    type: "addToPlace",
                    place: "payments",
                    item: updatedCard.data
                })
                return {
                    success: true
                }
            case "delete":
                const deletedCard = await deletePayments(axiosInstance, cardData.id)
                if (deletedCard.error)
                    return deletedCard
                dispatch({
                    type: "deleteFromPlace",
                    place: "payments",
                    item: cardData
                })
                return {
                    success: true
                }
            default:
                return {
                    error: 404,
                    data: {
                        message: "Unknown method"
                    }
                }
        }
    }, [axiosInstance])

    const setWishlist = useCallback((product) => {
        if (user.wishlist.map((item) => item.id).includes(product.id)) {
            dispatch({
                type: "deleteFromPlace",
                place: "wishlist",
                item: product
            })
        } else {
            dispatch({
                type: "addToPlace",
                place: "wishlist",
                item: product
            })
        }
    }, [user.wishlist])

    const setNotification = useCallback((notification) => {
        if (user.notifications.map((item) => item.id).includes(notification.id)) {
            dispatch({
                type: "deleteFromPlace",
                place: "notifications",
                item: notification
            })
        } else {
            dispatch({
                type: "addToPlace",
                place: "notifications",
                item: notification
            })
        }
    }, [user.notifications])

    const setCart = useCallback((product) => {
        if (user.shoppingCart.map((item) => item.id).includes(product.id)) {
            dispatch({
                type: "deleteFromPlace",
                place: "shoppingCart",
                item: product
            });
            if (token) {
                delShoppingCart(axiosInstance, product.id); //TODO error handling
            }
        } else {
            dispatch({
                type: "addToPlace",
                place: "shoppingCart",
                item: product
            })
            if (token) {
                addToShoppingCart(axiosInstance, [product]); //TODO error handling
            }
        }
    }, [user.shoppingCart, axiosInstance, token])

    const checkoutOrder = useCallback(async () => {
        const response = await checkoutOrderRequest(axiosInstance);
        if (response.status === 200) {
            dispatch({
                type: "checkoutOrder",
                order: response.data,
                products: user.shoppingCart.map((currentValue) => currentValue.id)
            })
        } else {
            return response;
        }
    }, [user.shoppingCart, axiosInstance])

    const setUser = useCallback(({login, email}) => {
        async function apiCall() {
            const response = await putUser(axiosInstance, {
                id: user.user.id,
                login,
                email
            })

            if (response) {
                return {
                    type: response.statusCode,
                    message: response.data.message
                }
            }

            dispatch({
                type: "changeMajorData",
                login: login,
                email: email
            });

            return {
                type: 200
            }
        }

        return apiCall();
    }, [user, dispatch, axiosInstance])

    const values = useMemo(
        () => {
            return (
                {
                    user
                }
            )
        },
        [user]
    )

    return (
        <UserContext.Provider value={{...values}}>
            <UserFunctionsContext.Provider value={{
                dispatch,
                markProducts,
                setters: {setWishlist, setCart, setUser, checkoutOrder, setNotification, setCard}
            }}>
                {
                    isUserLoading ?
                        <LoadingPage/> :
                        children
                }
            </UserFunctionsContext.Provider>
        </UserContext.Provider>
    )
}

const userDefaultValues = {
    user: undefined,
    isLoggedIn: false,
    shoppingCart: [],
    ownedProducts: [],
    notifications: [],
    wishlist: [],
}

function userReducer(user, action) {
    switch (action.type) {
        case "storeUserData": {
            return {
                ...user,
                "user": {
                    id: action.id,
                    login: action.login,
                    email: action.email,
                    role: action.role,
                    image: action.image
                },
                shoppingCart: action.shoppingCart,
                ownedProducts: _.flattenDeep(action.orders.map(order => order.purchasedProductsIds))
                    .filter((c, index, array) => {
                        return array.indexOf(c) === index;
                    })
                    .sort(
                        function (a, b) {
                            return a - b;
                        }
                    ),
                orders: action.orders,
                isLoggedIn: true,
                wishlist: [],
                notifications: [
                    {
                        id: 0,
                        name: "First notification",
                        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et lorem in lectus vehicula placerat sit amet ut nisl. Duis facilisis felis erat, dapibus scelerisque tellus mattis eget. Donec ante ipsum, vestibulum sit amet felis eu, ultricies vulputate leo. Nullam felis sapien, maximus vel nulla quis, varius finibus tellus. "
                    },
                    {
                        id: 1,
                        name: "Second notification",
                        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et lorem in lectus vehicula placerat sit amet ut nisl. Duis facilisis felis erat, dapibus scelerisque tellus mattis eget. Donec ante ipsum, vestibulum sit amet felis eu, ultricies vulputate leo. Nullam felis sapien, maximus vel nulla quis, varius finibus tellus. "
                    },
                    {
                        id: 2,
                        name: "Third notification",
                        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et lorem in lectus vehicula placerat sit amet ut nisl. Duis facilisis felis erat, dapibus scelerisque tellus mattis eget. Donec ante ipsum, vestibulum sit amet felis eu, ultricies vulputate leo. Nullam felis sapien, maximus vel nulla quis, varius finibus tellus. "
                    },
                ],
                payments: action.payments,
            }
        }
        case "clearUserData": {
            return {
                ...user,
                "user": undefined,
                shoppingCart: [],
                ownedProducts: [],
                orders: [],
                isLoggedIn: false,
                wishlist: [],
                notifications: [],
                payments: [],
            }
        }
        case "changeMajorData": {
            return {
                ...user,
                user: {
                    ...user.user,
                    id: user.user.id,
                    login: action.login || user.user.login,
                    email: action.email || user.user.email,
                    image: action.image || user.user.image,
                }
            }
        }
        case "addToPlace": {
            let newValues = [];
            let index = 0;
            if (user[action.place].length !== 0) {
                while (user[action.place][index]?.id <= action.item.id) {
                    newValues.push(user[action.place][index]);
                    index++;
                }
            }
            newValues.push(action.item);
            newValues.push(...user[action.place].slice(index))
            return {
                ...user,
                [action.place]: newValues
            }
        }
        case "addOwnedProduct": {
            return {
                ...user,
                ownedProducts: user.ownedProducts.concat([action.product])
            }
        }
        case "deleteFromPlace": {
            return {
                ...user,
                [action.place]: user[action.place].filter((item) => item.id !== action.item.id)
            }
        }
        case "checkoutOrder": {
            return {
                ...user,
                shoppingCart: [],
                orders: user.orders.concat([action.order]),
                ownedProducts: user.ownedProducts.concat(action.products)
            }
        }
        default: {
            console.log("Unknown action type");
            break;
        }
    }
}
