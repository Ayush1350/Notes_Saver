import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  folders: [],
  selectedFolderId: null,
  selectedFileId: null,
};

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    addFolder: (state, action) => {
      state.folders.push({ id: uuidv4(), name: action.payload, files: [] });
    },
    removeFolder: (state, action) => {
      state.folders = state.folders.filter(folder => folder.id !== action.payload);
    },
    editFolder: (state, action) => {
      const folder = state.folders.find(folder => folder.id === action.payload.id);
      if (folder) {
        folder.name = action.payload.newName;
      }
    },
    addFile: (state, action) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        folder.files.push(action.payload.file);
      }
    },
    removeFile: (state, action) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        folder.files = folder.files.filter(file => file.id !== action.payload.fileId);
      }
    },
    editFile: (state, action) => {
      const folder = state.folders.find(folder => folder.id === action.payload.folderId);
      if (folder) {
        const file = folder.files.find(file => file.id === action.payload.fileId);
        if (file) {
          file.data = action.payload.newData;
        }
      }
    },
    setSelectedFolderId: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    setSelectedFileId: (state, action) => { // Add this line
      state.selectedFileId = action.payload;
    },
  },
});

export const {
  addFolder,
  removeFolder,
  editFolder,
  addFile,
  removeFile,
  editFile,
  setSelectedFolderId,
  setSelectedFileId, 
} = folderSlice.actions;

export default folderSlice.reducer;
