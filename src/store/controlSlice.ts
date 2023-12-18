import {
  IControlSetColorSchemeAction,
  IControlSetCurrSectionIdAction,
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
  currSectionId: 'hero',
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
    },
    setCurrSectionId(state, action: IControlSetCurrSectionIdAction) {
      state.currSectionId = action.payload.currSectionId
    },
  },
})

export const {
  setImageModalOpen,
  setShowHeader,
  setColorScheme,
  setCurrSectionId,
} = slice.actions

export default slice
