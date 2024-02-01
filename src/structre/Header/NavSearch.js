import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {
    Autocomplete,
    Box,
    ClickAwayListener, createFilterOptions,
    IconButton,
    Slide
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import './css/NavSearchStyle.css'
import SearchInput from "./components/SearchInput";
import CustomSearchPopup from "./components/CustomSearchPopup";
import {getProducts} from "../api";
import {CustomSearchOption} from "./components/CustomSearchOption";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Auth/useAuth";
import {UserFunctionsContext} from "../ShopSection/UserContext";

export default function NavSearch(props) {
    const {markProducts} = useContext(UserFunctionsContext),
        {axiosInstance} = useAuth();

    const [searchValue, setSearchValue] = useState(""),
     [searchInputValue, setSearchInputValue] = useState(""),
     [searchOptions, setSearchOptions] = useState([]);


    const searchAnchor = useRef(null),
     containerRef = useRef(null);

    const navigate = useNavigate();

    function inputChange(newString) {
        setSearchInputValue(newString);
        async function fetchProducts() {
            let options = await getProducts({
                query: {
                    name: newString
                },
                pageCount: 5,
                orderBy: {
                    object: "id",
                    isDesc: false
                }
            }, axiosInstance);
            setSearchOptions(await options.body);
        }
        fetchProducts();
    }

    function activeSearchOpenHandler() {
        props.set_is_active_seach_field(true);
    }

    function activeSearchClickAwayHandler() {
        if (searchValue || searchInputValue) {
            return;
        }
        props.set_is_active_seach_field(false);
    }

    function searchCloseHandler() {
        setSearchInputValue("");
        setSearchValue("");
        props.set_is_active_seach_field(false);
    }

    useEffect(() => {
        if (props.is_active_seach_field)
            return;
        async function fetchProducts() {
            let options = await getProducts({
                pageCount: 5,
                orderBy: {
                    object: "id",
                    isDesc: false
                }
            }, axiosInstance);
            setSearchOptions(await options.body);
        }
        fetchProducts();
    }, [props.is_active_seach_field]);

    useEffect(() => {
        if (!props.is_active_seach_field) {
            setSearchOptions([]);
        }
    }, [props.is_active_seach_field]);

    const markedProducts = useMemo(() => markProducts(searchOptions),[markProducts, searchOptions]);

    const loading = props.is_active_seach_field && markedProducts.length === 0;

    return (
        <ClickAwayListener onClickAway={activeSearchClickAwayHandler}>
            <Box style={{
                display: "flex",
                flexWrap: 'wrap',
                alignContent: 'center',
                marginLeft: "1.5vw",
                overflow: 'hidden'
            }}
                 ref={containerRef}
            >

                {
                    !props.is_active_seach_field &&
                    <IconButton
                        sx={{color: "text.primary"}}
                        onClick={activeSearchOpenHandler}
                    >
                        <SearchIcon sx={{fontSize: 30}}/>
                    </IconButton>
                }
                <Slide direction="left"
                       in={props.is_active_seach_field}
                       container={containerRef.current}
                       unmountOnExit
                       timeout={500}
                >
                    <Autocomplete
                        ref={searchAnchor}
                        sx={{
                            width: 700,
                        }}
                        filterOptions={(x) => x}
                        value={searchValue || null}
                        onChange={(event, newValue, reason) => {
                            if (reason === "selectOption") {
                                setSearchValue(newValue);
                                searchCloseHandler();
                            }
                        }}
                        inputValue={searchInputValue}
                        onInputChange={(event, newInputValue) => {
                            inputChange(newInputValue);
                        }}
                        options={markedProducts}
                        loading={loading}
                        getOptionLabel={(option) => option.name}

                        PaperComponent={CustomSearchPopup}
                        renderOption={(props, option) =>
                            <CustomSearchOption
                                key={option.id}
                                properties={props}
                                close_input={searchCloseHandler}
                                option={option}
                            />
                        }
                        renderInput={(params) =>
                            <SearchInput
                                param={params}
                                close_input={searchCloseHandler}
                                search_input={(event) => {
                                    navigate(`../shop?Name=${searchInputValue}`);
                                    searchCloseHandler();
                                }}
                            />}
                    />
                </Slide>
            </Box>
        </ClickAwayListener>
    )
}

