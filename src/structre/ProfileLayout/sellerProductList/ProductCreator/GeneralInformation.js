import {memo, useContext} from "react";
import {useFormContext} from "react-hook-form";
import {Box, Grid, Stack} from "@mui/material";
import {
    product_cost_validation,
    product_discount_validation,
    product_genres_list_validation,
    product_name_validation,
    product_properties_list_validation
} from "../../../Auth/AuthUtils";
import {CreatorInputInline} from "./CreatorInputInline";
import {GeneralContext} from "../../../GeneralLayout";
import {CreatorInputLists} from "./CreatorInputLists";
import _ from "lodash";

export const GeneralInformation = memo(() => {
    const {genres, properties} = useContext(GeneralContext);

    const {
        control,
        getValues,
        formState: {defaultValues},
    } = useFormContext();

    const handleCheck = (checkedId, name) => {
        const ids = getValues(name);
        return ids?.includes(checkedId)
            ? ids?.filter(id => id !== checkedId)
            : [...(ids ?? []), checkedId];
    };

    return (
        <Stack spacing={2}>
            <CreatorInputInline
                {...product_name_validation}
                control={control}
            />
            <CreatorInputInline
                {...product_cost_validation}
                control={control}
            />
            <CreatorInputInline
                {...product_discount_validation}
                control={control}
            />
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs>

                    <CreatorInputLists
                        {...product_genres_list_validation}
                        list={genres}
                        control={control}
                        handleCheck={handleCheck}
                        defaultValue={defaultValues["genres"]}
                        rules={{
                            validate: (value) => {
                                if (_.isEmpty(value))
                                    return "required"
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs>
                    <CreatorInputLists
                        {...product_properties_list_validation}
                        list={properties}
                        control={control}
                        handleCheck={handleCheck}
                        defaultValue={defaultValues["properties"]}
                        rules={{
                            validate: (value) => {
                                if (_.isEmpty(value))
                                    return "required"
                            }
                        }}

                    />
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </Stack>
    )
})