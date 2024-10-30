import React from 'react';
import {render, screen, act, fireEvent} from '@testing-library/react';
import Main from '../main';
import {LOCALIZATION} from '../common/constants';

const data = {
    id: 123456789,
    title: 'Title',
    content: 'Content',
}

const electron = {
    readFile: () => Promise.resolve([data]),
    writeFile: () => Promise.resolve([]),
}

describe('Main component', () => {
    test('render Main component with empty state', async () => {
        window.electron = {
            ...electron,
            readFile: () => Promise.resolve([]),
        };
        await act(async () => render(<Main />));
        expect(screen.queryByText(LOCALIZATION.emptyList)).toBeDefined();
    });

    test('render Main component with full state', async () => {
        window.electron = electron;
        await act(async () => render(<Main />));
        expect(screen.queryByText(LOCALIZATION.emptyList)).toBeNull();
    });

    test('click on Main component should close toolbar', async () => {
        window.electron = electron;
        await act(async () => render(<Main />));
        fireEvent.click(screen.queryByTestId('main'));
        expect(screen.queryByTestId('toolbar')).toBeNull();
    });
});