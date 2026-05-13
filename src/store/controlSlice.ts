import { createSlice } from '@reduxjs/toolkit'

import type {
  IControlSetColorSchemeAction,
  IControlSetCurrSectionIdAction,
  IControlSetImageModalOpenAction,
  IControlSetShowHeaderAction,
  IControlSetSubsectionIdAction,
  IControlState,
} from '@/types'

const initialState: IControlState = {
  isImageModalOpen: false,
  imageModalSrc: '',
  showHeader: false,
  colorScheme: 'light',
  currSectionId: 'hero',
  subsectionId: '',
}

const controlSlice = createSlice({
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
    setSubsectionId(state, action: IControlSetSubsectionIdAction) {
      state.subsectionId = action.payload.subsectionId
    },
  },
})

export const {
  setImageModalOpen,
  setShowHeader,
  setColorScheme,
  setCurrSectionId,
  setSubsectionId,
} = controlSlice.actions

export default controlSlice
