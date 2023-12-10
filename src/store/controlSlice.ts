import {
  IControlSetImageModalOpenAction,
  IControlState,
} from '@/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IControlState = {
  isImageModalOpen: false,
  imageModalSrc: '',
}

const slice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setImageModalOpen(state, action: IControlSetImageModalOpenAction) {
      state.isImageModalOpen = action.payload.isImageModalOpen
      state.imageModalSrc = action.payload.imageModalSrc || ''
    }
  },
})

export const {
  setImageModalOpen,
} = slice.actions

export default slice
