import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import InputField, { InputFieldComponent } from '@/components/generic/input-field';
import { Address } from '@/api/index';
import { isNone } from '@/library/helper';
import { initDebouncedPrediction, QueryAutocompletePrediction } from '@/library/autocomplete';
import { Collection } from '@/library/types';
import { APIReference } from '@/context/references-query';
import { FeatureFlags } from '@/context/feature-flags';

interface AddressAutocompleteInputComponent extends InputFieldComponent {
    onValueChange: (value: Partial<Address>) => void;
    defaultValue?: string;
    disableSuggestion?: boolean;
    country_code?: string;
}

const AddressAutocompleteInput: React.FC<AddressAutocompleteInputComponent> = ({ onValueChange, country_code, ...props }) => {
    const { countries } = useContext(APIReference);
    const { ADDRESS_AUTO_COMPLETE } = useContext(FeatureFlags);
    const [key] = useState<string>(`predictions_${Date.now()}`);
    const [predictions, setPredictions] = useState<QueryAutocompletePrediction[]>([]);
    const [predictor, initPredictor] = useState<ReturnType<typeof initDebouncedPrediction> | undefined>();

    const onClick = (e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select();
    const onInput = (e: ChangeEvent<any>) => {
        e.preventDefault();
        const value: string = e.target.value;

        if (predictor !== undefined) {
            let prediction = predictions.find(p => p.description.toLowerCase() === value.toLowerCase());
            let address = (
                isNone(prediction)
                ? { address_line1: value }
                : predictor?.formatPrediction(prediction as QueryAutocompletePrediction, countries as Collection)
            ) as Partial<Address>;
            
            onValueChange(address);
            if (isNone(prediction) && (value || "").length > 4) {
                predictor.getPlacePredictions(
                    { input: value }, (newPredictions) => setPredictions(newPredictions)
                );
                e.target.value = address.address_line1;
            }
        } else {
            onValueChange({ address_line1: value });
        }
    };

    useEffect(() => {
        initPredictor(initDebouncedPrediction(ADDRESS_AUTO_COMPLETE));
    }, [ADDRESS_AUTO_COMPLETE]);

    const content = (_: any) => (
        <InputField onInput={onInput} onClick={onClick} list={key} {...props}>
            <datalist id={key}>
                {predictions
                    .map((prediction, index) => (
                        <option key={`${index}-prediction`} value={prediction.description}>{prediction.location}</option>
                    ))
                }
            </datalist>
        </InputField>
    );

    return <>{content(predictions)}</>;
};

export default AddressAutocompleteInput;