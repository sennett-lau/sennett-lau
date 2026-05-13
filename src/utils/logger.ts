import { LOG_LEVEL } from '@/config'
import type { ILogLevels } from '@/types'

import { fireDiscordErrorAlert } from './discord-error-alert'

const logLevels: ILogLevels = {
  verbose: 0,
  duration: 10,
  debug: 20,
  info: 30,
  error: 40,
  none: 99,
}

const logLevel = LOG_LEVEL as keyof ILogLevels

const getLinePair = (): { top: string; bottom: string } => {
  const date = new Date()
  const dateStr = date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
  const topLine = `${'-'.repeat(25)}[${dateStr}]${'-'.repeat(25)}`
  let bottomLine = ''
  for (let i = 0; i < topLine.length; i++) {
    bottomLine += '-'
  }
  return { top: topLine, bottom: bottomLine }
}

export const simpleLogger = (message?: unknown, ...optionalParams: unknown[]): string => {
  const date = new Date()
  const dateStr = date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
  console.log(`[${dateStr}]`, message, ...optionalParams)

  let logStr = `[${dateStr}] ${String(message)} \n`
  optionalParams.forEach((param) => {
    logStr += `${String(param)} \n`
  })
  return logStr
}

const wrappedLogger = (messages: string[]): string => {
  let logStr = ''
  logStr += getLinePair().top
  logStr += '\n'
  messages.forEach((message) => {
    logStr += `${message}\n`
  })
  logStr += getLinePair().bottom
  console.log(logStr)
  return logStr
}

const moduleLogger = (moduleName: string, log: string): string => {
  const date = new Date()
  const dateStr = date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
  const logStr = `[${dateStr}][${moduleName}] ${log}`
  console.log(logStr)
  return logStr
}

const wrappedModuleLogger = (moduleName: string, messages: string[]): string => {
  let logStr = ''
  logStr += getLinePair().top
  logStr += '\n'
  logStr += `[${moduleName}]\n`
  messages.forEach((message) => {
    logStr += `${message}\n`
  })
  logStr += getLinePair().bottom
  console.log(logStr)
  return logStr
}

export const verboseLogger = (message?: unknown, ...optionalParams: unknown[]) => {
  if (logLevels[logLevel] <= logLevels.verbose) simpleLogger(message, ...optionalParams)
}
export const verboseWrappedLogger = (messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.verbose) wrappedLogger(messages)
}
export const verboseModuleLogger = (moduleName: string, log: string) => {
  if (logLevels[logLevel] <= logLevels.verbose) moduleLogger(moduleName, log)
}
export const verboseWrappedModuleLogger = (moduleName: string, messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.verbose) wrappedModuleLogger(moduleName, messages)
}

export const debugLogger = (message?: unknown, ...optionalParams: unknown[]) => {
  if (logLevels[logLevel] <= logLevels.debug) simpleLogger(message, ...optionalParams)
}
export const debugWrappedLogger = (messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.debug) wrappedLogger(messages)
}
export const debugModuleLogger = (moduleName: string, log: string) => {
  if (logLevels[logLevel] <= logLevels.debug) moduleLogger(moduleName, log)
}
export const debugWrappedModuleLogger = (moduleName: string, messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.debug) wrappedModuleLogger(moduleName, messages)
}

export const errorLogger = (message?: unknown, ...optionalParams: unknown[]) => {
  if (logLevels[logLevel] <= logLevels.error) {
    const content = simpleLogger(message, ...optionalParams)
    fireDiscordErrorAlert(content)
  }
}
export const errorWrappedLogger = (messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.error) {
    const content = wrappedLogger(messages)
    fireDiscordErrorAlert(content)
  }
}
export const errorModuleLogger = (moduleName: string, log: string) => {
  if (logLevels[logLevel] <= logLevels.error) {
    const content = moduleLogger(moduleName, log)
    fireDiscordErrorAlert(content)
  }
}
export const errorWrappedModuleLogger = (moduleName: string, messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.error) {
    const content = wrappedModuleLogger(moduleName, messages)
    fireDiscordErrorAlert(content)
  }
}

export const infoLogger = (message?: unknown, ...optionalParams: unknown[]) => {
  if (logLevels[logLevel] <= logLevels.info) simpleLogger(message, ...optionalParams)
}
export const infoWrappedLogger = (messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.info) wrappedLogger(messages)
}
export const infoModuleLogger = (moduleName: string, log: string) => {
  if (logLevels[logLevel] <= logLevels.info) moduleLogger(moduleName, log)
}
export const infoWrappedModuleLogger = (moduleName: string, messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.info) wrappedModuleLogger(moduleName, messages)
}

export const durationLogger = (message?: unknown, ...optionalParams: unknown[]) => {
  if (logLevels[logLevel] <= logLevels.duration) simpleLogger(message, ...optionalParams)
}
export const durationWrappedLogger = (messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.duration) wrappedLogger(messages)
}
export const durationModuleLogger = (moduleName: string, log: string) => {
  if (logLevels[logLevel] <= logLevels.duration) moduleLogger(moduleName, log)
}
export const durationWrappedModuleLogger = (moduleName: string, messages: string[]) => {
  if (logLevels[logLevel] <= logLevels.duration) wrappedModuleLogger(moduleName, messages)
}
