import {styled} from "@mui/material/styles";
import Button from '@mui/material/Button';

export const CustomButton = styled(Button)({
    display: 'flex',
    textAlign:'center',
    verticalAlign: 'middle',
    position: 'relative',
    boxShadow: 'none',
    borderRadius: 0,
    textTransform: 'none',
    '& MuiTouchRipple-root': {
        height: '100%',
    },
    "&:hover": {
        bgcolor: null
    }
});

