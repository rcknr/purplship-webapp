import React, { useContext, useReducer, useState } from 'react';
import { NotificationType, WEBHOOK_EVENTS } from '@/library/types';
import ButtonField from '@/components/generic/button-field';
import WebhookMutation from '@/context/webhook-mutation';
import { Webhook, WebhookData } from '@/api/index';
import Notifier, { Notify } from './notifier';
import InputField from './generic/input-field';
import TextAreaField from './generic/textarea-field';
import CheckBoxField from './generic/checkbox-field';
import { deepEqual } from '@/library/helper';
import { Loading } from './loader';

type stateValue = string | boolean | string[] | Partial<(Webhook | WebhookData)>;
interface WebhookEditModalComponent {
    webhook?: Webhook;
    className?: string;
    onUpdate?: () => void;
}
const DEFAULT_STATE = {} as (Webhook | WebhookData);

function reducer(state: any, { name, value }: { name: string, value: stateValue }) {
    switch (name) {
        case 'partial':
            return { ...(value as WebhookData) };
        default:
            return { ...state, [name]: value }
    }
}

const WebhookEditModal: React.FC<WebhookEditModalComponent> = WebhookMutation<WebhookEditModalComponent>(
    ({ webhook, children, className, onUpdate, addWebhook, updateWebhook }) => {
        const { notify } = useContext(Notify);
        const { setLoading, loading } = useContext(Loading);
        const [isActive, setIsActive] = useState<boolean>(false);
        const [key, setKey] = useState<string>(`webhook-${Date.now()}`);
        const [isNew, _] = useState<boolean>(webhook === null || webhook === undefined);
        const [payload, dispatch] = useReducer(reducer, webhook, () => webhook || DEFAULT_STATE);

        const open = () => {
            setIsActive(true);
            dispatch({ name: 'partial', value: webhook || DEFAULT_STATE });
        };
        const close = (_?: React.MouseEvent) => {
            if (isNew) dispatch({ name: 'partial', value: DEFAULT_STATE });
            setIsActive(false);
            setKey(`webhook-${Date.now()}`);
        };
        const handleChange = (event: React.ChangeEvent<any>) => {
            event.preventDefault();
            const target = event.target;
            let name: string = target.name;
            let value: stateValue = target.type === 'checkbox' ? target.checked : target.value;

            if (target.multiple === true) {
                value = Array.from(target.selectedOptions).map((o: any) => o.value)
            }

            dispatch({ name, value });
        };
        const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            setLoading(true);
            try {
                if (isNew) {
                    await addWebhook(payload as WebhookData);
                } else {
                    await updateWebhook(payload as Webhook);
                }
                notify({
                    type: NotificationType.success,
                    message: `Webhook ${isNew ? 'added' : 'updated'} successfully`
                });
                setTimeout(() => close(), 2000);
                if (onUpdate !== undefined) onUpdate();
            } catch (err) {
                notify({ type: NotificationType.error, message: err });
            }
            setLoading(false);
        };

        return (
            <Notifier>
                <button className={className} onClick={open}>
                    {children}
                </button>

                <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
                    <div className="modal-background" onClick={close}></div>
                    <form className="modal-card" onSubmit={handleSubmit}>
                        <section className="modal-card-body">
                            <h3 className="subtitle is-3">{isNew ? 'Add ' : 'Update '} a Webhook endpoint</h3>

                            <InputField label="Endpoint URL" name="url" value={payload?.url} onChange={handleChange} className="is-small" required />

                            <TextAreaField label="Description" name="description" value={payload?.description as string} onChange={handleChange} className="is-small" />

                            <div className="field mb-2">
                                <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
                                    <span>Events</span>
                                    <span className="icon is-small has-text-danger small-icon"><i className="fas fa-asterisk"></i></span>
                                </label>

                                <div className="control">
                                    <div className="select is-multiple is-fullwidth">
                                        <select name="enabled_events" defaultValue={payload?.enabled_events} onChange={handleChange} size={6} multiple required>
                                            {WEBHOOK_EVENTS.map(event => <option key={event} value={event}>{event}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <CheckBoxField name="test_mode" defaultChecked={payload.test_mode} onChange={handleChange}>Test Mode</CheckBoxField>

                            <ButtonField
                                type="submit"
                                className={`is-primary ${loading ? 'is-loading' : ''}`}
                                fieldClass="has-text-centered mt-6"
                                disabled={deepEqual(payload, webhook) || loading}>
                                <span>Submit</span>
                            </ButtonField>
                        </section>
                    </form>
                    <button className="modal-close is-large" aria-label="close" onClick={close}></button>
                </div>
            </Notifier>
        )
    });

export default WebhookEditModal;