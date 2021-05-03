import React from "react";
import { CommodityWeightUnitEnum } from "@/api";
import { CommodityType, CURRENCY_OPTIONS, NotificationType, WEIGHT_UNITS } from "@/library/types";
import { FormEvent, useContext, useReducer, useRef, useState } from "react";
import { Notify } from "@/components/notifier";
import ButtonField from "@/components/generic/button-field";
import InputField from "@/components/generic/input-field";
import SelectField from "@/components/generic/select-field";
import { CommodityDataWeightUnitEnum } from "@/api/models/CommodityData";
import { deepEqual, isNone } from "@/library/helper";
import CountryInput from "@/components/generic/country-input";
import ShipmentMutation from "@/components/data/shipment-mutation";


type stateValue = string | boolean | Partial<CommodityType>;
export const DEFAULT_COMMODITY_CONTENT: Partial<CommodityType> = {
    quantity: 1,
    weight_unit: CommodityWeightUnitEnum.Kg,
};

interface CommodityTypeFormComponent {
    value?: CommodityType;
    update: (data: CommodityType) => void;
}

function reducer(state: any, { name, value }: { name: string, value: stateValue }) {
    switch (name) {
        case 'partial':
            return { ...(value as CommodityType) };
        default:
            return { ...state, [name]: value }
    }
}

const CommodityForm: React.FC<CommodityTypeFormComponent> = ShipmentMutation<CommodityTypeFormComponent>(({ value, update }) => {
    const form = useRef<HTMLFormElement>(null);
    const { notify } = useContext(Notify);
    const [key, setKey] = useState<string>(`commodity-${Date.now()}`);
    const [commodity, dispatch] = useReducer(reducer, value, () => value || DEFAULT_COMMODITY_CONTENT);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        let name: string = target.name;
        let value: stateValue = target.type === 'checkbox' ? target.checked : target.value;

        dispatch({ name, value });
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            update(commodity);
            setKey(`commodity-${Date.now()}`);
        } catch (message) {
            notify({ type: NotificationType.error, message });
        }
    };

    return (
        <form className="px-1 py-2" onSubmit={handleSubmit} key={key} ref={form}>

            <div className="columns is-multiline mb-0 px-2">

                <InputField label="SKU" defaultValue={commodity?.sku} onChange={handleChange} name="sku" fieldClass="column mb-0 is-6 px-2 py-1" required />

                <CountryInput label="Origin Country" onValueChange={value => dispatch({ name: "origin_country", value: value as string })} defaultValue={commodity.origin_country} fieldClass="column mb-0 is-6 px-2 py-1" />

                <InputField label="Quantity" onChange={handleChange} defaultValue={commodity?.quantity} name="quantity" type="number" step="1" min="1" fieldClass="column is-6 mb-0 px-2 py-1" required />

                <InputField label="Value Amount" onChange={handleChange} defaultValue={commodity?.value_amount} name="value_amount" type="number" step="any" min="0" fieldClass="column is-3 mb-0 px-2 py-1" />

                <SelectField label="Value Currency" onChange={handleChange} value={commodity.value_currency} name="value_currency" className="is-fullwidth" fieldClass="column is-3 mb-0 px-2 py-1" required={!isNone(commodity?.value_amount)}>
                    {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </SelectField>

            </div>

            <h6 className="is-size-7 mx-2 my-3 has-text-weight-bold">Weight</h6>

            <div className="columns mb-0 px-2">

                <InputField type="number" step="any" min="0" name="weight" onChange={handleChange} defaultValue={commodity.weight} fieldClass="column is-2 mb-0 px-2 py-1" required />

                <SelectField name="weight_unit" onChange={handleChange} value={commodity.weight_unit || CommodityDataWeightUnitEnum.Kg} className="is-fullwidth" fieldClass="column is-2 mb-0 px-2 py-1" required>
                    {WEIGHT_UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </SelectField>

            </div>

            <ButtonField type="submit" className="is-primary" fieldClass="has-text-centered mt-3" disabled={deepEqual(value, commodity)}>
                <span>{(commodity.id || '').includes('new-') ? 'Add' : 'Save'}</span>
            </ButtonField>

        </form>
    )
});

export default CommodityForm;