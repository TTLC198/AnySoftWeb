import {createContext, useContext, useEffect, useLayoutEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage";
import {getAuth} from "../api";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ apiClient, children }) => {
    const [token, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();


    useLayoutEffect(() => {
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/"/g, '')}`;
        }
    }, [apiClient, token]);

    async function login(data, callback = () => {}) {
        try {
            const response = await apiClient.post("/api/auth/login", {
                login: data.login,
                email: data.email,
                password: data.password
            });
            setToken(await response.data)

            navigate("/");
            callback();
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

    function logout() {
        setToken(null);
        navigate("/authorization/signin", { replace: true });
    }

    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    return <AuthContext.Provider value={{token, setToken, parseJwt, axiosInstance: apiClient, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};