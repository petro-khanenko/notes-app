import {contextBridge, ipcRenderer} from 'electron';
import {INoteData} from './common/types';


const electronHandler = {
    writeFile: (data: INoteData[]) => {
        return ipcRenderer.invoke('writeFile', data);
    },

    readFile: () => {
        return ipcRenderer.invoke('readFile');
    },
}

contextBridge.exposeInMainWorld('electron', electronHandler);

declare global {
    interface Window {
        electron: typeof electronHandler;
    }
}

export {};
