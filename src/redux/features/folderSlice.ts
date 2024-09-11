import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define the types
interface File {
  id: string;
  name: string;
  data?: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

interface FolderState {
  folders: Folder[];
  selectedFolderId: string | null;
  selectedFileId: string | null;
}

// Initial state
const initialState: FolderState = {
  folders: [],
  selectedFolderId: null,
  selectedFileId: null,
};

// Create slice
const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<string>) => {
      state.folders.push({ id: uuidv4(), name: action.payload, files: [] });
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(folder => folder.id !== action.payload);
    },
    renameFolder: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const folder = state.folders.find(folder => folder.id === action.payload.id);
      if (folder) {
        folder.name = action.payload.newName;
      }
    },
    createFile: (state, action: PayloadAction<{ folderId: string; file: File }>) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        folder.files.push(action.payload.file);
      }
    },
    removeFile: (state, action: PayloadAction<{ folderId: string; fileId: string }>) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        folder.files = folder.files.filter(file => file.id !== action.payload.fileId);
      }
    },
    renameFile: (state, action: PayloadAction<{ folderId: string; fileId: string; newName: string }>) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        const file = folder.files.find(file => file.id === action.payload.fileId);
        if (file) {
          file.name = action.payload.newName;
        }
      }
    },
    addDataInFile: (state, action: PayloadAction<{ folderId: string; fileId: string; newData: string }>) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        const file = folder.files.find(file => file.id === action.payload.fileId);
        if (file) {
          file.data = action.payload.newData;
        }
      }
    },
    setSelectedFolderId: (state, action: PayloadAction<string | null>) => {
      state.selectedFolderId = action.payload;
    },
    setSelectedFileId: (state, action: PayloadAction<string | null>) => {
      state.selectedFileId = action.payload;
    },
    moveFile: (state, action: PayloadAction<{ fileID: string; targetFolderId: string }>) => {
      const { fileID, targetFolderId } = action.payload;
    
      const sourceFolder = state.folders.find(folder =>
        folder.files.some(file => file.id === fileID)
      );

      const targetFolder = state.folders.find(folder => folder.id === targetFolderId);
    
      if (sourceFolder && targetFolder) {
        const fileToMove = sourceFolder.files.find(file => file.id === fileID);
    
        if (fileToMove) {
          sourceFolder.files = sourceFolder.files.filter(file => file.id !== fileID);
          targetFolder.files.push(fileToMove);
        } 
      }
    }
  },
});

export const {
  createFolder,
  removeFolder,
  renameFolder,
  createFile,
  removeFile,
  renameFile,
  addDataInFile,
  setSelectedFolderId,
  setSelectedFileId,
  moveFile,
} = folderSlice.actions;

export default folderSlice.reducer;
