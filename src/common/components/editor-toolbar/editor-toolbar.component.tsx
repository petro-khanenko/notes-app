import React, {useCallback, useMemo, useState} from 'react'
import {Editor} from '@tiptap/react'
import {
    RiArrowGoBackLine,
    RiArrowGoForwardLine,
    RiBold,
    RiFormatClear,
    RiH1,
    RiH2,
    RiH3,
    RiH4,
    RiH5,
    RiH6,
    RiItalic,
    RiLink,
    RiLinkUnlink,
    RiListOrdered,
    RiListUnordered,
    RiSeparator,
    RiStrikethrough,
    RiTextWrap,
} from 'react-icons/ri'
import {FaImage} from 'react-icons/fa';
import {IoMdCheckboxOutline} from 'react-icons/io';
import {Modal} from '../modal';
import {EModalTypes} from '../../types';
import {LOCALIZATION} from '../../constants';


type IEditorToolbarProps = {
    editor: Editor;
}

export const EditorToolbar: React.FC<IEditorToolbarProps> = ({ editor })=>  {

    const [currentModal, setCurrentModal] = useState('');

    const handleURL = useCallback((href: string) => {
        if (href) {
            editor.chain().focus().extendMarkRange('link').setLink({href}).run();
        }
        setCurrentModal('');
    }, [editor]);

    const handleImage = useCallback((src: string) => {
        if (src) {
            editor.chain().focus().setImage({src}).run();
        }
        setCurrentModal('');
    }, [editor]);

    const handleOpenModal = useCallback((key: EModalTypes) => () => {
        setCurrentModal(key);
    }, []);

    const handleCloseModal = useCallback(() => {
        setCurrentModal('');
    }, []);

    const modals = useMemo(() => ({
        [EModalTypes.URL]: {
            label: LOCALIZATION.urlLabelText,
            handler: handleURL,
        },
        [EModalTypes.IMAGE]: {
            label: LOCALIZATION.imageLabelText,
            handler: handleImage,
        },
    }), []);

    return (
        <>
            {
                currentModal && (
                    <Modal
                        label={modals[currentModal as EModalTypes].label}
                        onConfirm={modals[currentModal as EModalTypes].handler}
                        onCancel={handleCloseModal}
                    />
                )
            }
            <div className="editor-toolbar">
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <RiBold />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <RiItalic />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <RiStrikethrough />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                >
                    <RiH1 />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                >
                    <RiH2 />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                >
                    <RiH3 />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                >
                    <RiH4 />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                >
                    <RiH5 />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                >
                    <RiH6 />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <RiListOrdered />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <RiListUnordered />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                >
                    <IoMdCheckboxOutline />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={handleOpenModal(EModalTypes.URL)}
                >
                    <RiLink />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
                >
                    <RiLinkUnlink />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={handleOpenModal(EModalTypes.IMAGE)}
                >
                    <FaImage />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <RiSeparator />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                    <RiTextWrap />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                >
                    <RiFormatClear />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <RiArrowGoBackLine />
                </div>
                <div
                    className="editor-toolbar_icon"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <RiArrowGoForwardLine />
                </div>
            </div>
        </>
    )
}

