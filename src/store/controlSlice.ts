import {
  IControlSetColorSchemeAction,
  IControlSetImageModalOpenAction,
  IControlSetShowHeaderAction,
  IControlState,
} from '@/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IControlState = {
  isImageModalOpen: false,
  imageModalSrc: '',
  showHeader: false,
  colorScheme: 'light',
}

const slice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setImageModalOpen(state, action: IControlSetImageModalOpenAction) {
      state.isImageModalOpen = action.payload.isImageModalOpen
      state.imageModalSrc = action.payload.imageModalSrc || ''
    },
    setShowHeader(state, action: IControlSetShowHeaderAction) {
      state.showHeader = action.payload.showHeader
    },
    setColorScheme(state, action: IControlSetColorSchemeAction) {
      state.colorScheme = action.payload.colorScheme
    }
  },
})

export const { setImageModalOpen, setShowHeader, setColorScheme } =
  slice.actions

export default slice
