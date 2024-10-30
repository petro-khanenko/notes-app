export enum ENoteKeys {
    ID = 'id',
    TITLE = 'title',
    CONTENT = 'content',
}

export interface INoteData {
    [ENoteKeys.ID]: number;
    [ENoteKeys.TITLE]: string;
    [ENoteKeys.CONTENT]: string;
}