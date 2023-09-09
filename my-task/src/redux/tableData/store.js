import { configureStore } from '@reduxjs/toolkit';
import tableDataReducer from './tableData.slice';

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
  },
});

export default store;