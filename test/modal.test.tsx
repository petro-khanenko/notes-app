import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {render, RenderResult, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Modal} from '../src/common/components/';

const props = {
    label: 'Modala label',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
}

describe('Modal component', () => {

    let input: HTMLInputElement;
    let confirmBtn: HTMLInputElement;
    let renderOption: RenderResult

    beforeEach(() => {
        renderOption = render(<Modal {...props} />)
        input = screen.getByTestId('modalInput');
        confirmBtn = screen.getByTestId('confirmBtn');
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    test('init input value should be empty string', () => {
        expect(input.value).toBe('');
    })

    test('Input use html tag input', () => {
        expect(input.tagName).toBe('INPUT');
    })

    test('confirm button should be disabled with empty value', () => {
        expect(confirmBtn.disabled).toBeTruthy();
    })

    test('if user change data confirm button should not be disabled', async () => {
        await userEvent.type(input, 'https://some-img-addres.com');
        expect(confirmBtn.disabled).toBeFalsy();
    })

    test('if user input not valid url value validation error should be displayed', async () => {
        await userEvent.type(input, 'some-wrong-url-address');
        await userEvent.click(confirmBtn);
        expect(screen.getByTestId('modalError')).toBeDefined();
    })

    test('input value should change after type some text', async () => {
        await userEvent.type(input, 'some-text')
        renderOption.rerender(<Modal {...props} />)

        expect(input.value).toBe('some-text')
    })
})