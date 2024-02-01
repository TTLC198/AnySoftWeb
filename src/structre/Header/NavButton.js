import React, {forwardRef, useState} from "react";
import {MyButton} from "../components/MyButton";

export const NavButton = forwardRef((props, ref) => {
    return (
        <MyButton
            {...props}
            height="53px"
            main_color={"#45A29E"}
            hover_color={"#66FCF1"}
            ref={ref}
            angle={-6 * Math.PI / 18}
            style={{
                padding: 0,
            }}
        >
            {props.children}
        </MyButton>
    )
})

