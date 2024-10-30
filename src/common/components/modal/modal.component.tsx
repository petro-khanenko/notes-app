import React, {useCallback, useState} from 'react';
import {LOCALIZATION} from '../../constants';
import {validateURL} from '../../utils';

interface IModalProps {
    label?: string;
    onConfirm: (text: string) => void;
    onCancel: () => void;
}

export const Modal: React.FC<IModalProps> = ({
                                                 label,
                                                 onConfirm,
                                                 onCancel,
                                             }) => {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<boolean | string>(false);

    const handleConfirm = useCallback(() => {
        const error = validateURL(inputValue);
        setError(error);
        if (!error) onConfirm(inputValue);
    }, [inputValue]);

    const handleCancel = useCallback(() => {
        setInputValue('');
        onCancel();
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        setInputValue(value);
    }, []);

    return (
        <>
            <div className="modal">
                <div className="modal_content">
                    <label className="modal_label">{label}</label>
                    <br/>
                    <input
                        className="modal_input"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    {
                       error && (
                            <div className="modal_error">
                                {error}
                            </div>
                        )
                    }
                    <div className="modal_btns">
                        <button
                            className="modal_btns__confirm"
                            onClick={handleConfirm}
                        >
                            {LOCALIZATION.confirmBtnText}
                        </button>
                        <button
                            className="modal_btns__cancel"
                            onClick={handleCancel}
                        >
                            {LOCALIZATION.cancelBtnText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};