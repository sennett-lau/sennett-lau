import { configureStore } from '@reduxjs/toolkit'

import controlSlice from '@/store/controlSlice'

export const store = configureStore({
  reducer: {
    controlSlice: controlSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
