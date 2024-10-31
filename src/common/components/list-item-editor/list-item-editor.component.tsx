import React, {useCallback, useState} from 'react';
import {GiCrossMark} from 'react-icons/gi';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import {EditorToolbar} from '../editor-toolbar';
import {ENoteKeys, INoteData} from '../../types';
import {validateContent, validateTitle} from '../../utils';
import {LOCALIZATION} from '../../constants';

export interface IListItemEditorProps {
    data: INoteData;
    activeNoteId: number | null;
    onChangeTitle: (value: string, note: Omit<INoteData, ENoteKeys.TITLE>) => void;
    onChangeContent: (value: string, note: Omit<INoteData, ENoteKeys.CONTENT>) => void;
    onRemove: (removeId: number) => void;
    onSetActiveNoteId: (id: number) => void;
}

interface IErrors {
    [ENoteKeys.TITLE]: string;
    [ENoteKeys.CONTENT]: string;
}

export const ListItemEditor: React.FC<IListItemEditorProps> = React.memo(({
                                                                   data: {id, title = '', content = ''},
                                                                   activeNoteId,
                                                                   onChangeTitle,
                                                                   onChangeContent,
                                                                   onRemove,
                                                                   onSetActiveNoteId,
                                                               }) => {
    const [errors, setErrors] = useState<IErrors>({} as IErrors);

    const handleError = useCallback((key: keyof IErrors, value: string, handler: (str: string, html?: string) => string | false, html?: string) => {
        const error = handler(value, html);
        setErrors((prev) => ({
            ...prev,
            [key]: error,
        }));
    }, []);

    const editor = useEditor({
        content,
        extensions: [StarterKit, Placeholder.configure({placeholder: LOCALIZATION.contentPlaceholderText}), Image, Link, TaskList, TaskItem],
        onUpdate: ({editor}) => {
            handleError(ENoteKeys.CONTENT, editor.getText(), validateContent, editor.getHTML());
            onChangeContent(editor.getHTML(), {id, title});
        },
    });

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        handleError(ENoteKeys.TITLE, value, validateTitle);
        onChangeTitle(value, {id, content});
    }, [id, content, onChangeTitle]);

    const handleRemove = useCallback(() => {
        onRemove(id);
    }, [id, onRemove]);

    const handleActiveNodeId = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (activeNoteId !== id) {
            onSetActiveNoteId(id);
        }
    }, [id, activeNoteId, onSetActiveNoteId]);

    if (!editor) {
        return null;
    }

    const renderErrors = Object.values(errors).join('\n');

    return (
        <>
            <div
                className={`list-item-edit ${activeNoteId === id ? 'full-height' : ''}`}
                data-testid="item"
                onClick={handleActiveNodeId}
            >
                <div className="list-item-edit_header">
                    <input
                        className="list-item-edit_input"
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder={LOCALIZATION.inputPlaceholderText}
                        autoFocus
                        data-testid="input"
                    />
                    <div className="list-item-edit_icons">
                        <GiCrossMark className="list-item-edit_icons__cancel" onClick={handleRemove} data-testid="removeBtn" />
                    </div>
                </div>
                {
                    activeNoteId === id && (
                        <EditorToolbar editor={editor} />
                    )
                }
                <EditorContent editor={editor}/>
            </div>

            {
                !!renderErrors.length && (
                    <div className="list-item-edit_error">
                        {renderErrors}
                    </div>
                )
            }
        </>
    )
})