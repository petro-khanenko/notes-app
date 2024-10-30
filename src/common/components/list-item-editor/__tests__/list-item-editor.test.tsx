import React from 'react';
import {render, fireEvent, screen, act} from '@testing-library/react';
import {ListItemEditor} from '../list-item-editor.component';
import {LOCALIZATION} from '../../../constants';

const note = {
    id: 123456789,
    title: 'Title',
    content: 'Content',
}

const props = {
    data: note,
    activeNoteId: 123456789,
    onChangeTitle: jest.fn(),
    onChangeContent: jest.fn(),
    onRemove: jest.fn(),
    onSetActiveNoteId: jest.fn(),
}

describe('ListItemEditor component', () => {
    test('check ListItemEditor note fields placeholders', async () => {
        await act(async () => render(<ListItemEditor {...props} />));
        expect(screen.queryByPlaceholderText(LOCALIZATION.inputPlaceholderText)).toBeDefined();
        expect(screen.queryByPlaceholderText(LOCALIZATION.contentPlaceholderText)).toBeDefined();
    });

    test('click on note should open toolbar', async () => {
        await act(async () => render(<ListItemEditor {...props} />));
        await act(async () => fireEvent.click(screen.getByTestId('input')));
        expect(screen.getByTestId('toolbar')).toBeDefined();
    });

    test('Input should be editable', async () => {
        await act(async () => render(<ListItemEditor {...props} />));
        await act(async () => fireEvent.change(screen.getByTestId('input'), {
            target: {value: 'Some another title'},
        }));
        expect(screen.queryByText('Some another title')).toBeDefined();
    });
});