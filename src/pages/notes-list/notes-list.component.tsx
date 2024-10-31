import React, {useCallback, useDeferredValue, useEffect, useState} from 'react';
import {FaPlus} from 'react-icons/fa';
import {LOCALIZATION} from '../../common/constants';
import {Error, ListItemEditor, TextBtn} from '../../common/components';
import {ENoteKeys, INoteData} from '../../common/types';
import {trimValues} from '../../common/utils';

interface INotesListProps {
    activeNoteId: number | null;
    onSetActiveNoteId: (id: number) => void;
}

export const NotesList: React.FC<INotesListProps> = ({activeNoteId, onSetActiveNoteId}) => {
    const [notes, setNotes] = useState<INoteData[]>([]);
    const [isFetching, setLoading] = useState(true);
    const [currentNote, setCurrentNote] = useState<INoteData>({
        [ENoteKeys.ID]: Date.now(),
        [ENoteKeys.TITLE]: '',
        [ENoteKeys.CONTENT]: '',
    });
    const [createMode, setCreateMode] = useState(false);
    const [error, setError] = useState('');

    const getData = useCallback(() => {
        window.electron.readFile().then((data) => {
            setNotes(Array.isArray(data) ? data : []);
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        getData();
    }, []);

    const handleChangeTitle = useCallback((value: string, note: Omit<INoteData, ENoteKeys.TITLE>) => {
        setCurrentNote({
            ...note,
            [ENoteKeys.TITLE]: value,
        });
    }, []);

    const handleChangeContent = useCallback((value: string, note: Omit<INoteData, ENoteKeys.CONTENT>) => {
        setCurrentNote({
            ...note,
            [ENoteKeys.CONTENT]: value,
        });
    }, []);

    const handleOffEditNote = useCallback(() => {
        if (createMode) setCreateMode(false);
        setCurrentNote({
            id: Date.now(),
            title: '',
            content: '',
        });
    }, [createMode]);

    const handleOnCreateMode = useCallback((): void => {
        setCreateMode(true);
        handleOffEditNote();
    }, [handleOffEditNote]);

    const deferredNote = useDeferredValue(currentNote);

    const handleSaveNote = useCallback(async () => {
        try {
            const data = [...notes];
            if (createMode) {
                data.unshift(trimValues(deferredNote) as INoteData);
                setCreateMode(false);
            } else {
                const idx = data.findIndex(({id}) => id === deferredNote.id);
                data[idx] = trimValues(deferredNote) as INoteData;
            }
            await window.electron.writeFile(data);
            setNotes(data);
        } catch (e) {
            // Get actual data on error and show error
            getData();
            setError('SAVING NOTE ERROR');
        }
    }, [deferredNote, notes, createMode]);

    useEffect(() => {
        if (!isFetching) {
            handleSaveNote();
        }
    }, [deferredNote, isFetching]);

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(''), 4000);
        }

    }, [error]);

    const handleRemove = useCallback(async (removeId: number) => {
        try {
            const data = [...notes];
            const idx = data.findIndex(({id}) => id === removeId);
            data.splice(idx, 1);
            await window.electron.writeFile(data);
            setNotes(data);
        } catch (e) {
            // Get actual data on error and show error
            getData();
            setError('REMOVING NOTE ERROR');
        }
    }, [notes]);

    return (
        <>
            {
                error && (
                    <Error error={error} />
                )
            }
            <div className="controls">
                <TextBtn
                    Icon={FaPlus}
                    text={LOCALIZATION.createBtnText}
                    onClick={handleOnCreateMode}
                />
            </div>
            {
                notes.length === 0 ? (
                    <div className="empty-list">
                        <p>{LOCALIZATION.emptyList}</p>
                    </div>
                ) : (
                    <div className="list">
                        {
                            notes.map((note) => (
                                <ListItemEditor
                                    key={note.id}
                                    data={note}
                                    activeNoteId={activeNoteId}
                                    onChangeTitle={handleChangeTitle}
                                    onChangeContent={handleChangeContent}
                                    onRemove={handleRemove}
                                    onSetActiveNoteId={onSetActiveNoteId}
                                />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}
