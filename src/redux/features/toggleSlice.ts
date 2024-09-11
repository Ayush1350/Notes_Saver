import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleState {
  isOn: boolean;
}

const initialState: ToggleState = {
  isOn: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSwitch: (state,Action: PayloadAction<boolean>) => {
      state.isOn = !Action.payload;
    },
  },
});

export const { toggleSwitch } = toggleSlice.actions;

export default toggleSlice.reducer;
