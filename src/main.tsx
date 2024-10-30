import React, {useCallback, useState} from 'react';
import {NotesList} from './pages';


const Main: React.FC = ()=> {
    const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

    const handleActiveId = useCallback((id: number) => {
        setActiveNoteId(id);
    }, []);

    return (
        <div
            className="main"
            data-testid="main"
            onClick={() => handleActiveId(null)}
        >
            <NotesList
                activeNoteId={activeNoteId}
                 onSetActiveNoteId={handleActiveId}
            />
        </div>
    )
}

export default Main;