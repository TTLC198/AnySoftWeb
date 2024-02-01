import {Box, Divider, Grid, List, ListItem, ListItemIcon, Typography} from "@mui/material";
import React, {useLayoutEffect, useRef, useState} from "react";
import TiltedBox from "../components/TiltedBox";
import LabelIcon from '@mui/icons-material/Label';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const tags = [
    "Great immersion",
    "Great sound"
];

const keyFeatures = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tellus ut sem iaculis vehicula.",
    "second"
];

const systemReq = {
    minimal: {
        os: [
            "windows",
            "Linux"
        ],
        processor: [
            "i3-5600",
            "r9-5900x"
        ],
        memory: [
            "8GB DDR4"
        ],
        graphics: [
            "Nvidia RTX 3080 16gb",
            "radion 2020"
        ],
        storage: [
            "100GB"
        ]
    },
    recommended: {
        os: [
            "windows",
            "Linux"
        ],
        processor: [
            "i3-5600",
            "r9-5900x"
        ],
        memory: [
            "8GB DDR4"
        ],
        graphics: [
            "Nvidia RTX 3080 16gb ",
            "radion 2020"
        ],
        storage: [
            "100GB"
        ]
    }
}

const languages = [
    {
        "lang": "Russian",
        "interface": true,
        "audio": true,
        "subtitles": true
    },
    {
        "lang": "Russian",
        "interface": false,
        "audio": true,
        "subtitles": false
    },
    {
        "lang": "Russian",
        "interface": true,
        "audio": true,
        "subtitles": false
    }
]

export default function ExpandedDescription(props) {
    const descRef = useRef(null);
    const [height, setHeight] = useState(0);
    const dateFormat = new Intl.DateTimeFormat("en-US", {year: 'numeric', month: 'long', day: 'numeric'});

    useLayoutEffect(() => {
        if (descRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setHeight(entry.contentRect.height);
                }
            });
            resizeObserver.observe(descRef.current);
        }
    }, [height])

    return (
        <Box
            sx={{
                height: height * props.max_height,
                overflow: "hidden",
                width: props.width,
                pb: 5,
                background: "linear-gradient(180deg, rgba(128, 128, 128, 0) 0%, rgba(128, 128, 128, 0.2) 68.23%)",
            }}
        >
            <Grid
                ref={descRef}
                container
                columnSpacing={3}
                sx={{
                    m: 0,
                    mx: "auto",
                    width: props.width - props.margin * 2,
                }}
            >
                <Grid item xl={8}
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          pl: "0 !important",
                          gap: 8,
                      }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h2_64"
                                color="text.accent"
                            >
                                Description
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex"
                                }}
                            >
                                {
                                    tags.map((element, index) => (
                                        <TiltedBox
                                            key={index}
                                            height={53}
                                            angle={-6 * Math.PI / 18}
                                            bgcolor={"#B08035"}
                                        >
                                            <Typography
                                                variant="body14"
                                                color="text.primary"
                                            >
                                                {element}
                                            </Typography>
                                        </TiltedBox>
                                    ))
                                }
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mt: 3
                            }}
                        >
                            <Typography
                                variant="body18"
                                color="text.primary"
                            >
                                {props.product.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography
                                variant="h2_32"
                                color="text.accent"
                            >
                                Key features
                            </Typography>
                        </Box>
                        <Box>
                            <List>
                                {
                                    keyFeatures.map((element, index) => (
                                        <ListItem
                                            key={index}
                                        >
                                            <ListItemIcon>
                                                <LabelIcon sx={{color: "accent.fifth"}}/>
                                            </ListItemIcon>
                                            <Typography
                                                variant="body18"
                                                color="text.primary"
                                            >
                                                {element}
                                            </Typography>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%"
                        }}
                    >
                        <Typography
                            variant="h2_32"
                            color="text.accent"
                        >
                            System requirements
                        </Typography>
                        <Grid container columns={13} sx={{
                            mt: 2
                        }}>
                            <Grid item xs={6}
                                  sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                  }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        textAlign: "center",
                                        width: "100%",
                                        color: "accent.second",
                                    }}
                                >
                                    Minimal
                                </Typography>
                                <List>
                                    {
                                        Object.keys(systemReq.minimal).map((key, index) => {
                                            return (
                                                <ListItem
                                                    key={index}
                                                    sx={{
                                                        alignItems: "start"
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body18"
                                                        sx={{
                                                            mr: 2,
                                                            color: "accent.second"
                                                        }}
                                                    >
                                                        {key}:
                                                    </Typography>
                                                    <Typography
                                                        color="text.secondary"
                                                    >
                                                        {systemReq.minimal[key].join(", ")}
                                                    </Typography>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Grid>
                            <Grid>
                                <Divider orientation="vertical" variant="middle" flexItem
                                         sx={{bgcolor: "accent.first"}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        textAlign: "center",
                                        color: "accent.second",
                                        width: "100%"
                                    }}
                                >
                                    Recommended
                                </Typography>
                                <List>
                                    {
                                        Object.keys(systemReq.recommended).map((key, index) => {
                                            return (
                                                <ListItem
                                                    key={index}
                                                    sx={{
                                                        alignItems: "start"
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body18"
                                                        sx={{
                                                            mr: 2,
                                                            color: "accent.second"
                                                        }}
                                                    >
                                                        {key}:
                                                    </Typography>
                                                    <Typography
                                                        color="text.secondary"
                                                    >
                                                        {systemReq.recommended[key].join(", ")}
                                                    </Typography>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xl={4}
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "stretch",
                          gap: 8,
                      }}>
                    <Box>
                        <Typography
                            variant="h2_32"
                            color="text.accent"
                        >
                            Product information
                        </Typography>
                        <List dense={true}>
                            <ListItem
                                sx={{
                                    px: 0
                                }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        mr: 2,
                                        color: "accent.second"
                                    }}
                                >
                                    Name:
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                >
                                    {props.product.name}
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={{
                                    px: 0
                                }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        mr: 2,
                                        color: "accent.second"
                                    }}
                                >
                                    Genre:
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                >
                                    {props.product.genres.map((element) => element.name).join(", ")}
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={{
                                    px: 0
                                }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        mr: 2,
                                        color: "accent.second"
                                    }}
                                >
                                    Developer:
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                >
                                    {props.product.seller.login}
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={{
                                    px: 0
                                }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        mr: 2,
                                        color: "accent.second"
                                    }}
                                >
                                    Publisher:
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                >
                                    {props.product.seller.login}
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={{
                                    px: 0
                                }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        mr: 2,
                                        color: "accent.second"
                                    }}
                                >
                                    Release date:
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                >
                                    {dateFormat.format(new Date(props.product.ts))}
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <Typography
                            variant="h2_32"
                            color="text.accent"
                        >
                            Properties
                        </Typography>
                        <List dense={true}>
                            {
                                props.product.properties.map((element, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            px: "0 !important",
                                        }}
                                    >
                                        <SportsEsportsIcon
                                            sx={{
                                                mr: 2,
                                                fontSize: 40,
                                                color: "accent.third"
                                            }}/>
                                        <Typography
                                            varyant="body18"
                                            color="text.primary"
                                        >
                                            {element.name}
                                        </Typography>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    <Box>
                        <Typography
                            variant="h2_32"
                            color="text.accent"
                        >
                            Languages
                        </Typography>
                        <Grid
                            container
                            columns={13}
                            rowSpacing={2}
                            sx={{
                                mt: 2
                            }}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={4}
                                  sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center"
                                  }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        color: "accent.second",
                                        textAlign: "center"
                                    }}
                                >
                                    Interface
                                </Typography>
                            </Grid>
                            <Grid item xs={3}
                                  sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center"
                                  }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        color: "accent.second",
                                        textAlign: "center"
                                    }}
                                >
                                    Audio
                                </Typography>
                            </Grid>
                            <Grid item xs={3}
                                  sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center"
                                  }}
                            >
                                <Typography
                                    variant="body18"
                                    sx={{
                                        color: "accent.second",
                                        textAlign: "center"
                                    }}
                                >
                                    Text
                                </Typography>
                            </Grid>
                            {
                                languages.map((element, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={3} key={index}>
                                            <Typography
                                                variant="body18"
                                                sx={{
                                                    color: "accent.first",
                                                    textAlign: "center"
                                                }}
                                            >
                                                {element.lang}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}
                                              sx={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                              }}
                                        >
                                            {
                                                element.interface ?
                                                    <CheckIcon
                                                        sx={{
                                                            color: "tertiary.main",
                                                            fontSize: 25
                                                        }}
                                                    />
                                                    :
                                                    <CloseIcon
                                                        sx={{
                                                            color: "accent.danger",
                                                            fontSize: 25
                                                        }}
                                                    />
                                            }
                                        </Grid>
                                        <Grid item xs={3}
                                              sx={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                              }}
                                        >
                                            {
                                                element.audio ?
                                                    <CheckIcon
                                                        sx={{
                                                            color: "tertiary.main",
                                                            fontSize: 25
                                                        }}
                                                    />
                                                    :
                                                    <CloseIcon
                                                        sx={{
                                                            color: "accent.danger",
                                                            fontSize: 25
                                                        }}
                                                    />
                                            }
                                        </Grid>
                                        <Grid item xs={3}
                                              sx={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                              }}
                                        >
                                            {
                                                element.subtitles ?
                                                    <CheckIcon
                                                        sx={{
                                                            color: "tertiary.main",
                                                            fontSize: 25
                                                        }}
                                                    />
                                                    :
                                                    <CloseIcon
                                                        sx={{
                                                            color: "accent.danger",
                                                            fontSize: 25
                                                        }}
                                                    />
                                            }
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}