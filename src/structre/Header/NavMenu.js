import {Box, ClickAwayListener, Grow, Popper} from "@mui/material";


export default function NavMenu(props) {
    return (
        <Popper
            open={props.isMenuOpen}
            anchorEl={props.menuAnchor.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            {...props}
        >
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: 'top',
                    }}
                >
                    <Box sx={{
                        mt: '5px',
                        backgroundColor: "rgba(0,0,0,0)"
                    }}
                         onKeyDown={props.handleListKeyDown}
                    >
                        <ClickAwayListener onClickAway={props.handleClose}>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: "wrap",
                                alignContent: 'start',
                                gap: '15px',
                                backgroundColor: "rgba(0,0,0,0)"
                            }}
                                 onMouseLeave={props.handleClose}
                            >
                                {props.children}
                            </Box>
                        </ClickAwayListener>
                    </Box>
                </Grow>
            )}
        </Popper>
    )
}