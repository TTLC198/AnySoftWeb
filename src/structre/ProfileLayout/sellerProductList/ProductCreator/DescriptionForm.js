import {memo} from "react";
import {useFormContext} from "react-hook-form";
import {Box} from "@mui/material";
import {InputWithValidation} from "../../../components/FormComponents/InputWithValidation";
import {product_description_validation} from "../../../Auth/AuthUtils";

export const DescriptionForm = memo(() => {
    const {
        control,
    } = useFormContext();

    return (
        <Box>
            <InputWithValidation
                {...product_description_validation}
                control={control}
            />
        </Box>
    )
})