import MyMenuItem from "./MyMenuItem";
import {Box, Divider, MenuList} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function MenuExpandablePart(props) {
    const navigate = useNavigate();

    function buildLayout() {
        let LayoutArray = [];
        for (let section of props.menu_options) {
            let sectionArray = [];
            for (let element of section) {
                sectionArray.push(
                    <MyMenuItem
                        id={element["id"]}
                        name={element["name"]}
                        handle_close={props.menu_close}
                        menu_popper_enter={props.menu_enter}
                        menu_popper_leave={props.menu_leave}
                        option_hover_state={props.menu_option_hover_state}
                        option_hover_set_state={props.menu_option_hover_set_state}
                    >
                        {element["name"]}
                    </MyMenuItem>
                )
            }
            if (section.length !== 1) {
                sectionArray.push(<Divider component="li"/>);
            }
            LayoutArray.push(sectionArray);
        }

        return LayoutArray;
    }

    return (
        <Box>
            <MenuList
                autoFocusItem={props.isMenuOpen}
                ref={props.menu_anchr}
                id="composition-menu"
                sx={{
                    p: 1,
                    bgcolor: 'accent.first',
                    boxShadow: 6,
                    border: 2,
                    borderColor: 'accent.second',
                }}
                onClick={() => {
                    navigate(props.shop_link);
                }}
            >
                {buildLayout()}
            </MenuList>
        </Box>
    )
}