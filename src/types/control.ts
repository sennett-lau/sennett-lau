import { Action } from 'redux'

export interface IControlState {
  isImageModalOpen: boolean
  imageModalSrc: string
}

export interface IControlSetImageModalOpenAction extends Action {
  payload: {
    isImageModalOpen: boolean
    imageModalSrc?: string
  }
}
