import NavMenu from "./NavMenu";
import MenuExpandablePart from "./components/MenuExpandablePart";
import MenuGamesPart from "./components/MenuGamesPart";
import React, {useContext, useEffect, useRef, useState} from "react";
import {getGenres, getProducts} from "../api";
import {AuthContext} from "../Auth/useAuth";
import {GeneralContext} from "../GeneralLayout";

export default function NavGameMenu(props) {
    const [products, setProducts] = useState([]), //TODO Add loader screen to products
        [menuOptions, setMenuOptions] = useState([]),
        [isMenuHovered, setIsMenuHovered] = useState(false),
        [idMenuHoveredItem, setIdMenuHoveredItem] = useState('-1'),
        [sectionName, setSectionName] = useState(""),
        [shopLink, setShopLink] = useState(""),
        menuListAnchr = useRef(null),
        {genres} = useContext(GeneralContext),
        {axiosInstance} = useContext(AuthContext);

    useEffect(() => {
        setMenuOptions([
            [
                {
                    id: 'newRelease',
                    name: "New release"
                },
                {
                    id: 'bestSellers',
                    name: "Best sellers"
                },
                {
                    id: 'onSales',
                    name: "On sale now"
                }
            ],
            genres.slice(0, 4),
            [
                {
                    id: 'allGames',
                    name: "Browse all games"
                }
            ]
        ])
    }, [props.isMenuOpen])

    useEffect(() => {
        (async () => {
            switch (idMenuHoveredItem) {
                case "newRelease":
                    setProducts(await (await getProducts({
                            pageCount: 6,
                            orderBy: {
                                object: "id",
                                isDesc: false
                            }
                        },
                        axiosInstance
                    )).body);
                    setShopLink("../shop?sort=%7B\"object\"%3A\"ts\"%2C\"isDesc\"%3Atrue%7D");
                    break;
                case "bestSellers":
                    setProducts(await (await getProducts({
                            pageCount: 6,
                            orderBy: {
                                object: "rating",
                                isDesc: false
                            }
                        },
                        axiosInstance)).body);
                    setShopLink("../shop");
                    break;
                case "onSales":
                    setProducts(await (await getProducts({
                            query: {
                                discount: {
                                    Min: 0.1,
                                    Max: 100.0
                                }
                            },
                            pageCount: 6,
                            orderBy: {
                                object: "id",
                                isDesc: false
                            }
                        },
                        axiosInstance)).body);
                    setShopLink("../shop");
                    break;
                case "allGames":
                    setProducts(await (await getProducts({
                            pageCount: 6,
                            orderBy: {
                                object: "id",
                                isDesc: false
                            }
                        },
                        axiosInstance)).body);
                    setShopLink("../shop");
                    break;
                default:
                    if (idMenuHoveredItem === '-1')
                        break;
                    setProducts(await (await getProducts({
                            query: {
                                genres: [idMenuHoveredItem]
                            },
                            pageCount: 6,
                            orderBy: {
                                object: "id",
                                isDesc: false
                            }
                        },
                        axiosInstance)).body);
                    setShopLink(`../shop?genres=%5B${idMenuHoveredItem}%5D`);
                    break;
            }
        })()
    }, [idMenuHoveredItem, props.isMenuOpen])

    function menuEnter(name) {
        setSectionName(name);
        setIsMenuHovered(true)
    }

    function menuLeave(event) {
        if (menuListAnchr.current && menuListAnchr.current.contains(event.target) && menuListAnchr.current !== event.target) { //TODO somehow get mouse target
            return;
        }
        setIdMenuHoveredItem('-1');
        setIsMenuHovered(false);
    }

    function menuClose(event) {
        setIsMenuHovered(false);
        setIdMenuHoveredItem('-1');
        props.handleClose(event);
    }

    return (
        <NavMenu
            isMenuOpen={props.isMenuOpen}
            menuAnchor={props.menuAnchor}
            handleClose={menuClose}
            handleListKeyDown={props.handleListKeyDown}
        >
            <MenuExpandablePart
                menu_options={menuOptions}
                isMenuOpen={props.isMenuOpen}
                menu_enter={menuEnter}
                menu_leave={menuLeave}
                menu_close={menuClose}
                menu_anchr={menuListAnchr}
                shop_link={shopLink}
                menu_option_hover_state={idMenuHoveredItem}
                menu_option_hover_set_state={setIdMenuHoveredItem}
            />
            <MenuGamesPart
                menu_game_hover_state={isMenuHovered}
                menu_section_name={sectionName}
                menu_products={products}
                menu_close={menuClose}
                shop_link={shopLink}
            />
        </NavMenu>
    )
}