import {Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import {styled} from "@mui/material/styles";
import {Check} from "@mui/icons-material";
import React from "react";

const QontoConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 5,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.tertiary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.secondary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.accent.second,
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({theme, ownerState}) => ({
    color: theme.palette.accent.second,
    display: 'flex',
    height: 11,
    alignItems: 'center',
    ...(ownerState.active && {
        color: theme.palette.tertiary.main,
    }),
    '& .QontoStepIcon-completedIcon': {
        color: theme.palette.secondary.main,
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const {active, completed, className} = props;

    return (
        <QontoStepIconRoot ownerState={{active}} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon"/>
            ) : (
                <div className="QontoStepIcon-circle"/>
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

export function CustomStepper({
                                  activeStep,
                                  steps
                              }) {
    return (
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>}>
            {
                steps.map((element, index) =>
                    <Step key={index}>
                        <StepLabel StepIconComponent={QontoStepIcon}>
                            <Typography
                                variant={"body14"}
                                color={
                                    index < activeStep ?
                                        "text.accent"
                                        : index === activeStep ?
                                            "text.tertiary"
                                            : "accent.second"
                                }
                            >
                                {element.label}
                            </Typography>
                        </StepLabel>
                    </Step>
                )
            }
        </Stepper>
    )
}