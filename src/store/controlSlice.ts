import {
  IControlSetImageModalOpenAction,
  IControlSetShowHeaderAction,
  IControlState,
} from '@/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IControlState = {
  isImageModalOpen: false,
  imageModalSrc: '',
  showHeader: false,
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
  },
})

export const { setImageModalOpen, setShowHeader } = slice.actions

export default slice
