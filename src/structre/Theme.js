import "../fonts/Panton/Panton-Bold.ttf";
import "../fonts/Panton/Panton-Regular.ttf";
import "../fonts/Panton/Panton-BoldItalic.ttf";
import "../fonts/AkkuratPro/AkkuratBold_Pro.otf";
import "../fonts/AkkuratPro/Akkurat_Regular_Pro.otf";
import {createTheme} from "@mui/material";

const myTheme = createTheme({
    palette: {
        primary: {
            main: "#1F2833",
            secondary: "#343F4D"
        },
        secondary: {
            main: "#45A29E",
            dark: "#4be8e4"
        },
        tertiary: {
            main: "#66FCF1"
        },
        danger:{
            main: "#FC7872",
            dark: "#E85100"
        },
        accent: {
            first: "#C5C6C7",
            second: "#B08035",
            third: "#FCBD58",
            fourth: "#FC7872",
            fifth: "#FDC1BE",
            danger: "#E85100",
        },
        background: {
            default: "#0B0C10",
            primary: "#1F2833",
            header: "#001129",
            transparent: "rgba(0,0,0,0)"
        },
        text:{
            primary: "#FFFFFF",
            secondary: "#C5C6C7",
            tertiary: "#66FCF1",
            accent: "#45A29E",
            black: "#0B0C10",
        },
    },
    typography: {
        h1: {
            fontFamily: "\"Panton\", sans-serif",
            fontSize: "54pt",
            fontWeight: "bold",

        },
        h2: {
            fontFamily: "\"Iceland\", sans-serif",
            fontSize: "36px",
        },
        h2_16: {
            fontFamily: "\"Iceland\", sans-serif",
            fontSize: "16pt",
        },
        h2_20: {
            fontFamily: "\"Iceland\", sans-serif",
            fontSize: "20pt",
        },
        h2_32: {
            fontFamily: "\"Iceland\", sans-serif",
            fontSize: "32pt",
        },
        h2_64: {
            fontFamily: "\"Iceland\", sans-serif",
            fontSize: "64px",
        },
        h3: {
            fontFamily: "\"Akkurat Pro\", sans-serif",
            fontSize: "24pt",
            fontWeight: "bold",
        },
        body1: {
            fontFamily: "\"Aldrich\", sans-serif",
            fontSize: "18pt",
        },
        body14: {
            fontFamily: "'Aldrich', sans-serif",
            fontSize: "14pt"
        },
        body18: {
            fontFamily: "'Aldrich', sans-serif",
            fontSize: "18pt"
        },
        body20: {
            fontFamily: "'Aldrich', sans-serif",
            fontSize: "20pt"
        },
        body30: {
            fontFamily: "'Aldrich', sans-serif",
            fontSize: "30pt"
        },
        navLink: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "18pt"
        },
        navLink14: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "14pt"
        },
        navLink12: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "12pt"
        },
        navLinkMenu: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "14pt"
        },
        navLinkBold: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "19pt",
            fontWeight: "bold"
        },
        cost14: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "14pt",
        },
        cost18: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "18pt",
        },
        cost18bold: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "18pt",
            fontWeight: "bold",
        },
        cost24: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "24pt",
        },
        cost48medium: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "48pt",
            fontWeight: '500',
        },
        hiperLink: {
            fontFamily: "\"Akkurat Pro\", sans-serif",
            fontSize: "14pt",
            fontWeight: "bold",
        },
        callOut:{
            fontFamily: "\"Akkurat Pro\", sans-serif",
            fontSize: "14pt",
        },
        searchFont:{
            fontFamily: "\"Akkurat Pro\", sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.1rem"
        }
    },
})

export default myTheme;