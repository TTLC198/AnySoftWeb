import {useAuth} from "./Auth/useAuth";
import axios from "axios";

export async function getProducts(params, instance) {
    try {
        const response = await instance.get("/api/products",
            {
                params: {
                    Query: JSON.stringify(params.query),
                    PageCount: params.pageCount,
                    Page: params.page,
                    OrderBy: params.orderBy && `${params.orderBy.object} ${params.orderBy.isDesc ? "desc" : ""}`
                }
            })
        return {
            headers: JSON.parse(await response.headers["x-pagination"]),
            body: await response.data
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return []
            }
            return {
                error: error.response.status,
                data: error.response.data
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error);
        }
        console.log(error.config);
    }
}

export async function getSellerProducts(params, instance) {
    try {
        const response = await instance.get("/api/products/seller",
            {
                params: {
                    Query: JSON.stringify(params.query),
                    PageCount: params.pageCount,
                    Page: params.page,
                    OrderBy: params.orderBy && `${params.orderBy.object} ${params.orderBy.isDesc ? "desc" : ""}`
                }
            })
        return {
            headers: JSON.parse(response.headers["x-pagination"]),
            body: response.data
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return []
            }
            return {
                error: error.response.status,
                data: error.response.data
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error);
        }
        console.log(error.config);
    }
}

export async function getProduct(productId, instance) {
    try {
        const response = await instance.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return {
                error: error.response.status,
                data: error.response.data
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error);
        }
        console.log(error.config);
    }
}

export async function createProduct(instance, param) {
    try {
        await instance.post("")
    } catch (error) {
        return {
            error: error.response.status,
            data: error.response.data
        }
    }
}

export async function updateProduct(instance, params) {

}

export async function deleteProduct(instance, productId) {
    try {
        await instance.delete(`/api/products/${productId}`);
    } catch (error) {
        return {
            error: error.response?.status,
            data: error.response?.data
        }
    }
}

export async function getGenres(params = {}, instance) {
    try {
        const response = await instance.get("/api/genres",
            {
                params: {
                    PageCount: params.pageCount,
                    Page: params.page,
                    productId: params.productId
                }
            })
        return {
            headers: JSON.parse(response.headers["x-pagination"]),
            body: response.data
        }
    } catch (error) {
        if (error.response) {
            return {
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

export async function getProperties(params = {}, instance) {
    try {
        const response = await instance.get("/api/properties",
            {
                params: {
                    PageCount: params.pageCount,
                    Page: params.page,
                    productId: params.productId
                }
            })
        return {
            headers: JSON.parse(response.headers["x-pagination"]),
            body: response.data
        }
    } catch (error) {
        if (error.response) {
            return {
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

export async function getFeaturedSections(params) {
    return await fetch('../response_2.json')
        .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            }
        )
        .then(data => data);
}

export function serializeToSearchString(oldValues, newValues) {
    let serialized = {}
    for (const [key, value] of oldValues) {
        serialized[key] = value
    }
    serialized[newValues.key] = typeof newValues.value === "string" ? newValues.value : JSON.stringify(newValues.value);
    return serialized;
}

export async function getAuth(credentials) {
    const body = JSON.stringify({
        login: credentials.login,
        email: credentials.email,
        password: credentials.password
    })
    return await fetch("/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        }
    ).then(response => {
        return response;
    })
}

export async function getUser(instance, id) {
    try {
        return await instance.get(`/api/users/${id}`)
    } catch (error) {
        if (error.response) {
            return {
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

export async function getPayments(instance) {
    try {
        return await instance.get("/api/payment/")
    } catch (error) {
        if (error.response) {
            return {
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

export async function createPayments(instance, payment) {
    try {
        return await instance.post("/api/payment", payment)
    } catch (error) {
        if (error.response) {
            return {
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

export async function updatePayments(instance, payment) {
    try {
        return await instance.put(`/api/payment`, payment)
    } catch (error) {
        if (error.response) {
            return {
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

export async function deletePayments(instance, paymentId) {
    try {
        return await instance.delete(`/api/payment/${paymentId}`)
    } catch (error) {
        if (error.response) {
            return {
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

export async function putUser(instance, data) {
    try {
        await instance.put("/api/users", data)
    } catch (error) {
        if (error.response) {
            return {
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

export async function postUser(instance, param) {
    try {
        await instance.post("/api/users", param)
    } catch (error) {
        if (error.response) {
            return {
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

export async function delShoppingCart(axiosInstance,productId) {
    try {
        return await axiosInstance.delete("/api/cart", {
            params: {
                productId: productId
            }
        })
    } catch (error) {
        if (error.response) {
            return {
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

export async function addToShoppingCart(axiosInstance, products) {
    try {
        await axiosInstance.post("/api/cart", {
            productIds: Array.from(products, element => element.id)
        })
    } catch (error) {
        if (error.response) {
            return {
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

export async function checkoutOrderRequest(axiosInstance) {
    try {
       return await axiosInstance.post("/api/cart/order")
    } catch (error) {
        if (error.response) {
            return {
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

export async function addComment(axiosInstance, data) {
    try {
        return await axiosInstance.post("/api/reviews", data)
    } catch (error) {
        if (error.response) {
            return {
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

export async function updateComment(axiosInstance, data) {
    try {
        return await axiosInstance.put("/api/reviews", data)
    } catch (error) {
        if (error.response) {
            return {
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
export async function deleteComment(axiosInstance, commentId) {
    try {
        await axiosInstance.delete(`/api/reviews/${commentId}`)
    } catch (error) {
        if (error.response) {
            return {
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