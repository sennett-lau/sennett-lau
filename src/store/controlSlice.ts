import {
  IControlSetDisplayColorAction,
  IControlSetImageModalOpenAction,
  IControlSetShowHeaderAction,
  IControlState,
} from '@/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IControlState = {
  isImageModalOpen: false,
  imageModalSrc: '',
  showHeader: false,
  displayColor: 'themeLight.500',
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
    setDisplayColor(state, action: IControlSetDisplayColorAction) {
      state.displayColor = action.payload.displayColor
    },
  },
})

export const { setImageModalOpen, setShowHeader, setDisplayColor } =
  slice.actions

export default slice
