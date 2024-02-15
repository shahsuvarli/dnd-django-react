import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  loggedIn: false,
  role: "admin",
  projects: [],
  customerPopup: false,
  materialPopup: false,
  newMaterialPopup: false,
  material: "",
  selectedCustomer: {},
  user: {
    name: "Elnur",
    surname: "Mammadov",
    position: "Business System Analyst",
  },
};

export const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    customerWindow: (state) => {
      state.customerPopup = !state.customerPopup;
    },
    materialWindow: (state) => {
      state.materialPopup = !state.materialPopup;
    },
    newMaterialWindow: (state) => {
      state.newMaterialPopup = !state.newMaterialPopup;
    },
    selectMaterial: (state, action) => {
      state.material = action.payload;
    },
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const {
  customerWindow,
  materialWindow,
  newMaterialWindow,
  selectMaterial,
  selectCustomer,
} = crmSlice.actions;
export default crmSlice.reducer;
