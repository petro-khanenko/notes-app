import {INoteData} from '../types';

interface ITrimValues {
    [key: string]: number | string;
}

export const trimValues = (obj: ITrimValues | INoteData) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        return {...acc, [key]: typeof value === 'string' ? value.trim() : value};
    }, {})
}