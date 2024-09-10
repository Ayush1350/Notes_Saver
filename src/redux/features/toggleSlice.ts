import { createSlice } from '@reduxjs/toolkit';

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
    toggleSwitch: (state) => {
      state.isOn = !state.isOn;
    },
  },
});

export const { toggleSwitch } = toggleSlice.actions;

export default toggleSlice.reducer;
