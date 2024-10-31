import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {render, RenderResult, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {EditorToolbar} from '../src/common/components/';
import {Editor} from '@tiptap/react';


const editor = {
    chain: vi.fn(() => ({
        focus: vi.fn(() => ({
            extendMarkRange: vi.fn(() => ({
                setLink: vi.fn(() => ({
                    run: vi.fn(),
                })),
                setImage: vi.fn(() => ({
                    run: vi.fn()
                })),
            }))
        }))
    }))
}


describe('Modal component', () => {

    let addImgBtn: HTMLInputElement;
    let addUrlBtn: HTMLInputElement;
    let renderOption: RenderResult

    beforeEach(() => {
        renderOption = render(<EditorToolbar editor={editor as unknown as Editor} />)
        addImgBtn = screen.getByTestId('addImgBtn');
        addUrlBtn = screen.getByTestId('addUrlBtn');
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    test('modal window should be displayed after click on image button', async () => {
        await userEvent.click(addImgBtn);
        expect(screen.getByTestId('modalInput')).toBeDefined();
    })

    test('modal window should be displayed after click on url button', async () => {
        await userEvent.click(addUrlBtn);
        expect(screen.getByTestId('modalInput')).toBeDefined();
    })

    test('Modal window should not be displayed by default', () => {
        expect(screen.queryByPlaceholderText('LOCALIZATION.modalInputPlaceholderText')).toBeNull();
    })

})