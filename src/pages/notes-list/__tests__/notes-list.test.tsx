import React from 'react';
import {vi} from 'vitest';
import {render, fireEvent, screen, act} from '@testing-library/react';
import {NotesList} from '../notes-list.component';
import {LOCALIZATION} from '../../../common/constants';

const props = {
    activeNoteId: 123456789,
    onSetActiveNoteId: vi.fn(),
}

const note = {
    id: 123456789,
    title: 'Title',
    content: 'Content',
}

const data = [...Array(5)].map((_, i) => ({...note, id: note.id + i}));

const electron = {
    readFile: () => Promise.resolve(data),
    writeFile: () => Promise.resolve([]),
}

describe('NotesList component', () => {
    test('render NotesList component with empty state', async () => {
        window.electron = {
            ...electron,
            readFile: () => Promise.resolve([]),
        };
        await act(async () => render(<NotesList {...props} />));
        expect(screen.queryByText(LOCALIZATION.emptyList)).toBeDefined();
    });

    test('render NotesList component with full state', async () => {
        window.electron = electron;
        await act(async () => render(<NotesList {...props} />));
        expect(screen.queryByText(LOCALIZATION.emptyList)).toBeNull();
    });

    test('click on "Create New Note" button should create new note', async () => {
        window.electron = electron;
        await act(async () => render(<NotesList {...props} />));
        await act(async () => fireEvent.click(screen.getByText(LOCALIZATION.createBtnText)));
        expect(screen.getAllByTestId('item').length).toBe(6);
    });

    test('click on cross button should remove note', async () => {
        window.electron = electron;
        await act(async () => render(<NotesList {...props} />));
        await act(async () => fireEvent.click(screen.getAllByTestId('removeBtn')[0]));
        expect(screen.getAllByTestId('item').length).toBe(4);
    });
});