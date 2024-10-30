import React from 'react';
import {TextBtnType} from '../../types';

interface ICreateBtnProps {
    type?: TextBtnType;
    Icon?: React.FC<{className?: string}>;
    text: string;
    onClick: () => void;
}

export const TextBtn: React.FC<ICreateBtnProps> = ({type = 'primary', Icon, text, onClick}) => {
    return (
        <div
            className={`btn_container btn_${type}`}
            data-testid="addBtn"
            onClick={onClick}
        >
            { Icon && <Icon className="btn_icon" /> }
            <div className="btn_text">
                {text}
            </div>
        </div>
    )
}