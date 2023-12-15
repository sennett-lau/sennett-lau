import { Action } from 'redux'
import { ColorScheme } from './color'

export interface IControlState {
  isImageModalOpen: boolean
  imageModalSrc: string
  showHeader: boolean
  colorScheme: ColorScheme
}

export interface IControlSetImageModalOpenAction extends Action {
  payload: {
    isImageModalOpen: boolean
    imageModalSrc?: string
  }
}

export interface IControlSetShowHeaderAction extends Action {
  payload: {
    showHeader: boolean
  }
}

export interface IControlSetColorSchemeAction extends Action {
  payload: {
    colorScheme: ColorScheme
  }
}
