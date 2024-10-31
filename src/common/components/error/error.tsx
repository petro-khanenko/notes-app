import React from 'react';

interface IErrorProps {
    error: string;
}

export const Error: React.FC<IErrorProps> = ({ error }) => {

    return (
        <div className="error">
            {error}
        </div>
    )
}