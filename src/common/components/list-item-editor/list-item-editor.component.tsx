import React, {useCallback} from 'react';
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

export interface IListItemEditorProps {
    data: INoteData,
    activeNoteId: number | null,
    onChangeTitle: (value: string, note: Omit<INoteData, ENoteKeys.TITLE>) => void;
    onChangeContent: (value: string, note: Omit<INoteData, ENoteKeys.CONTENT>) => void;
    onRemove: (removeId: number) => void;
    onSetActiveNoteId: (id: number) => void;
}

export const ListItemEditor: React.FC<IListItemEditorProps> = ({
                                                                   data: {id, title = '', content = ''},
                                                                   activeNoteId,
                                                                   onChangeTitle,
                                                                   onChangeContent,
                                                                   onRemove,
                                                                   onSetActiveNoteId,
                                                               }) => {

    const editor = useEditor({
        content: content,
        extensions: [StarterKit, Placeholder, Image, Link, TaskList, TaskItem],
        onUpdate: ({editor}) => {
            onChangeContent(editor.getHTML(), {id, title});
        },
    });

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        onChangeTitle(value, {id, content});
    }, [id, content, onChangeTitle]);

    const handleRemove = useCallback(() => {
        onRemove(id);
    }, [id, onRemove]);

    const handleActiveNodeId = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onSetActiveNoteId(id);
    }, [id, onSetActiveNoteId]);

    if (!editor) {
        return null;
    }

    return (
        <div
            className="list-item-edit"
            onClick={handleActiveNodeId}
        >
            <div className="list-item-edit_header">
                <input
                    className="list-item-edit_input"
                    value={title}
                    onChange={handleChangeTitle}
                    autoFocus
                />
                <div className="list-item-edit_icons">
                    <GiCrossMark className="list-item-edit_icons__cancel" onClick={handleRemove} />
                </div>
            </div>
            {
                activeNoteId === id && (
                    <EditorToolbar editor={editor} />
                )
            }
            <EditorContent editor={editor} />
        </div>
    )
}