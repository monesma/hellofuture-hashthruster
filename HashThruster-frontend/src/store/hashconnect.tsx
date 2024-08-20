import { createSlice } from "@reduxjs/toolkit";

const hashconnectSlice = createSlice({
  name: "hashconnectSlice",
  initialState: {
    isConnected: false,
    accountIds: [] as string[],
    pairingString: "",
  },
  reducers: {
    setIsConnected: (state, action: { payload: boolean }) => {
      state.isConnected = action.payload;
    },
    setAccountIds: (state, action: { payload: string[] }) => {
      state.accountIds = action.payload;
    },
    setPairingString: (state, action: { payload: string }) => {
      state.pairingString = action.payload;
    },
  },
});

export const actions = {
  hashconnect: hashconnectSlice.actions,
};
  
export default hashconnectSlice.reducer;
