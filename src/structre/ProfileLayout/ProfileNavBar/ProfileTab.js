import {memo, useState} from "react";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const ProfileTab = memo(function ProfileTab({
                                                       name,
                                                       currentPath,
                                                       children,
                                                       ...rest
                                                   }) {
    const isActive = name === currentPath;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                padding: "15px 15px 15px 20px",
                gap: "13px",
                borderBottom: 1,
                borderBottomColor: "rgba(197, 198, 199, 0.5)",
                borderLeft: 4,
                borderLeftColor: isActive ? "tertiary.main" : "rgba(197, 198, 199, 0)",
                cursor: "pointer",
                bgcolor: isHovered && "rgba(197, 198, 199, 0.1)"
            }}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
            onClick={()=>navigate(`/profile/${name}`)}
            {...rest}
        >
            {children(isActive)}
        </Box>
    )
})