const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 2000;
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const validateTitle = (title: string) => {
    switch (true) {
        case !title.trim():
            return 'Title cannot be empty!';
        case title.trim().length >= MAX_TITLE_LENGTH:
            return `Title is too long. The maximum length is ${MAX_TITLE_LENGTH} characters!`;
        default:
            return '';
    }
}

export const validateContent = (content: string, html?: string) => {
    switch (true) {
        case !content.trim() && !html.includes('img'):
            return 'Content cannot be empty!';
        case content.trim().length >= MAX_CONTENT_LENGTH:
            return `Title is too long. The maximum length is ${MAX_CONTENT_LENGTH} characters!`;
        default:
            return '';
    }
}

export const validateURL = (url: string) => {
    return !URL_REGEXP.test(url) && 'Please enter correct url address!';
}